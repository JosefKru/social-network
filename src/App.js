import React, { Suspense } from 'react'
import Navbar from './components/Navbar/Navbar'
import HeaderContainer from './components/Header/HeaderContainer'
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

const DialogsContainer = React.lazy(() =>
  import('./components/Dialogs/DialogsContainer')
)
const ProfileContainer = React.lazy(() =>
  import('./components/Profile/ProfileContainer')
)

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
          <Suspense fallback={<Preloader />}>
            <Routes>
              <Route path="/dialogs" element={<DialogsContainer />} />
              <Route path="/profile" element={<ProfileContainer />} />
              <Route
                path="/profile/:profileId"
                element={<ProfileContainer />}
              />
              <Route path="/users" element={<UsersContainer />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Suspense>
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
