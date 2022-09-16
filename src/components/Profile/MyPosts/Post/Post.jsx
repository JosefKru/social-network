import React from 'react'
import s from './Post.module.css'

const Post = ({ message, likesCount }) => {
  return (
    <div className={s.item}>
      <div className={s.img}>
        <img
          src="https://w7.pngwing.com/pngs/777/110/png-transparent-sadness-smiley-emoticon-smiley-miscellaneous-face-head.png"
          alt="Avatar"
        />
      </div>
      <div className={s.message}>{message}</div>
      <div className={s.like}>
        <span>&#128148;</span> {likesCount}
      </div>
    </div>
  )
}

export default Post
