import React from 'react'
import { render } from 'react-dom'
import Notification from './Notification'
import './index.scss'

export default function Notify(message, type = 'success') {
  // const className = "notification-container"

  // const el = document.querySelector(`.${className}`)
  // if (el) {
  //   el.parentNode.removeChild(el)
  // }

  // const container = document.createElement("div")
  // container.setAttribute("class", className)
  // document.body.appendChild(container)

  render (
   <Notification
    message={message}
    type={type}
   />,
   document.getElementById('notification-container')
  )
}