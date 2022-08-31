import React from 'react'
import Preloader from '../../common/Preloader/Preloader'
import style from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus'
import ProfileStatusWithHook from './ProfileStatusFun'
import userPhoto from '../../../assets/images/user.png'

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />
  }
  return (
    <div>
      <div className={style.descriptionBlock}>
        <img
          src={props.profile.photos.large || userPhoto}
          className={style.photo}
          alt="Аватар"
        />
        <ProfileStatus
          status={props.status}
          updateStatus={props.updateStatus}
        />
        <ProfileStatusWithHook
          status={props.status}
          updateStatus={props.updateStatus}
        />
        ... Остальная информация ...
      </div>
    </div>
  )
}

export default ProfileInfo
