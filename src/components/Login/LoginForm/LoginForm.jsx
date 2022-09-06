import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { required } from '../../../utils/validators/validator'
import { Input } from '../../common/FormControls/FormControls'
import style from '../../common/FormControls/style.module.css'

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          validate={[required]}
          placeholder="логин"
          name="login"
          component={Input}
        />
      </div>
      <div>
        <Field
          validate={[required]}
          placeholder="пароль"
          name="password"
          component={Input}
          type="password"
        />
      </div>
      <div>
        <Field type="checkbox" name="rememberMe" component={Input} />
        <span>Запомнить</span>
      </div>
      {captchaUrl && <img src={captchaUrl} alt="" />}
      {captchaUrl && (
        <Field
          placeholder="Введите символы"
          validate={[required]}
          component={Input}
          name="captcha"
        />
      )}

      {error && <div className={style.formSumaryError}>{error}</div>}

      <div>
        <button>login</button>
      </div>
    </form>
  )
}

export const LoginReduxForm = reduxForm({
  form: 'login',
})(LoginForm)
