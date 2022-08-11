import React from 'react'

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
  }

  activateEditMode() {
    this.setState({
      editMode: true,
    })
    // this.forceUpdate()       // Кастыльный метод запуска повторного рендера
  }
  deactivateEditMode() {
    this.setState({
      editMode: false,
    })
  }

  render() {
    return (
      <>
        {!this.state.editMode ? (
          <div>
            <span onDoubleClick={this.activateEditMode.bind(this)}>
              {this.props.status}
            </span>
          </div>
        ) : (
          <div>
            <input
              value={this.props.status}
              autoFocus
              onBlur={this.deactivateEditMode.bind(this)}
            />
          </div>
        )}
      </>
    )
  }
}

export default ProfileStatus
