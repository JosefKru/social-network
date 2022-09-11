const SEND_MESSAGE = 'dialogs/SEND_MESSAGE'

export type InitialStateType = typeof initialState

type DialogType = {
  id: number
  name: string
}
type MessageType = {
  id: number
  message: string
}

let initialState = {
  dialogs: [
    { id: 1, name: 'NooK' },
    { id: 2, name: 'KALbI4' },
    { id: 3, name: 'Rado' },
  ] as Array<DialogType>,
  messages: [
    { id: 1, message: 'Пиривет' },
    { id: 2, message: 'Как дела?' },
    { id: 3, message: 'Как настроение?' },
    { id: 4, message: 'Как тебе погодка за окном?' },
  ] as Array<MessageType>,
}

const dialogsReducer = (
  state = initialState,
  action: any
): InitialStateType => {
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages,
          { id: 6, message: action.newMessageBody },
        ],
      }
    default:
      return state
  }
}

type SendMessageActionType = {
  type: typeof SEND_MESSAGE
  newMessageBody: string
}

export const sendMessageCreator = (
  newMessageBody: string
): SendMessageActionType => ({
  type: SEND_MESSAGE,
  newMessageBody,
})

export default dialogsReducer
