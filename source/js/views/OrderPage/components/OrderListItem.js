import React, { Component } from 'react'
import moment from 'moment'
import { getHasuraRole, getHasuraId, getIcon } from './../utils'
import { mountModal, unMountModal } from '@components/ModalBox/utils'
import ConfirmModal from '@components/ModalBox/ConfirmModal'
import Notes from './Notes'

function getTimeDiff(d2) {
  const d1 = new Date()
  return Math.round(
    (d1 - new Date(d2)) / 60000
  )
}

function Moment(time) {
  return {
    format: function(format) {
      return moment(time).format('MMM Do YY, h:mm a')
    }
  }
}


class OrderListItem extends Component {
  constructor() {
    super()
    this.state = {
      shouldMountNotesBox: false,
      notesBoxPosition: {}
    }
    this.openAssignOrderModal = this.openAssignOrderModal.bind(this)
    this.handleConfirmAssign = this.handleConfirmAssign.bind(this)
    this.handleShowNotes = this.handleShowNotes.bind(this)
  }
  openAssignOrderModal() {
    this.props.unmountOrderDetail()
    mountModal(ConfirmModal({
      heading: 'Assign order',
      confirmMessage: 'Are your sure you want to assign this order?',
      handleConfirm: this.handleConfirmAssign
    }))
  }

  handleConfirmAssign() {
    const { actions, id } = this.props
    const postData = {
      support_id: parseInt(getHasuraId()),
      order_id: id
    }
    actions.assignOrder(postData)
    unMountModal()
  }

  handleShowNotes(e) {
    const { actions, id } = this.props
    const posObj = e.target.getBoundingClientRect()
    const notesBoxPosition = {
      top: posObj.top,
      left: posObj.left
    }

    actions.fetchNotes({ id })
    this.setState({ notesBoxPosition, shouldMountNotesBox: true })
  }

  render() {

    const {
      ordersType,
      consumerName,
      id, consumerId,
      orderStatus,
      orderPlacedTime,
      orderAttemptedTime,
      cartValue,
      retailer_notified_time,
      dp_delivered_time,
      retailer_accepted_time,
      cancellation_time,
      cancellation_return_time,
      dp_reached_to_consumer_time,
      dp_arrived_at_store_time,
      dp_accepted_time,
      dp_notified_time,
      dp_picked_up_time,
      dp_confirmation_time,
      assignedTo,
      assignedToId,
      consumerPhone,
      consumerAddress,
      reason,
      cartDetails,
      closestRetailers,
      primeRetailer,
      unavailableProduct,
      localityName,
      loadingNotes,
      notesData
    } = this.props

    const supportId = 1
    const isOrderAssigned = supportId == assignedToId



    let orderChar = null
    let formula = null
    let article = null
    let time = null
    if (orderStatus) {
      orderChar = orderStatus.split('::')[0]
      formula = orderStatus.split('::')[1]
      article = orderStatus.split('::')[2]
      time = eval(formula)
    }

    let orderPlacedWaitingTime = null

    if (orderPlacedTime) {
      orderPlacedWaitingTime = getTimeDiff(orderPlacedTime)
    }

    let statusStyle = {}
    if (cancellation_time) {
      statusStyle = {
        color: time >=5 && !cancellation_time && getHasuraRole() != 'excise_person'? '#ff3b34' : '',
        fontStyle: 'italic',
      }
    }

    // console.log(formula)

    return (
      <tr className='orders-list-item' onClick={(e) => {this.props.handleClick(id, e)} }>
        {
          ordersType !== 'attempted'
          ? <td
            className={
            `${orderPlacedWaitingTime >=60 && ordersType !== 'history' && getHasuraRole() != 'excise_person'
            ? 'danger'
            : ''}`
            }
            >{id}</td>
          : <td>{cartValue}</td>
        }
        {
          ordersType !== 'attempted'
          ? <td style={statusStyle} className='order-status'>
              {`${orderChar} ${ time ? time : ''} ${article ? article : ''}`}
            </td>
          : ''
        }
        <td>{consumerId}</td>
        { this.props.canAccess('consumer-col') ? <td>{consumerName}</td> : '' }
        { this.props.canAccess('consumer-col') ? <td>{consumerPhone}</td> : '' }
        { ordersType == 'attempted' ? <td>{consumerAddress}</td> : '' }
        { ordersType == 'attempted' ? <td>{reason}</td> : '' }
        { ordersType == 'attempted' ? <td>{cartDetails}</td> : '' }
        { ordersType == 'attempted' ? <td>{closestRetailers}</td> : '' }
        { ordersType == 'attempted' ? <td>{unavailableProduct}</td> : '' }
        { ordersType == 'attempted' ? <td>{primeRetailer}</td> : '' }
        { ordersType == 'attempted' ? <td>{localityName}</td> : '' }
        { this.props.canAccess('consumer-col') && ordersType !== 'attempted' ? <td>{assignedToId}</td> : '' }
        { ordersType !== 'attempted' ? <td>{Moment(orderPlacedTime).format('MMM Do YY', 'h:mm a')}</td> : <td>{Moment(orderAttemptedTime).format('MMM Do YY', 'h:mm a')}</td>}
        { ['attempted', 'history', 'cancellation'].indexOf(ordersType) === -1 ? <td><button onClick={this.openAssignOrderModal}>Assign</button></td> : ''}
        { ['attempted', 'history', 'cancellation'].indexOf(ordersType) === -1 ? <td><button onClick={this.handleShowNotes}>Notes</button></td> : '' }
        {
          this.state.shouldMountNotesBox &&
          <Notes data={notesData} createNote={this.props.actions.createNote} id={id} loadingNotes={loadingNotes} position={this.state.notesBoxPosition} />
        }
      </tr>
    )
  }
}

export default OrderListItem
