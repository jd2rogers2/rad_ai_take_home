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
    setFormData({ [e.currentTarget.name]: e.currentTarget.value });
  }

  return (
    <form onSubmit={onSubmit}>
      <select name="status" onChange={handleInputChange} value={formData.status || ''}>
        {statuses.map(s => (
          <option value={s}>{s}</option>
        ))}
      </select>
      <input
        type="text"
        name="applicant"
        value={formData.applicant || ''}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="street"
        value={formData.street || ''}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="lat"
        value={formData.lat || ''}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="long"
        value={formData.long || ''}
        onChange={handleInputChange}
      />
    </form>
  )
}

export default SearchForm
