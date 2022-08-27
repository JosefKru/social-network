const SEND_MESSAGE = 'dialogs/SEND_MESSAGE'

let initialState = {
  dialogs: [
    { id: 1, name: 'NooK' },
    { id: 2, name: 'KALbI4' },
    { id: 3, name: 'Rado' },
  ],
  messages: [
    { id: 1, message: 'Пиривет' },
    { id: 2, message: 'Как дела?' },
    { id: 3, message: 'Как настроение?' },
    { id: 4, message: 'Как тебе погодка за окном?' },
  ],
}

const dialogsReducer = (state = initialState, action) => {
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

export const sendMessageCreator = (newMessageBody) => ({
  type: SEND_MESSAGE,
  newMessageBody,
})

export default dialogsReducer
