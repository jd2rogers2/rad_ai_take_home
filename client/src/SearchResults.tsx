import type { FoodTruck } from "./types";


function SearchForm({ foodTrucks }: { foodTrucks: FoodTruck[] }) {

  return (
    <table>
      <thead>
        <tr>
          <td>applicant/name</td>
          <td>fooditems</td>
          <td>address</td>
          <td>locationdescription</td>
          <td>latitude</td>
          <td>longitude</td>
          <td>distance from you</td>
          <td>schedule</td>
        </tr>
      </thead>
      <tbody>
        {foodTrucks.map(ft => (
          <tr key={ft.objectid}>
            <td>{ft.applicant}</td>
            <td>{ft.fooditems}</td>
            <td>{ft.address}</td>
            <td>{ft.locationdescription}</td>
            <td>{ft.latitude}</td>
            <td>{ft.longitude}</td>
            <td>{typeof(ft.distance_from_input) === "number" ? ft.distance_from_input : 'N/A'}</td>
            <td><a href={ft.schedule}>see schedule</a></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default SearchForm
