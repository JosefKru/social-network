import profileReducer from './profile-reducer'
import dialogsReducer from './dialogs-reducer'

let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: 'test test test', likesCount: 12 },
        { id: 2, message: 'fake fake fake', likesCount: 1 },
        { id: 3, message: 'test test test', likesCount: 9 },
        { id: 4, message: 'fake fake fake', likesCount: 15 },
      ],
      newPostText: '',
    },
    dialogsPage: {
      dialogs: [
        { id: 1, name: 'NooK' },
        { id: 2, name: 'Rado' },
        { id: 3, name: '400kg' },
      ],
      messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'Hello' },
        { id: 3, message: 'Welcome' },
      ],
      newMessageBody: '',
    },
    sidebar: {},
  },
  _callSubscriber() {
    console.log('State changed')
  },

  getState() {
    return this._state
  },
  subscribe(observer) {
    this._callSubscriber = observer // observer
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action)
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
    this._state.sidebar = sidebarReducer(this._state.sidebar, action)

    this._callSubscriber(this._state)
  },
}

window.store = store

export default store
