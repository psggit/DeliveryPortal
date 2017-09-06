import React, { Component } from 'react'
import Moment from 'moment'
import { mountModal, unMountModal } from '@components/ModalBox/utils'
import ConfirmModal from '@components/ModalBox/ConfirmModal'

function getTimeDiff(d2) {
  const d1 = new Date()
  return Math.round(
    (d1 - new Date(d2)) / 60000
  )
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
    const orderState = 'AwaitingRetailerConfirmation'
    const stateColorMap = {
      'AwaitingRetailerConfirmation': '#ff3b34',
      // 'AwaitingRetailerConfirmation': '#ff3b34',
      // 'AwaitingRetailerConfirmation': '#ff3b34',
    }
    const itemStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '10px',
    }

    const statusStyle = {
      color: stateColorMap[orderState],
      fontStyle: 'italic',
      borderRadius: '5px',
      padding: '0 4px 4px 4px'
    }

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
      assignedTo,
      consumerPhone
    } = this.props

    const orderChar = orderStatus.split('::')[0]
    const formula = orderStatus.split('::')[1]
    const article = orderStatus.split('::')[2]
    
    return (
      <tr className='orders-list-item'>
        <td onClick={() => {this.props.handleClick(id)} }>{id}</td>
        <td style={statusStyle} className='order-status'>
          {`${orderChar} ${eval(formula) ? eval(formula) : ''} ${article ? article : ''}`}
        </td>
        <td>{consumerId}</td>
        <td>{consumerName}</td>
        <td>{consumerPhone}</td>
        <td>{!assignedTo ? <button onClick={this.openAssignOrderModal}>Assign</button> : assignedTo}</td>
        <td>{Moment(orderPlacedTime).format('MMM Do YY, h:mm a')}</td>
      </tr>
    )
  }
}

export default OrderListItem
