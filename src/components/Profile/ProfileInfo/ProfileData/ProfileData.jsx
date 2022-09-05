import React from 'react'
import style from './style.module.css'

const ProfileData = ({ profile, isOwner, onEditMode }) => {
  return (
    <div className={style.container}>
      {isOwner && <button onClick={onEditMode}>Ридактировать</button>}
      <div>
        <b>Ищю ли йа работу</b>: {profile.lookingForAJob ? 'угу' : 'неа'}
      </div>

      <div>
        <b>Мои профессииональные навыки</b>: {profile.lookingForAJobDescription}
      </div>
      <div>
        <b>Обо мне</b>: {profile.aboutMe}
      </div>
      <div>
        <b>Мои немногочисленные контакты</b>:
        {Object.keys(profile.contacts).map((key) => {
          return (
            <Contacts
              key={key}
              contactKey={key}
              contactValue={profile.contacts[key]}
            />
          )
        })}
      </div>
    </div>
  )
}

const Contacts = ({ contactKey, contactValue }) => {
  return (
    <div className={style.contact}>
      <b>{contactKey}</b>: {contactValue}
    </div>
  )
}

export default ProfileData