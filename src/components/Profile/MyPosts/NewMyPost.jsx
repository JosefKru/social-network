import React, { useState } from 'react'
import Post from './Post/Post'
import style from './MyPosts.module.css'
import { Field, reduxForm, reset } from 'redux-form'
import { required } from '../../../utils/validators/validator'
import { maxLengthCreator } from './../../../utils/validators/validator'
import { Textarea } from '../../common/FormControls/FormControls.jsx'

const maxLength10 = maxLengthCreator(10)

const AddPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          validate={[required, maxLength10]}
          component={Textarea}
          cols="50"
          rows="5"
          name="newPostText"
          placeholder="Опишите свой трип.."
        />
      </div>
      <div>
        <button>Добавить пост</button>
      </div>
    </form>
  )
}

const afterSubmit = (_, dispatch) => dispatch(reset('profileAddPostForm'))

const AddNewPostForm = reduxForm({
  form: 'profileAddPostForm',
  onSubmitSuccess: afterSubmit, // обнуляй форму после отправки
})(AddPostForm)

const NewMyPosts = (props) => {
  const [posts, setPosts] = useState([])

  let postsElements = posts.map((p) => (
    <Post text={p.text} key={p.date} likes={p.likes} />
  ))

  //   props.posts
  //     .slice(0) // если хочешь мутировать входные данные, то мутируй их копию
  //     .reverse() // разворачивает массив, то есть мутирует его (для примера)
  //     .map((p) => (
  //       <Post message={p.message} key={p.id} likesCount={p.likesCount} />
  //     ))

  let onAddPost = (values) => {
    const newPost = [
      ...posts,
      {
        date: new Date(),
        text: values.newPostText,
        likes: 0,
      },
    ]
    console.log(newPost)
    setPosts(newPost)
    // props.addPost(values.newPostText)
  }

  return (
    <div className={style.postsBlock}>
      <h3>Мои посты</h3>
      <AddNewPostForm onSubmit={onAddPost} />
      <div className={style.posts}>{postsElements}</div>
    </div>
  )
}

export default NewMyPosts
