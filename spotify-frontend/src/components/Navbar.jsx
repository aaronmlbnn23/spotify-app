import React from 'react'
import {IoMdMenu} from 'react-icons/io'


const Navbar = () => {
  

    const toggleSidebar = () => {
   
        const sidebar = document.querySelector('aside')
        sidebar?.classList?.toggle('collapse')
    }
  return (
    <div className='toolbar-wrapper'>
        <IoMdMenu className='toggle-icon' onClick={toggleSidebar}/>   
    </div>
  )
}

export default Navbar