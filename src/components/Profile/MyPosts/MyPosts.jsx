import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { required } from '../../../utils/validators/validator'
import s from './MyPosts.module.css'
import Post from './Post/Post'
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
        <button>Add post</button>
      </div>
    </form>
  )
}

const AddNewPostForm = reduxForm({ form: 'profileAddPostForm' })(AddPostForm)

const MyPosts = (props) => {
  let postsElements = props.posts.map((p) => (
    <Post message={p.message} likesCount={p.likesCount} />
  ))

  let onAddPost = (values) => {
    console.log(values)
    props.addPost(values.newPostText)
  }

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <AddNewPostForm onSubmit={onAddPost} />
      <div className={s.posts}>{postsElements}</div>
    </div>
  )
}

export default MyPosts
