import React from 'react'
import style from './style.module.css'

const withFormElement = (Element) => ({ input, meta, ...props }) => {
  const hasErorr = meta.error && meta.touched
  return (
    <div
      className={hasErorr ? `${style.formControl} ${style.error}` : undefined}
    >
      <Element {...input} {...props} />
      <div>{hasErorr && <span>{meta.error}</span>}</div>
    </div>
  )
}

export const Textarea = withFormElement('textarea')

export const Input = withFormElement('input')
