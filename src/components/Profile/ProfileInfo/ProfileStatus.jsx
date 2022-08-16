import React from 'react'
import { updateStatus } from './../../../redux/profile-reducer'

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    status: this.props.status,
  }

  activateEditMode = () => {
    this.setState({
      editMode: true,
    })
    // this.forceUpdate()       // Кастыльный метод запуска повторного рендера
  }

  deactivateEditMode = () => {
    this.setState({
      editMode: false,
      status: this.props.status,
    })
    this.props.updateStatus(this.state.status)
  }

  onStatusChange = (e) => {
    this.setState({
      status: e.currentTarget.value,
    })
  }

  render() {
    return (
      <>
        {!this.state.editMode ? (
          <div>
            <span onDoubleClick={this.activateEditMode}>
              {this.props.status || '---'}
            </span>
          </div>
        ) : (
          <div>
            <input
              onChange={this.onStatusChange}
              value={this.state.status}
              autoFocus
              onBlur={this.deactivateEditMode}
            />
          </div>
        )}
      </>
    )
  }
}

export default ProfileStatus
