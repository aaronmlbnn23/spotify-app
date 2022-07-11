import React from 'react'
import {IoMdMenu} from 'react-icons/io'
import Search from '../components/search'

const Navbar = () => {
  

    const toggleSidebar = () => {
   
        const sidebar = document.querySelector('aside')
        sidebar?.classList?.toggle('collapse')
    }
  return (
    <div className='toolbar-wrapper'>
        <IoMdMenu className='toggle-icon' onClick={toggleSidebar}/>   
        <Search />
    </div>
  )
}

export default Navbar