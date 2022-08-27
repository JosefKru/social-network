import dialogsReducer, { sendMessageCreator } from '../dialogs-reducer'

let state = {
  messages: [
    { id: 1, message: 'Пиривет' },
    { id: 2, message: 'Как дела?' },
    { id: 3, message: 'Как настроение?' },
    { id: 4, message: 'Как тебе погодка за окном?' },
  ],
}

it('length of messages should be incremented', () => {
  //1 initialization
  let action = sendMessageCreator('New message text')

  //2
  let newState = dialogsReducer(state, action)

  //3
  expect(newState.messages.length).toBe(5)
})
