import React from 'react'
import { Outlet } from 'react-router'
import authImage from '../assets/assets-handover.jpg'
import Navbar from '../pages/Shared/Footer/Navbar/Navbar'

const AuthLayout = () => {
  return (
    <div className='max-w-7xl mx-auto'>
        <Navbar></Navbar>
        <div className='flex'>
        
        <div className='flex-1 '>
            <Outlet>
                
            </Outlet>
        </div>
        <div className='flex-1'>
            <img src={authImage} alt="" className='h-[250px] md:h-full w-full object-cover rounded-2xl' />
        </div>
    </div>
    </div>
  )
}

export default AuthLayout