import { compose } from 'redux'
import { connect } from 'react-redux'
import { saveProfile, savePhoto, getProfile } from '../../redux/profile-reducer'
import { withAuthRedirect } from './../../hoc/withAuthRedirect'
import style from './style.module.css'
import ProfileDataReduxForm from './../Profile/ProfileInfo/ProfileDataForm/ProfileDataForm'
import { useEffect, useState } from 'react'

const Settings = ({ profile, saveProfile, savePhoto, getProfile, authId }) => {
  const [saveMode, setSaveMode] = useState(false)

  useEffect(() => {
    getProfile(authId)
  }, [])
  const onPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0])
    }
  }

  const onSubmit = (formData) => {
    saveProfile(formData)
    setSaveMode(true)
  }
  return (
    <div className={style.container}>
      <h1>Настройки профля</h1>

      <ProfileDataReduxForm
        profile={profile}
        initialValues={profile} // initialValues используется для отоброжения начальных значений формы
        onSubmit={onSubmit}
        onPhotoSelected={onPhotoSelected}
        setSaveMode={setSaveMode}
        saveMode={saveMode}
        // isOwner={isOwner}
      />
    </div>
  )
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  authId: state.auth.id,
  // status: state.profilePage.status,
  //   authorizedUserId: state.auth.id,
  //   isAuth: state.auth.isAuth,
})

export default compose(
  connect(mapStateToProps, {
    savePhoto,
    saveProfile,
    getProfile,
  }),
  withAuthRedirect
)(Settings)
