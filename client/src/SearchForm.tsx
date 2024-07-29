import { FormEvent } from "react"

import type { FormData, Status } from "./types";


const statuses: Status[] = ["APPROVED", "REQUESTED", "EXPIRED", "SUSPENDED"];

function SearchForm({
  formData,
  setFormData,
  onSubmit,
}: {
  formData: FormData,
  setFormData: (fd: FormData) => void,
  onSubmit: () => void,
}) {

  function handleInputChange(e: FormEvent<HTMLInputElement | HTMLSelectElement>): void {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  }

  return (
    <form onSubmit={onSubmit}>
      <select name="status" onChange={handleInputChange} value={formData.status || ''}>
        {statuses.map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <input
        placeholder="applicant"
        type="text"
        name="applicant"
        value={formData.applicant || ''}
        onChange={handleInputChange}
      />
      <input
        placeholder="street"
        type="text"
        name="street"
        value={formData.street || ''}
        onChange={handleInputChange}
      />
      <input
        placeholder="lat"
        type="text"
        name="lat"
        value={formData.lat || ''}
        onChange={handleInputChange}
      />
      <input
        placeholder="long"
        type="text"
        name="long"
        value={formData.long || ''}
        onChange={handleInputChange}
      />
      <input
        type="submit"
        value="Submit"
      />
    </form>
  )
}

export default SearchForm
