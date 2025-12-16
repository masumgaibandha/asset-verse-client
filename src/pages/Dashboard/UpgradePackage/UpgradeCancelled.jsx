import React from 'react'
import { Link } from 'react-router'

const UpgradeCancelled = () => {
  return (
    <div>
        <h2 className="text-4xl">Upgrade Cancelled</h2>
        <Link to={'/dashboard/upgrade-package'}><button className='btn btn-accent mt-5'>Try Again</button></Link>
    </div>
  )
}

export default UpgradeCancelled