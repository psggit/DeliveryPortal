/**
 * (component_name: Notification)
 * React component for `notifications` default style
 */

import React, { Component } from "react"
import { render } from "react-dom"
import { Motion, spring } from "react-motion"
import { getIcon } from './../utils'

export default class Notification extends Component {
  constructor(props) {
    super(props)

    let { message, type } = this.props
    this.state = {
      x: 0,
      message,
      type
    }
  }

  componentDidMount() {
    const x = 360
    setTimeout(() => {
      this.setState({ x })

      setTimeout(() => {
        this.setState({ x: 0 })
      }, 4000)
    }, 100)
  }

  render() {
    const { x, message, type } = this.state
    return (
      <Motion style={{x: spring(x)}}>
        {({x}) =>
          <div
            className={`notification ${type}`}
            style={{
                WebkitTransform: `translateX(-${x}px)`,
                transform: `translateX(-${x}px)`
              }}
          >
            <span>
              {
                getIcon(type) 
              }
            </span>
            <span>{ message }</span>
          </div>
        }
      </Motion>
    )
  }
}
