import React from 'react'
import { unmountComponentAtNode } from 'react-dom'
import PropTypes from 'prop-types'
import './index.scss'

class Dropdown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      options: props.options,
      isActive: false,
      selected: props.selected || '',
      activeItem: -1
    }
    this.handleFocus = this.handleFocus.bind(this)
    this.closeDropdownFromDoc = this.closeDropdownFromDoc.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.setOptions = this.setOptions.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }
  componentDidMount() {
    document.addEventListener('click', this.closeDropdownFromDoc, false)
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.closeDropdownFromDoc, false)
  }
  handleFocus() {
    this.setState({ isActive: true, activeItem: -1 })
  }
  handleClick(selected) {
    this.setState({ selected })
  }
  scrollDown(selectedItem, scrollContainer) {
    if (selectedItem !== null && selectedItem.offsetTop > 196) {
      scrollContainer.scrollTop += selectedItem.offsetHeight
    }
  }
  scrollUp(selectedItem, scrollContainer) {
    if (selectedItem !== null && selectedItem.offsetTop <= 783) {
      scrollContainer.scrollTop -= selectedItem.offsetHeight
    }
  }
  handleKeyDown(e) {
    const { activeItem, options } = this.state
    const selectedItem = document.querySelector('.is-selected')
    const scrollContainer = document.querySelector('.dropdown-list>ul')

    console.log(activeItem);

    if (e.keyCode === 40 && (activeItem >= -1 && activeItem < options.length)) {
      this.setState({activeItem: activeItem + 1}, () => { this.scrollDown(selectedItem, scrollContainer) })

    } else if (e.keyCode === 38 && (activeItem > -1 && activeItem <= options.length)) {
      this.setState({activeItem: activeItem - 1}, () => { this.scrollUp(selectedItem, scrollContainer) })
    }
    if (e.keyCode === 13 && (activeItem > -1 && activeItem < options.length)) {
      this.setState({ selected: options[activeItem].label, isActive: false, activeItem: 0 })
    }
  }
  setOptions(data) {
    this.setState({ options: data.options })
  }
  handleChange(e) {
    const { loadOptions } = this.props
    this.setState({ selected: e.target.value })
    if (loadOptions) {
      this.setState({ options: loadOptions(e.target.value, this.setOptions) })
    }
  }
  closeDropdownFromDoc(e) {
    if (e.target.className !== 'dropdown-input') {
      this.setState({ isActive: false })
    }
  }
  render() {
    const { alignment, searchable, placeholder, loadOptions } = this.props
    const { isActive, selected, options, activeItem } = this.state
    return (
      <div className={`dropdown-container ${isActive ? 'is-active' : ''}`}>
        <input
          className='dropdown-input'
          type='text'
          readOnly={!((loadOptions !== undefined) || searchable)}
          onFocus={this.handleFocus}
          onChange={this.handleChange}
          
          value={selected}
          placeholder={placeholder || 'Select'}
        />
        <div className={`dropdown-list ${alignment === 'bottom' ? 'bottom-aligned' : 'top-aligned'}`}>
          {
            <ul>
              {
                options && options.length
                ? (
                  options.filter(item => {
                    if (!searchable) {
                      return selected.toLowerCase() !== item.label.toLowerCase()
                    } else if (loadOptions === undefined && searchable) {
                      return item.label.toLowerCase().startsWith(selected.toLowerCase())
                    } else {
                      return true
                    }
                  })
                  .map((item, i) => {
                    return (
                      <li
                         className={`${activeItem === i ? 'is-selected' : ''}`}
                         onClick={() => { this.handleClick(item.label) }}>
                        {
                          item.image
                          ? <span className='gravatar'><img src={item.image} /></span>
                          : ''
                        }
                        <span className='option-title'>{ item.label }</span>
                      </li>
                    )
                  })
                )
                : ''
              }
            </ul>
          }
        </div>
      </div>
    )
  }
}

Dropdown.propTypes = {
  options: PropTypes.array,
  alignment: PropTypes.string,
  searchable: PropTypes.bool,
  placeholder: PropTypes.string
}
export default Dropdown
