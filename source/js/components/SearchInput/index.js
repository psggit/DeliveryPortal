import React, { Component } from 'react'
import '@sass/components/_search-box.scss'
import { getIcon } from './../utils'

class SearchInput extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handlePress = this.handlePress.bind(this)
    this.state = {
      queryString: ''
    }
  }

  search(queryString) {
    const { searchAPI, pagesLimit, pageOffset } = this.props

    this.props.setQueryString(queryString, 0)
    this.props.resetPagination()
    this.props.unmountOrderDetail()
    
    this.props.search({
      offset: 0,
      limit: pagesLimit,
      query: queryString
    }, searchAPI)
  }

  handleChange(e) {
    const queryString = e.target.value
    this.setState({ queryString })
    // this.search(queryString)
  }

  handlePress(e) {
    const { queryString } = this.state
    if (e.keyCode === 13 && queryString.length) {
      this.search(queryString)
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
