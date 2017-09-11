import React, { Component } from 'react'
import moment from 'moment'
import { getHasuraRole } from './../utils'
import { mountModal, unMountModal } from '@components/ModalBox/utils'
import ConfirmModal from '@components/ModalBox/ConfirmModal'

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
    this.openAssignOrderModal = this.openAssignOrderModal.bind(this)
    this.handleConfirmAssign = this.handleConfirmAssign.bind(this)
  }
  openAssignOrderModal() {
    mountModal(ConfirmModal({
      heading: 'Assign order',
      confirmMessage: 'Are your sure you want to assign this order?',
      handleConfirm: this.handleConfirmAssign
    }))
  }

  handleConfirmAssign() {
    const { actions, id } = this.props
    const postData = {
      support_id: 1,
      order_id: id
    }
    actions.assignOrder(postData)
    unMountModal()
  }
  render() {

    const {
      consumerName,
      id, consumerId,
      orderStatus,
      orderPlacedTime,
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
      assignedTo,
      assignedToId,
      consumerPhone
    } = this.props

    const supportId = 1
    const isOrderAssigned = supportId == assignedToId
    


    const orderChar = orderStatus.split('::')[0]
    const formula = orderStatus.split('::')[1]
    const article = orderStatus.split('::')[2]

    const time = eval(formula)
    
    
    const orderPlacedWaitingTime = getTimeDiff(orderPlacedTime)
    
    const statusStyle = {
      color: time >=5 && !cancellation_time && getHasuraRole() != 'excise_person'? '#ff3b34' : '',
      fontStyle: 'italic',
    }

    // console.log(formula)
    
    return (
      <tr
      onClick={() => {this.props.handleClick(id)} }
      className={
        `orders-list-item ${orderPlacedWaitingTime >=60 && getHasuraRole() != 'excise_person'
        ? 'danger'
        : ''}`
        }>
        <td>{id}</td>
        <td style={statusStyle} className='order-status'>
          {`${orderChar} ${ time ? time : ''} ${article ? article : ''}`}
        </td>
        <td>{consumerId}</td>
        { this.props.canAccess('consumer-col') ? <td>{consumerName}</td> : '' }
        { this.props.canAccess('consumer-col') ? <td>{consumerPhone}</td> : '' }
        { this.props.canAccess('consumer-col') ? <td>{!assignedTo ? <button disabled={isOrderAssigned} onClick={this.openAssignOrderModal}>Assign</button> : assignedTo}</td> : '' }
        <td>{Moment(orderPlacedTime).format('MMM Do YY, h:mm a')}</td>
      </tr>
    )
  }
}

export default OrderListItem
