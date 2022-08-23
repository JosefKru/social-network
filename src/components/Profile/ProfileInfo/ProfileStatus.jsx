import React from 'react'

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    status: this.props.status,
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status,
      })
    }
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
            <strong>
              <span onDoubleClick={this.activateEditMode}>
                {this.props.status || 'local-state'}
              </span>
            </strong>
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
