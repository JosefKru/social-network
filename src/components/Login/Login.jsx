import React from 'react'
import { connect } from 'react-redux'
import { LoginReduxForm } from './LoginForm/LoginForm'
import { login } from './../../redux/auth-reducer'
import { Navigate } from 'react-router'

const Login = (props) => {
  const onSubmin = (formData) => {
    props.login(formData.login, formData.password, formData.rememberMe)
  }

  if (props.isAuth) {
    return <Navigate to="/profile" />
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmin} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
  }
}

export default connect(
  mapStateToProps,
  { login }
)(Login)
