import React, { Component } from 'react'
import { getIcon } from './utils'
import './index.scss'

class NavBar extends Component {
  constructor() {
    super()
    this.state = {
      shouldDeliever: true
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    const { shouldDeliever } = this.state
    this.setState({ shouldDeliever: !shouldDeliever })
  }
  render() {
    const { shouldDeliever } = this.state
    return (
      <header>
        <ul>
          <li className="logo">
            <img src="https://www.hipbar.com/wp-content/uploads/2017/02/first_fold_logo.png" />
          </li>
          <li className="resume-pause">
            <div>
              <span>
                {
                  shouldDeliever
                  ? 'Pause Delieveries'
                  : 'Continue Delieveries'
                }
              </span>
              <span onClick={this.handleClick}>
                {
                  shouldDeliever
                  ? getIcon('pause')
                  : getIcon('play')
                }
              </span>
            </div>
          </li>
        </ul>
      </header>
    )
  }
}

export default NavBar
