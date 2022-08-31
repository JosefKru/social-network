import React from 'react'
import DialogsContainer from './components/Dialogs/DialogsContainer'
import Navbar from './components/Navbar/Navbar'
import HeaderContainer from './components/Header/HeaderContainer'
import ProfileContainer from './components/Profile/ProfileContainer'
import Login from './components/Login/Login'
import Preloader from './components/common/Preloader/Preloader'
import UsersContainer from './components/Users/UsersContainer'
import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { connect, Provider } from 'react-redux'
import { initializeApp } from './redux/app-reducer'
import { compose } from 'redux'
import { withRouter } from './hoc/withRouter'
import store from './redux/redux-store'

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp()
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Routes>
            <Route path="/dialogs" element={<DialogsContainer />} />
            <Route path="/profile" element={<ProfileContainer />} />
            <Route path="/profile/:profileId" element={<ProfileContainer />} />
            <Route path="/users" element={<UsersContainer />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized,
  }
}

const AppContainer = compose(
  withRouter,
  connect(
    mapStateToProps,
    { initializeApp }
  )
)(App)

const AppLaunch = (props) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  )
}

export default AppLaunch
