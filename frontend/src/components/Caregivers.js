import React from 'react'

// Component listing registered caregivers

const Caregivers = ({ caregivers }) => {
  return (
    <div>
      <h3>Caregivers</h3>
      {/* <ul>{users.map(user => <li key={user.user_id}> {user.first_name} {user.last_name}</li>)}</ul> */}
      <p>Registered caregivers: {caregivers.length} </p>
    </div>
  )
}

export default Caregivers