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
      searchQuery: props.searchQuery,
      searched: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ searchQuery: nextProps.searchQuery })
  }

  handleClearSearch() {
    this.setState({
      searchQuery: '',
      searched: false
    })
    
    this.props.setSearchQuery('')
    this.search('', 0)
  }

  search(searchQuery) {
    console.log(searchQuery)
    const { searchAPI, pagesLimit, pageOffset } = this.props

    // this.props.setQueryString(searchQuery, 0)
    this.props.setSearchQuery(searchQuery)
    this.props.resetPagination()
    this.props.unmountOrderDetail()
    
    this.props.search(searchQuery, 0)
  }

  handleChange(e) {
    const searchQuery = e.target.value
    this.setState({ searchQuery })
    // this.search(searchQueryString)
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
          placeholder='Search...'
          onChange={this.handleChange}
          onKeyDown={this.handlePress}
          value={searchQuery}
        />
        { this.state.searchQuery ? <span onClick={this.handleClearSearch} className='clear-search'>{ getIcon('cross') }</span> : '' }
        <span>{ getIcon('search') }</span>
      </div>
    )
  }
}

export default SearchInput
