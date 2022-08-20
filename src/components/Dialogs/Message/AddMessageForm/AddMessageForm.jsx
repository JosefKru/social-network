import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {
  maxLengthCreator,
  required,
} from '../../../../utils/validators/validator'
import { Textarea } from '../../../common/FormControls/FormControls.jsx'

const maxLength100 = maxLengthCreator(100)

const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          validate={[required, maxLength100]}
          component={Textarea}
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

export const AddMessgaeFormRedux = reduxForm({ form: 'addMessageForm' })(
  AddMessageForm
)
