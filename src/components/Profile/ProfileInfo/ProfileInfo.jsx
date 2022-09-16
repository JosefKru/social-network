import React, { useState } from 'react'
import Preloader from '../../common/Preloader/Preloader'
import style from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus'
import userPhoto from '../../../assets/images/user.png'
import ProfileData from './ProfileData/ProfileData'

const ProfileInfo = ({ profile, status, updateStatus, isOwner }) => {
  if (!profile) {
    return <Preloader />
  }

  return (
    <div className={style.container}>
      <div className={style.imgPhoto}>
        <img src={profile.photos.large || userPhoto} alt="" />
      </div>
      <div className={style.description}>
        <div className={style.userName}>
          <h2>{profile.fullName}</h2>
        </div>
        <ProfileStatus
          status={status}
          updateStatus={updateStatus}
          isOwner={isOwner}
        />
        {/* <ProfileStatusWithHook
          status={status}
          updateStatus={updateStatus}
        /> */}
        <div className={style.form}>
          {<ProfileData profile={profile} isOwner={isOwner} />}
        </div>
      </div>
    </div>
  )
}

export default ProfileInfo
