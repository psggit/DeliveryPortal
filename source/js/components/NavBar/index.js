import React, { Component } from 'react'
import { getIcon } from './../utils'
import SearchInput from './../SearchInput'

import './index.scss'

class NavBar extends Component {
  constructor() {
    super()
    this.state = {
      shouldDeliever: true
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleLogout() {
    localStorage.clear()
    location.href = '/login'
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
            <img src="https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAA1JAAAAJGI0MjhiMjNhLTcyYzctNGQyYi1hNjlmLTM5MTU0MWZmMzA4MQ.png" />
          </li>
          <li className="resume-pause">
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
          </li>
          <li>
            <SearchInput search={this.props.search} />
          </li>
          <li className='user' onClick={this.handleLogout}>Logout</li>
        </ul>
      </header>
    )
  }
}

export default NavBar
