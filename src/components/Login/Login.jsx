import React from 'react'
import { connect } from 'react-redux'
import { LoginReduxForm } from './LoginForm/LoginForm'
import { login } from './../../redux/auth-reducer'
import { Navigate } from 'react-router'

const Login = ({ isAuth, login, captchaUrl }) => {
  if (isAuth) {
    return <Navigate to="/profile" />
  }

  const onSubmin = (formData) => {
    login(
      formData.login,
      formData.password,
      formData.rememberMe,
      formData.captcha
    )
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmin} captchaUrl={captchaUrl} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
  }
}

export default connect(
  mapStateToProps,
  { login }
)(Login)
