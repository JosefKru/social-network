import React from 'react'
import ReactDOM from 'react-dom'
import AppLaunch from './App'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<AppLaunch />, div)
  ReactDOM.unmountComponentAtNode(div)
})
