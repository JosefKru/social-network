import React from 'react'
import { NavLink } from 'react-router-dom'
import style from './style.module.css'

const ProfileData = ({ profile, isOwner }) => {
  return (
    <div className={style.container}>
      {isOwner && (
        <NavLink to="/settings">
          <button>Ридактировать</button>
        </NavLink>
      )}
      <div>
        <b>Ищю ли йа работу</b>:{' '}
        {profile.lookingForAJob ? (
          <span>угу &#9989;</span>
        ) : (
          <span>неа &#128581;</span>
        )}
      </div>

      <div>
        <b>Мои профессииональные навыки</b>: {profile.lookingForAJobDescription}
      </div>
      <div>
        <b>Обо мне</b>: {profile.aboutMe}
      </div>
      <div>
        <b>Мои контакты</b>:
        {Object.keys(profile.contacts).map((key) => {
          if (profile.contacts[key]) {
            return (
              <Contacts
                key={key}
                contactKey={key}
                contactValue={profile.contacts[key]}
              />
            )
          }
          return undefined
        })}
      </div>
    </div>
  )
}

const Contacts = ({ contactKey, contactValue }) => {
  return (
    <div className={style.contact}>
      <b>{contactKey}</b>:{' '}
      <a href={contactValue} target="_blank">
        {contactValue.split('https://')[1]}
      </a>
    </div>
  )
}

export default ProfileData
