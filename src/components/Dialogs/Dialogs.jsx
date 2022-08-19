import React from 'react'
import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import { Field, reduxForm } from 'redux-form'

const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component="textarea"
          name="newMessageBody"
          placeholder="Введите ваше сообщение"
        />
      </div>
      <div>
        <button>Отправитъ</button>
      </div>
    </form>
  )
}

const AddMessgaeFormRedux = reduxForm({ form: 'addMessageForm' })(
  AddMessageForm
)

const Dialogs = (props) => {
  let state = props.dialogsPage

  let dialogsElements = state.dialogs.map((d) => (
    <DialogItem name={d.name} key={d.id} id={d.id} />
  ))
  let messagesElements = state.messages.map((m) => (
    <Message message={m.message} key={m.id} />
  ))

  let onSendMessageClick = (values) => {
    props.sendMessage(values.newMessageBody)
  }

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>
        <div>{messagesElements}</div>
        <AddMessgaeFormRedux onSubmit={onSendMessageClick} />
      </div>
    </div>
  )
}

export default Dialogs
