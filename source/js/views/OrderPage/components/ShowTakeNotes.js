import React, { Fragment } from 'react'
import { unMountModal } from '@components/ModalBox/utils'
import ModalHeader from '@components/ModalBox/ModalHeader'
import ModalFooter from '@components/ModalBox/ModalFooter'
import ModalBody from '@components/ModalBox/ModalBody'
import ModalBox from '@components/ModalBox'
import { GET, POST } from '@utils/fetch'
import Search from '@components/SearchInput'
import '@sass/OrdersPage/ShowNotified.scss'
import '@sass/components/_spinner.scss'
import { getIcon } from './../utils'

export default function showTakeNotes(data) {
  return class ShowTakeNotes extends React.Component {
    constructor() {
      super()
      this.state = {
        notesData: ''
      }
      this.handleChange = this.handleChange.bind(this)
      this.handleAddNote = this.handleAddNote.bind(this)
    }

    handleChange(e) {
      this.setState({ notesData: e.target.value })
    }

    handleAddNote() {
      data.createNote(this.state.notesData)
    }


    render() {
      return (
        <ModalBox>
          <ModalHeader>Take note</ModalHeader>
          <ModalBody>
            <textarea
              style={{
                width: '100%',
                height: '200px',
                borderRadius: '2px',
                borderColor: '#dfdfdf'
              }}
              onChange={this.handleChange}
            >
            </textarea>
          </ModalBody>
          <ModalFooter>
            <button className='btn btn-primary' onClick={unMountModal}>Close</button>
            <button className='btn btn-primary' onClick={this.handleAddNote}>Add</button>
          </ModalFooter>
        </ModalBox>
      )
    }
  }
}
