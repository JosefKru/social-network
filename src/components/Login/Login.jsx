import React from 'react'
import { Field, reduxForm } from 'redux-form'

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field placeholder="login" name="login" component="input" />
      </div>
      <div>
        <Field placeholder="password" name="password" component="input" />
      </div>
      <div>
        <Field type="checkbox" name="rememberMe" component="input" />
        Remember me
      </div>
      <div>
        <button>login</button>
      </div>
    </form>
  )
}

const LoginReduxForm = reduxForm({
  form: 'login',
})(LoginForm)

const Login = (props) => {
  const onSubmin = (formData) => {
    console.log(formData)
  }
  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmin} />
    </div>
  )
}

export default Login
