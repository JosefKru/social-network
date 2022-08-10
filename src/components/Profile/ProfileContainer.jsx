import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { setUserProfile, getProfile } from './../../redux/profile-reducer'
import { Navigate } from 'react-router-dom'
import { WithAuthRedirect } from '../../hoc/WithAuthRedirect'

// wrapper to use react router's v6 hooks in class component(to use HOC pattern, like in router v5)
function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation()
    let navigate = useNavigate()
    let params = useParams()
    return <Component {...props} router={{ location, navigate, params }} />
  }

  return ComponentWithRouterProp
}

class ProfileContainer extends React.Component {
  componentDidMount() {
    let profileId = this.props.router.params.profileId
    if (!profileId) {
      profileId = 2
    }
    this.props.getProfile(profileId)
  }

  render() {
    if (!this.props.isAuth) {
      return <Navigate to="/login" />
    }
    return <Profile {...this.props} />
  }
}

const AuthRedirectComponent = WithAuthRedirect(ProfileContainer)

let mapStateToPropsForRedirect = (state) => ({
  isAuth: state.auth.isAuth,
})

// AuthRedirectComponent = connect(
//   mapStateToPropsForRedirect,
//   {}
// )(withRouter(AuthRedirectComponent))

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
})

export default connect(
  mapStateToProps,
  { setUserProfile, getProfile }
)(withRouter(AuthRedirectComponent))
