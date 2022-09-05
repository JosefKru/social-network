import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import {
  getProfile,
  getStatus,
  updateStatus,
  savePhoto,
  saveProfile,
} from './../../redux/profile-reducer'
import { withRouter } from '../../hoc/withRouter'
import { compose } from 'redux'
import { Navigate } from 'react-router'

class ProfileContainer extends React.Component {
  refreshProfile() {
    let profileId = this.props.router.params.profileId

    if (!profileId) {
      profileId = this.props.authorizedUserId
    }
    this.props.getProfile(profileId)
    this.props.getStatus(profileId)
  }

  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const profileId = this.props.router.params.profileId
    const prevProfileId = prevProps.router.params.profileId
    if (profileId !== prevProfileId) {
      this.refreshProfile()
    }
  }

  render() {
    if (!this.props.router.params.profileId && !this.props.authorizedUserId) {
      return <Navigate replace to="/login" />
    }

    return (
      <Profile
        saveProfile={this.props.saveProfile}
        isOwner={!this.props.router.params.profileId}
        savePhoto={this.props.savePhoto}
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
      />
    )
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
    { getProfile, getStatus, updateStatus, savePhoto, saveProfile }
  ),
  withRouter
)(ProfileContainer)
