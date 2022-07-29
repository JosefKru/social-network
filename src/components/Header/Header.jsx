import React from 'react'
import s from './Header.module.css'
import logo from '../../assets/images/logo.png'
import { NavLink } from 'react-router-dom'

const Header = (props) => {
  return (
    <header className={s.header}>
      <img src={logo} />
      <div className={s.login}>
        {props.isAuth ? (
          <div className={s.hello}>{'Привет ' + props.login}</div>
        ) : (
          <NavLink to={'login'}>Login</NavLink>
        )}
      </div>
    </header>
  )
}

export default Header
