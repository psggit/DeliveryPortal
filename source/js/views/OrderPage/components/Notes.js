import React from 'react'
import Moment from 'moment'
import showTakeNotes from './ShowTakeNotes'
import { mountModal, unMountModal } from '@components/ModalBox/utils'
import ConfirmModal from '@components/ModalBox/ConfirmModal'
import { getIcon, getHasuraId } from './../utils'
import * as ActionTypes from './../constants/actions'


class Notes extends React.Component{
  constructor() {
    super()
    this.showTakeNotes = this.showTakeNotes.bind(this)
    this.createNote = this.createNote.bind(this)
    this.handleCloseNotes = this.handleCloseNotes.bind(this)
   }

  createNote(data) {
    const { createNote, id } = this.props
    mountModal(ConfirmModal({
      heading: 'Create note',
      confirmMessage: 'Are you sure you want to create the note?',
      handleConfirm: () => {
        createNote({
          order_id: id,
          support_id: parseInt(getHasuraId()),
          notes: data.note,
          issue_name: data.issueName
        }, ActionTypes.REQUEST_FETCH_NOTES)
        unMountModal()
      }
    }))
  }

  showTakeNotes() {
    mountModal(showTakeNotes({
      heading: 'Take notes',
      createNote: this.createNote
    }))
  }

  handleCloseNotes() {
    this.props.unmountNotesBox()
  }

  render() {
    const { data, position, id, loadingNotes } = this.props
    return (
      <div
        className='card'
        style={{
        width: position ? '400px' : '',
        position: position ? 'fixed' : 'static',
        top: position ? position.top : '',
        left: position ? position.left : '',
        transform: position ? 'translateX(-50%)' : 'none',
        zIndex: position ? '1' : '0'
      }}>
        <div className='card-head'>
          <h4>Notes</h4>
          {
            position &&
            <span
              onClick={this.handleCloseNotes}
              style={{
              float: 'right',
              marginTop: '2px',
              cursor: 'pointer'
            }}>
            {getIcon('cross')}
          </span>
          }
        </div>
        <div
          style={{
            maxHeight: '400px',
            overflow: 'auto'
          }}
          className='card-body'>
          <div>
            {
              position &&
              <button style={{ marginBottom: '20px' }} onClick={this.showTakeNotes}>
                create new
              </button>
            }
            {
              !loadingNotes
              ? data.map(item => {
                const note = item.note.trim().split('\n')
                return (
                  <div style={{ border: '1px solid #dfdfdf', marginBottom: '10px' }}>
                    <p style={{
                      margin: '0',
                      padding: '2px 10px',
                      background: '#eaeaea',
                      borderBottom: '1px solid #dfdfdf'
                    }}>
                      {`Support id: ${item.support_id} on ${Moment(item.created_at).format('MMM Do, YYYY')} at ${Moment(item.created_at).format('h:mm a')}`}
                    </p>
                    <p style={{ padding: '10px', paddingBottom: '0', margin: '0' }}>
                      <b>Issue type:</b> &nbsp;
                      { item.issue_name }
                    </p>
                    <p style={{ padding: '10px', margin: '0' }}>
                      <b>Note:</b> <br />
                      {
                        note.map(el => (
                          <span>{ el }<br/></span>
                        ))
                      }
                    </p>
                  </div>
                )
              })
              : 'Loading...'
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Notes
