import React, { Component } from 'react'
import '@sass/components/_search-box.scss'
import { getIcon } from './../utils'

class SearchInput extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handlePress = this.handlePress.bind(this)
    this.state = {
      searchQuery: props.searchQuery
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ searchQuery: nextProps.searchQuery })
  }

  search(searchQuery) {
    const { searchAPI, pagesLimit, pageOffset } = this.props

    this.props.setQueryString(searchQuery, 0)
    this.props.setSearchQuery(searchQuery)
    this.props.resetPagination()
    this.props.unmountOrderDetail()
    
    this.props.search({
      offset: 0,
      limit: pagesLimit,
      query: searchQuery
    }, searchAPI)
  }

  handleChange(e) {
    const searchQuery = e.target.value
    this.setState({ searchQuery })
    // this.search(searchQueryString)
  }

  handlePress(e) {
    const { searchQuery } = this.state
    if (e.keyCode === 13 && searchQuery.length) {
      this.search(searchQuery)
    }
  }

  render() {
    const { searchQuery } = this.state
    return (
      <div className='search-input'>
        <input
          placeholder='Search...'
          onChange={this.handleChange}
          onKeyDown={this.handlePress}
          value={searchQuery}
        />
        <span>{ getIcon('search')}</span>
      </div>
    )
  }
}

export default SearchInput
