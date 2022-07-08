import React from 'react'
import Sidebar from '../components/sidebar'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import RecentPlayed from './RecentPlayed'
const Layout = () => {
  return (
    <div>
        <Sidebar/>
        <main>
            <Navbar/>
            <Outlet className='outlet'/>
            <RecentPlayed/>

        </main>
    </div>
  )
}

export default Layout