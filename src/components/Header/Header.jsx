import React from 'react'
import s from './Header.module.css'
import logo from '../../assets/images/logo.png'
import { NavLink } from 'react-router-dom'

const Header = (props) => {
  return (
    <header className={s.header}>
      <img src={logo} alt="Лого" />
      <div className={s.login}>
        {props.isAuth ? (
          <div>
            <div className={s.hello}>Привет {props.login}</div>
            <div>
              <button onClick={props.logout}>Выйти</button>
            </div>
          </div>
        ) : (
          <NavLink to="login">Login</NavLink>
        )}
      </div>
    </header>
  )
}

export default Header
