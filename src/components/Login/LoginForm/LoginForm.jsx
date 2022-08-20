import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { required } from '../../../utils/validators/validator'
import { Input } from '../../common/FormControls/FormControls'

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          validate={[required]}
          placeholder="login"
          name="login"
          component={Input}
        />
      </div>
      <div>
        <Field
          validate={[required]}
          placeholder="password"
          name="password"
          component={Input}
          type="password"
        />
      </div>
      <div>
        <Field type="checkbox" name="rememberMe" component={Input} />
        Remember me
      </div>
      <div>
        <button>login</button>
      </div>
    </form>
  )
}

export const LoginReduxForm = reduxForm({
  form: 'login',
})(LoginForm)
