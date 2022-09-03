import React from 'react'
import Preloader from '../../common/Preloader/Preloader'
import style from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus'
// import ProfileStatusWithHook from './ProfileStatusFun'
import userPhoto from '../../../assets/images/user.png'

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto }) => {
  if (!profile) {
    return <Preloader />
  }

  const onPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0])
    }
  }

  return (
    <div>
      <div className={style.descriptionBlock}>
        <img
          src={profile.photos.large || userPhoto}
          className={style.photo}
          alt=""
        />
        {isOwner ? (
          <div>
            <input type="file" onChange={onPhotoSelected} />
          </div>
        ) : (
          undefined
        )}
        <ProfileStatus status={status} updateStatus={updateStatus} />
        {/* <ProfileStatusWithHook
          status={status}
          updateStatus={updateStatus}
        /> */}
        ... Остальная информация ...
      </div>
    </div>
  )
}

export default ProfileInfo
