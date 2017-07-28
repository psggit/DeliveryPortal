import React from 'react'
import ModalHeader from '@components/ModalBox/ModalHeader'
import ModalFooter from '@components/ModalBox/ModalFooter'
import ModalBody from '@components/ModalBox/ModalBody'
import ModalBox from '@components/ModalBox'
import { unMountModal } from '@components/ModalBox/utils'

export default function confirmModal (data) {
  return class confirmModal extends React.Component {
    constructor (props) {
      super(props)
      this.state = {

      }
    }
    componentDidMount () {

    }
    render () {
      return (
        <ModalBox>
          <ModalHeader>Modal heading</ModalHeader>
            <ModalBody>Are you sure you want ot assign this order?</ModalBody>
          <ModalFooter>
            <button className='btn btn-secondary' onClick={unMountModal}>Cancel</button>
            <button className='btn btn-primary' onClick={unMountModal}>Confirm</button>
          </ModalFooter>
        </ModalBox>
      )
    }
  }
}
