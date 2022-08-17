import React from 'react'
import Preloader from '../../common/Preloader/Preloader'
import s from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus'
import ProfileStatusFun from './ProfileStatusFun'

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />
  }
  return (
    <div>
      <div className={s.descriptionBlock}>
        <img src={props.profile.photos.large} />
        <ProfileStatus
          status={props.status}
          updateStatus={props.updateStatus}
        />
        {/* <ProfileStatusFun
          status={props.status}
          updateStatus={props.updateStatus}
        /> */}
        ava + description
      </div>
    </div>
  )
}

export default ProfileInfo
