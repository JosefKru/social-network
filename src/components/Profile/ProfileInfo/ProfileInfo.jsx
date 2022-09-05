import React, { useState } from 'react'
import Preloader from '../../common/Preloader/Preloader'
import style from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus'
// import ProfileStatusWithHook from './ProfileStatusFun'
import userPhoto from '../../../assets/images/user.png'
import ProfileDataForm from './ProfileDataForm/ProfileDataForm'
import ProfileData from './ProfileData/ProfileData'

const ProfileInfo = ({
  profile,
  status,
  updateStatus,
  isOwner,
  savePhoto,
  saveProfile,
}) => {
  const [editMode, setEditMode] = useState(false)

  if (!profile) {
    return <Preloader />
  }

  const onPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0])
    }
  }

  const onSubmit = (formData) => {
    saveProfile(formData).then(() => {
      setEditMode(false)
    })
  }

  return (
    <div>
      <div className={style.descriptionBlock}>
        <div>
          Мня зовут <b>{profile.fullName}</b>
        </div>
        <img
          src={profile.photos.large || userPhoto}
          className={style.photo}
          alt=""
        />

        <ProfileStatus status={status} updateStatus={updateStatus} />
        {/* <ProfileStatusWithHook
          status={status}
          updateStatus={updateStatus}
        /> */}
        {editMode ? (
          <ProfileDataForm
            profile={profile}
            initialValues={profile}
            onSubmit={onSubmit}
            onPhotoSelected={onPhotoSelected}
            isOwner={isOwner}
          />
        ) : (
          <ProfileData
            onEditMode={() => setEditMode(true)}
            profile={profile}
            isOwner={isOwner}
          />
        )}
      </div>
    </div>
  )
}

export default ProfileInfo
