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
          Профиль
        </NavLink>
      </div>
      <div className={style.item}>
        <NavLink
          to="/dialogs"
          style={({ isActive }) => ({
            color: isActive ? 'blue' : '#f7f7f7',
          })}
        >
          Сообщенья
        </NavLink>
      </div>
      <div className={style.item}>
        <NavLink
          to="/users"
          style={({ isActive }) => ({
            color: isActive ? 'blue' : '#f7f7f7',
          })}
        >
          Пользователи
        </NavLink>
      </div>
      <div className={style.item}>
        <NavLink
          to="/settings"
          style={({ isActive }) => ({
            color: isActive ? 'blue' : '#f7f7f7',
          })}
        >
          Настройки
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar
