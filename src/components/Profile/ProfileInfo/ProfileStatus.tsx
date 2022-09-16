import React, { ChangeEvent } from 'react'
import style from './ProfileInfo.module.css'

type PropsType = {
  status: string
  isOwner: boolean
  updateStatus: (status: string) => void
}

type StateType = {
  editMode: boolean
  status: string
}

class ProfileStatus extends React.Component<PropsType, StateType> {
  state = {
    editMode: false,
    status: this.props.status,
  }

  componentDidUpdate(prevProps: PropsType, prevState: StateType) {
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

  onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Типизация ивента - ChangeEvent<HTMLInputElement>
    this.setState({
      status: e.currentTarget.value,
    })
  }

  render() {
    return (
      <>
        {!this.state.editMode ? (
          <div className={style.statusContainer}>
            <b>Статусъ</b>:{' '}
            {this.props.isOwner ? (
              <span onDoubleClick={this.activateEditMode}>
                {this.props.status || 'у мня еще пока пчему-то нет статса'}
              </span>
            ) : (
              <span>
                {this.props.status || 'у мня еще пока пчему-то нет статса'}
              </span>
            )}
          </div>
        ) : (
          <div className={style.statusContainer}>
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
