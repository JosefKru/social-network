import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import {
  getProfile,
  getStatus,
  updateStatus,
} from './../../redux/profile-reducer'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { withRouter } from '../../hoc/withRouter'
import { compose } from 'redux'

class ProfileContainer extends React.Component {
  componentDidMount() {
    let profileId = this.props.router.params.profileId
    if (!profileId) {
      profileId = 2
    }
    this.props.getProfile(profileId)
    this.props.getStatus(profileId)
  }

  render() {
    return <Profile {...this.props} />
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  // isAuth: state.auth.isAuth,
})

export default compose(
  connect(
    mapStateToProps,
    { getProfile, getStatus, updateStatus }
  ),
  withRouter
  // withAuthRedirect
)(ProfileContainer)
