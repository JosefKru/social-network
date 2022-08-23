import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import {
  getProfile,
  getStatus,
  updateStatus,
} from './../../redux/profile-reducer'
import { withRouter } from '../../hoc/withRouter'
import { compose } from 'redux'
import { Navigate } from 'react-router'

class ProfileContainer extends React.Component {
  componentDidMount() {
    let profileId = this.props.router.params.profileId

    if (!profileId) {
      profileId = this.props.authorizedUserId
    }
    this.props.getProfile(profileId)
    this.props.getStatus(profileId)
  }

  render() {
    if (!this.props.router.params.profileId && !this.props.authorizedUserId) {
      return <Navigate replace to="/login" />
    }

    return <Profile {...this.props} />
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.id,
  isAuth: state.auth.isAuth,
})

export default compose(
  connect(
    mapStateToProps,
    { getProfile, getStatus, updateStatus }
  ),
  withRouter
)(ProfileContainer)
