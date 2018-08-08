import React, { Component } from 'react'
import '@sass/components/_search-box.scss'
import { getIcon } from './../utils'

class SearchInput extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handlePress = this.handlePress.bind(this)
    this.handleClearSearch = this.handleClearSearch.bind(this)
    this.state = {
      searchQuery: props.searchQuery || '',
      searched: false
    }
  }

  handleClearSearch() {
    this.setState({
      searchQuery: '',
      searched: false
    })

    if (this.props.clearSearch) {
      this.props.clearSearch()
    }
  }

  search(searchQuery) {
    this.props.search(searchQuery)
  }

  handleChange(e) {
    const searchQuery = e.target.value
    this.setState({ searchQuery })
    if (!searchQuery.length) {
      this.handleClearSearch()
    }
  }

  handlePress(e) {
    const { searchQuery } = this.state
    if (e.keyCode === 13 && searchQuery.length) {
      this.setState({ searched: true })
      this.search(searchQuery)
    }
  }

  render() {
    const { searchQuery } = this.state
    return (
      <div className='search-input'>
        <input
          placeholder={this.props.placeholder || 'Search...'}
          onChange={this.handleChange}
          onKeyDown={this.handlePress}
          value={searchQuery}
          maxLength={this.props.maxLength || ''}
        />
        { this.state.searchQuery ? <span onClick={this.handleClearSearch} className='clear-search'>{ getIcon('cross') }</span> : '' }
        <span>{ getIcon('search') }</span>
      </div>
    )
  }
}

export default SearchInput
