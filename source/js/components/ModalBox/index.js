import React from 'react'
import './index.scss'

class ModalBox extends React.Component {
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
