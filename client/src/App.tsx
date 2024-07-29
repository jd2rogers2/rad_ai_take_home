import { useState } from 'react'
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

import type { FormData, FoodTruck } from './types';

import './App.css'


const VITE_FASTAPI_SERVICE_URL = import.meta.env.VITE_FASTAPI_SERVICE_URL;

function getParamsFromFormData({
  status,
  applicant,
  street,
  lat,
  long,
}: FormData): string {
  let params = "";
  if (status) { params += `status=${status}?`; }
  if (applicant) { params += `applicant=${applicant}?`; }
  if (street) { params += `street=${street}?`; }
  if (lat) { params += `lat=${lat}?`; }
  if (long) { params += `long=${long}?`; }
  params = params.slice(0, params.length-1);
  return params;
}


function App() {
  const [foodTrucks, setFoodTrucks] = useState<FoodTruck[]>([]);
  const [formData, setFormData] = useState<FormData>({ status: "APPROVED" });

  async function getFoodTrucks(): Promise<FoodTruck[]> {
    const params = getParamsFromFormData(formData);
    const res = await fetch(`${VITE_FASTAPI_SERVICE_URL}?${params}`);
    if (res.ok) {
      return await res.json();
    } else {
      console.log('failed to fetch food trucks');
      return [];
    }
  }

  async function handleSubmit() {
    const newTrucks = await getFoodTrucks();
    setFoodTrucks(newTrucks);
  }

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
