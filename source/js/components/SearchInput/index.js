import React, { Component } from 'react'
import '@sass/components/_search-box.scss'
import { getIcon } from './../utils'

class SearchInput extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handlePress = this.handlePress.bind(this)
  }

  handleChange(e) {
    const queryString = e.target.value
    this.setState({ queryString })
  }

  handlePress(e) {
    if (e.keyCode === 13) {
      const { queryString } = this.state
      // e.target.value = ''
      this.props.search()
    }
  }

  render() {
    return (
      <div className='search-input'>
        <input
          placeholder='Search...'
          onChange={this.handleChange}
          onKeyDown={this.handlePress}
        />
        <span>{ getIcon('search')}</span>
      </div>
    )
  }
}

export default SearchInput
