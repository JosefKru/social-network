import React, { useEffect, useState } from 'react'

const ProfileStatusFun = (props) => {
  const [status, setStatus] = useState(`${props.status}`)
  const [editMode, setEditMode] = useState(false)

  const activateEditMode = () => {
    setEditMode(true)
  }

  const deactivateEditMode = () => {
    setEditMode(false)
    props.updateStatus(status)
  }

  useEffect(() => {
    if (!status) {
      setStatus(status)
    }
  }, [])

  return editMode ? (
    <div>
      <input
        onBlur={deactivateEditMode}
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        autoFocus
      />
    </div>
  ) : (
    <div>
      <span onDoubleClick={activateEditMode}>{props.status}</span>
    </div>
  )
}

export default ProfileStatusFun
