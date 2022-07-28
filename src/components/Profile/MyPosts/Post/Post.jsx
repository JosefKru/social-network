import React from 'react'
import s from './Post.module.css'

const Post = (props) => {
  return (
    <div className={s.item}>
      <img
        src="https://w7.pngwing.com/pngs/777/110/png-transparent-sadness-smiley-emoticon-smiley-miscellaneous-face-head.png"
        alt="Avatar"
      />
      {props.message}
      <div>
        <span>like</span> {props.likesCount}
      </div>
    </div>
  )
}

export default Post
