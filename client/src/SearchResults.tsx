import type { FoodTruck } from "./types";


function SearchForm({ foodTrucks }: { foodTrucks: FoodTruck[] }) {

  return (
    <table>
      <thead>
        <td>applicant/name</td>
        <td>address</td>
        <td>locationdescription</td>
        <td>fooditems</td>
        <td>latitude</td>
        <td>longitude</td>
        <td>schedule</td>
        <td>location</td>
        <td>dayshours</td>
      </thead>
      {foodTrucks.map(ft => (
        <tr>
          <td>{ft.applicant}</td>
          <td>{ft.fooditems}</td>
          <td>{ft.address}</td>
          <td>{ft.locationdescription}</td>
          <td>{ft.latitude}</td>
          <td>{ft.longitude}</td>
          <td>{ft.schedule}</td>
          <td>{ft.dayshours}</td>
        </tr>
      ))}
    </table>
  )
}

export default SearchForm
