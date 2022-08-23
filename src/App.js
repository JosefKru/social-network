import React from 'react'
import './App.css'
import HeaderContainer from './components/Header/HeaderContainer'
import Navbar from './components/Navbar/Navbar'
import ProfileContainer from './components/Profile/ProfileContainer'
import { Routes, Route } from 'react-router-dom'
import DialogsContainer from './components/Dialogs/DialogsContainer'
import UsersContainer from './components/Users/UsersContainer'
import Login from './components/Login/Login'
import { connect } from 'react-redux'
import { initializeApp } from './redux/app-reducer'
import Preloader from './components/common/Preloader/Preloader'
import { compose } from 'redux'
import { withRouter } from './hoc/withRouter'

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

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    { initializeApp }
  )
)(App)
