import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import { getProfile } from './../../redux/profile-reducer'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { withRouter } from '../../hoc/withRouter'
import { compose } from 'redux'
import { Navigate } from 'react-router-dom'

class ProfileContainer extends React.Component {
  componentDidMount() {
    let profileId = this.props.router.params.profileId
    if (!profileId) {
      profileId = 2
    }
    this.props.getProfile(profileId)
  }

  render() {
    return <Profile {...this.props} />
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  isAuth: state.auth.isAuth,
})

export default compose(
  connect(
    mapStateToProps,
    { getProfile }
  ),
  withRouter
  // withAuthRedirect
)(ProfileContainer)
