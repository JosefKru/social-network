import React from 'react'
import { Field, reduxForm } from 'redux-form'
import s from './MyPosts.module.css'
import Post from './Post/Post'

const AddPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component="textarea"
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
