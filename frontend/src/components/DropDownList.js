import React, { useState } from 'react'
import { Dropdown } from 'primereact/dropdown'


const DropdownList = () => {
  const [clients, setClients] = useState(null)
  // TÄHÄN BÄKKÄRISTÄ ASIAKKAIDEN HAKU
  const clientList = [
    { name: 'Client1', code: 'C1' },
    { name: 'Client2', code: 'C2' },
    { name: 'Client3', code: 'C3' }
  ]

  const onClientChange = (e) => {
    setClients(e.value)
  }
  return (
    <div className="dropdown">
      <div className="card">
        <h5>Select client</h5>
        <Dropdown value={clients} options={clientList} onChange={onClientChange} optionLabel="name" placeholder="Select a Client" />
      </div>
    </div>
  )
}