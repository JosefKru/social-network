import React from 'react'
import style from './../Dialogs.module.css'
import { NavLink } from 'react-router-dom'

type PropsType = {
  name: string
  id: number
}

const DialogItem: React.FC<PropsType> = ({ name, id }) => {
  let path = '/dialogs/' + id

  return (
    <div className={`${style.dialog} ${style.active}`}>
      <NavLink to={path}>{name}</NavLink>
    </div>
  )
}

export default DialogItem
