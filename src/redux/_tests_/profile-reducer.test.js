import profileReducer, {
  addPostActionCreator,
  deletePost,
} from '../profile-reducer'

let state = {
  posts: [
    { id: 1, message: 'Фантасмагоричный чай', likesCount: 12 },
    { id: 2, message: "Oh boy is's my first trip", likesCount: 11 },
    { id: 3, message: 'Ччеееееееееееееееееееёёёёё', likesCount: 11 },
    { id: 4, message: 'Да-да', likesCount: 11 },
  ],
}

it('length of posts should be incremented', () => {
  //1
  let action = addPostActionCreator('Как тебе такойэ?')

  //2
  let newState = profileReducer(state, action)

  //3
  expect(newState.posts.length).toBe(5)
})

it('message of new posts should be correct', () => {
  //1
  let action = addPostActionCreator('Как тебе такойэ?')

  //2
  let newState = profileReducer(state, action)

  //3
  expect(newState.posts[4].message).toBe('Как тебе такойэ?')
})

it('length of posts should be decrement', () => {
  //1
  let action = deletePost(1)

  //2
  let newState = profileReducer(state, action)

  //3
  expect(newState.posts.length).toBe(3)
})

it('length of posts should`t be decrement, if id is incorrect', () => {
  //1
  let action = deletePost(1000)

  //2
  let newState = profileReducer(state, action)

  //3
  expect(newState.posts.length).toBe(4)
})
