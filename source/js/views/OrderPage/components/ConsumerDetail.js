import React, { Component } from 'react'
import { getIcon, getHasuraId } from './../utils'
import styled from 'styled-components'
import { validateNumType, checkCtrlA } from './../utils'
import { mountModal, unMountModal } from '@components/ModalBox/utils'
import ConfirmModal from '@components/ModalBox/ConfirmModal'
import showTakeNotes from './ShowTakeNotes'
import * as ActionTypes from './../constants/actions'

class ConsumerDetail extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleForceRedeem = this.handleForceRedeem.bind(this)
    this.createNote = this.createNote.bind(this)
    this.showTakeNotes = this.showTakeNotes.bind(this)
  }

  handleChange(e) {
    if (!(validateNumType(e.keyCode) || checkCtrlA(e))) {
      e.preventDefault()
    }
  }

  handleForceRedeem() {
    const { actions } = this.props
    actions.forceRedeem()
  }

  createNote(data) {
    const { orderId, actions } = this.props
    mountModal(ConfirmModal({
      heading: 'Create note',
      confirmMessage: 'Are you sure you want to create the note?',
      handleConfirm: () => {
        actions.createNote({
          order_id: orderId,
          support_id: parseInt(getHasuraId()),
          notes: data.note,
          issue_name: data.issueName
        }, ActionTypes.REQUEST_FETCH_ORDER_DETAIL)
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

  render() {
    const {
      isOrderAssigned,
      deliveryCharge,
      ordersType,
      openAssignOrderModal,
      customer
    } = this.props

    return (
      <div className='card'>
        <div className='card-head'>
          <h4>Consumer</h4>
        </div>
        <div className='card-body'>
          {
            ordersType !== 'history' &&
            <button
              onClick={this.showTakeNotes}
              title="Show catalogue"
              style={{
                float: 'right',
                marginRight: '5px',
                cursor: 'pointer',
                padding: '2px 20px'
              }}>
              Take notes
            </button>
          }
          {
            customer.id
            ? <p>
                <span><b>ID: </b></span>
                <span>{customer.id}</span>
              </p>
            : ''
          }
          {
            customer.name
            ? <p>
                <span><b>Name: </b></span>
                <span>{customer.name}</span>
              </p>
            : ''
          }
          {
            customer.phone
            ? <p>
                <span><b>Phone: </b></span>
                <span>{customer.phone}</span>
              </p>
            : ''
          }
          {
            customer.flatNo
            ? <p>
                <span><b>Flat no: </b></span>
                <span>{customer.flatNo}</span>
              </p>
            : ''
          }
          {
            customer.landmark
            ? <p>
                <span><b>Landmark: </b></span>
                <span>{customer.landmark}</span>
              </p>
            : ''
          }
          <p className='subhead'>Address:</p>
          <p>{customer.address}</p>
        </div>
      </div>
    )
  }
}

export default ConsumerDetail
