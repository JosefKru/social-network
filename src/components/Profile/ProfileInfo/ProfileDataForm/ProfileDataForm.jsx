import React from 'react'
import style from '../ProfileData/style.module.css'
import { Field, reduxForm } from 'redux-form'
import { Input, Textarea } from '../../../common/FormControls/FormControls'
import Preloader from './../../../common/Preloader/Preloader'

const ProfileDataForm = ({
  onPhotoSelected,
  handleSubmit,
  profile,
  error,
  saveMode,
  setSaveMode,
}) => {
  return (
    <div className={style.alertContainer}>
      {saveMode && (
        <div className={style.alert}>
          <span>Профиль сахраньён </span>
          <button onClick={() => setSaveMode(false)}>x</button>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className={style.container}>
          {error && <div className={style.formSumaryError}>{error}</div>}

          <div>
            <button className={style.saveBtn}>Сахранитъ</button>
          </div>
          <div>
            <b>Загрузи своё лучшее фото </b>
            <input type="file" onChange={onPhotoSelected} />
          </div>

          <div>
            <b>Имя:</b>
            <Field
              // validate={[required]}
              placeholder="Как мня зовут?"
              name="fullName"
              component={Input}
            />
          </div>

          <div>
            <b>Ищю ли йа работу</b>:
            <Field
              // validate={[required]}
              name="lookingForAJob"
              component={Input}
              type="checkbox"
            />
          </div>

          <div>
            <b>Мой профшнл скиллс</b>:
            <Field
              placeholder="Например, Delphi"
              name="lookingForAJobDescription"
              component={Textarea}
              rows="5"
            />
          </div>

          <div>
            <b>Обо мне</b>:
            <Field
              //   validate={[required]}
              placeholder="Опишите свои симптомы.."
              name="aboutMe"
              component={Textarea}
              rows="5"
            />
          </div>

          <div>
            {!profile ? (
              <Preloader />
            ) : (
              Object.keys(profile.contacts).map((key) => {
                return (
                  <div key={key}>
                    <b>{key}</b>
                    {
                      <Field
                        placeholder={key}
                        type="input"
                        component={Input}
                        name={`contacts.${key}`}
                      />
                    }
                  </div>
                )
              })
            )}
          </div>
        </div>
      </form>
    </div>
  )
}

const ProfileDataReduxForm = reduxForm({ form: 'editProfile' })(ProfileDataForm)

export default ProfileDataReduxForm
