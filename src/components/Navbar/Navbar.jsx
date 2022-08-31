import React from 'react'
import style from './Navbar.module.css'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className={style.nav}>
      <div className={style.item}>
        <NavLink
          to="/profile"
          style={({ isActive }) => ({
            color: isActive ? 'blue' : '#f7f7f7',
          })}
        >
          Profile
        </NavLink>
      </div>
      <div className={`${style.item} ${style.active}`}>
        <NavLink
          to="/dialogs"
          style={({ isActive }) => ({
            color: isActive ? 'blue' : '#f7f7f7',
          })}
        >
          Messages
        </NavLink>
      </div>
      <div className={`${style.item} ${style.active}`}>
        <NavLink
          to="/users"
          style={({ isActive }) => ({
            color: isActive ? 'blue' : '#f7f7f7',
          })}
        >
          Users
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar
