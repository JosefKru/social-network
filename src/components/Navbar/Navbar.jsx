import React from 'react'
import s from './Navbar.module.css'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className={s.nav}>
      <div className={s.item}>
        <NavLink
          to="/profile"
          style={({ isActive }) => ({
            color: isActive ? 'blue' : '#f7f7f7',
          })}
        >
          Profile
        </NavLink>
      </div>
      <div className={`${s.item} ${s.active}`}>
        <NavLink
          to="/dialogs"
          style={({ isActive }) => ({
            color: isActive ? 'blue' : '#f7f7f7',
          })}
        >
          Messages
        </NavLink>
      </div>
      <div className={`${s.item} ${s.active}`}>
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
