import React from 'react'
import style from './Header.module.css'
import logo from '../../assets/images/facepalm.png'
import { NavLink } from 'react-router-dom'

const Header = (props) => {
  return (
    <header className={style.header}>
      <NavLink to="/">
        <img src={logo} alt="Лого" />
      </NavLink>
      <div className={style.login}>
        {props.isAuth ? (
          <div>
            <div className={style.hello}>Привет {props.login}</div>
            <div className={style.logout}>
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
