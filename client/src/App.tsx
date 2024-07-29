import { useEffect, useState } from 'react'
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

import type { FormData, FoodTruck } from './types';

import './App.css'


const VITE_FASTAPI_SERVICE_URL = import.meta.env.VITE_FASTAPI_SERVICE_URL;

function getParamsFromFormData(formData: FormData): string {
  const stringifiedKeys = Object.entries(formData)
    .reduce((agg: { [index: string]: string }, curr) => {
      agg[curr[0]] = String(curr[1]);
      return agg;
    }, {});
  const searchParams = new URLSearchParams(stringifiedKeys);
  return searchParams.toString();
}


function App() {
  const [foodTrucks, setFoodTrucks] = useState<FoodTruck[]>([]);
  const [formData, setFormData] = useState<FormData>({ status: "APPROVED" });

  async function getFoodTrucks(): Promise<FoodTruck[]> {
    const params = getParamsFromFormData(formData);
    const res = await fetch(`${VITE_FASTAPI_SERVICE_URL}/search?${params}`);
    if (res.ok) {
      return await res.json();
    } else {
      console.log('failed to fetch food trucks');
      return [];
    }
  }

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const newTrucks = await getFoodTrucks();
    setFoodTrucks(newTrucks);
  }

  useEffect(() => {
    (async function() {
      const newTrucks = await getFoodTrucks();
      setFoodTrucks(newTrucks);
    }());
  }, []);

  return (
    <>
      <h1>find tasty food trucks near you in SF :)</h1>
      <SearchForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
      />
      <SearchResults foodTrucks={foodTrucks} />
    </>
  )
}

export default App
