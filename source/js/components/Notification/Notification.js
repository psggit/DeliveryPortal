import React from 'react'
import { unmountComponentAtNode } from 'react-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


export default class Notification extends React.Component {
  constructor() {
    super()
    this.state = {
      x: 0
    }
  }
  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({ x: 0 })

  //     setTimeout(() => {
  //       this.setState({ x: 320 }, ()=> {
  //         unmountComponentAtNode(document.getElementById('notification-container'))
  //       })
  //     }, 3000)
  //   }, 100)
  // }
  render() {
    const { message, type } = this.props
    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}>
          <div key="not-1" className={`notification ${type}`}>
            <span>{ message }</span>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}