import React from 'react'
import './index.scss'
import { unmountComponentAtNode } from 'react-dom'

class ModalBox extends React.Component {
  handleClick(e) {
    if (e.keyCode == 27) {
      unmountComponentAtNode(document.getElementById('confirm-modal'))
      if (document.querySelector('.newFeature') !== null) {
        document.querySelector('.newFeature').className = 'sm-group2 smg2-1'
      }

      document.body.setAttribute('class', '')
      localStorage.setItem('isGotscheduleNewFeature', true)
    }
  }

  handlePress(e) {
      if (e.target.className === 'modal-overlay') {
        unmountComponentAtNode(document.getElementById('confirm-modal'))
        document.body.setAttribute('class', '')
      }
  }

  componentDidMount() {
    window.addEventListener('keyup', this.handleClick)
    document.addEventListener('click', this.handlePress)
  }
  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleClick)
    document.removeEventListener('click', this.handlePress)
  }
  render () {
    return (
      <div className='modal-overlay'>
        <div className='modal-container'>
          { this.props.children }
        </div>
      </div>
    )
  }
}

export default ModalBox