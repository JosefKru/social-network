import React from 'react'
import style from '../ProfileData/style.module.css'
import { Field, reduxForm } from 'redux-form'
import { Input, Textarea } from '../../../common/FormControls/FormControls'

const ProfileDataForm = ({ onPhotoSelected, handleSubmit, profile, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className={style.container}>
        {error && <div className={style.formSumaryError}>{error}</div>}

        <div>
          <button>Сахранитъ</button>
        </div>
        <div>
          <b>Загрузи свойо новое фото </b>
          <input type="file" onChange={onPhotoSelected} />
        </div>

        <div>
          <b>Имя:</b>
          <Field
            //   validate={[required]}
            placeholder="Как тя зовут?"
            name="fullName"
            component={Input}
          />
        </div>

        <div>
          <b>Ищю ли йа работу</b>:
          <Field
            //   validate={[required]}
            name="lookingForAJob"
            component={Input}
            type="checkbox"
          />
        </div>

        <div>
          <b>Мой профшнл скиллс</b>:
          <Field
            placeholder="Введите хоть что-то.."
            name="lookingForAJobDescription"
            component={Textarea}
          />
        </div>

        <div>
          <b>Обо мне</b>:
          <Field
            //   validate={[required]}
            placeholder="Опишите свои симптомы.."
            name="aboutMe"
            component={Textarea}
          />
        </div>

        <div>
          {Object.keys(profile.contacts).map((key) => {
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
          })}
        </div>
      </div>
    </form>
  )
}

const ProfileDataReduxForm = reduxForm({ form: 'editProfile' })(ProfileDataForm)

export default ProfileDataReduxForm
