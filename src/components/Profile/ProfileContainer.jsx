import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { setUserProfile } from './../../redux/profile-reducer'
import { usersAPI } from './../../api/api'

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

    usersAPI.getProfile(profileId).then((data) => {
      this.props.setUserProfile(data)
    })
  }

  render() {
    return <Profile {...this.props} />
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
})

export default connect(
  mapStateToProps,
  { setUserProfile }
)(withRouter(ProfileContainer))
