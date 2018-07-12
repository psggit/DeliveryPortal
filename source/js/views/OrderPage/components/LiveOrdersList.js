import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Pagination from 'react-js-pagination'
import * as Actions from './../actions'
import LiveOrdersListItem from './LiveOrdersListItem'
import ProgressBar from './ProgressBar'
import { mountModal, unMountModal } from '@components/ModalBox/utils'
import ConfirmModal from '@components/ModalBox/ConfirmModal'
import { getHasuraId } from './../utils'
import Notes from './Notes'
import { getHasuraRole } from './../utils'
import TableView from '@components/TableView'
import moment from 'moment'

function getTimeDiff(d2) {
  const d1 = new Date()
  return Math.round(
    (d1 - new Date(d2)) / 60000
  )
}

class LiveOrdersList extends React.Component {
  constructor() {
    super()
    this.pagesLimit = 40
    this.state = {
      activePage: 1,
      pageOffset: 0,
      shouldMountNotesBox: false,
      notesBoxPosition: {},
      showingProgressBar : false,
      inProgressOrderDetails : new Set()
    }
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.pollData = this.pollData.bind(this)
    this.openAssignOrderModal = this.openAssignOrderModal.bind(this)
    this.handleConfirmAssign = this.handleConfirmAssign.bind(this)
    this.handleShowNotes = this.handleShowNotes.bind(this)
    this.unmountNotesBox = this.unmountNotesBox.bind(this)
    this.toggleProgressBar = this.toggleProgressBar.bind(this)
  }

  handleClick(orderId, e) {
    //e.stopPropagation()
    if (e.target.nodeName !== 'BUTTON') {
      this.props.mountOrderDetail(orderId)
    }
  }

  handlePageChange(pageNumber) {
    let offset = this.pagesLimit * (pageNumber - 1)
    this.setState({ activePage: pageNumber, pageOffset: offset })
    this.props.actions.fetchLiveOrders({
      limit: this.pagesLimit,
      offset
    })
  }

  openAssignOrderModal(orderId) {
    // this.props.unmountOrderDetail()
    mountModal(ConfirmModal({
      heading: 'Assign order',
      confirmMessage: 'Are your sure you want to assign this order?',
      handleConfirm: () => { this.handleConfirmAssign(orderId) }
    }))
  }

  handleConfirmAssign(orderId) {
    const postData = {
      support_id: parseInt(getHasuraId()),
      order_id: orderId
    }
    this.props.actions.assignOrder(postData)
    unMountModal()
  }

  unmountNotesBox() {
    this.setState({ shouldMountNotesBox: false })
  }

  componentDidMount() {
    this.props.actions.fetchLiveOrders({
      limit: 40,
      offset: 0
    })

    this.pollData()
  }

  handleShowNotes(e, orderId) {
    this.orderId = orderId
    const posObj = e.target.getBoundingClientRect()
    const containerScrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    console.log(containerScrollPos);

    const notesBoxPosition = {
      top: posObj.top + containerScrollPos + 19,
      left: posObj.left - 150
    }

    this.props.actions.fetchNotes({ id: orderId })
    this.setState({ shouldMountNotesBox: false }, () => {
      this.setState({ notesBoxPosition, shouldMountNotesBox: true })
    })
  }

  pollData() {
    this.props.actions.fetchLiveOrders({
      limit: 40,
      offset: 0
    })

    this.timeoutId = setTimeout(this.pollData, 30000)
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId)
  }

  toggleProgressBar(e, orderId) {

    e.stopPropagation();

    let { showingProgressBar, inProgressOrderDetails } = this.state
    
    if(!inProgressOrderDetails.has(orderId)) {

        this.setState({ showingProgressBar : true, inProgressOrderDetails : inProgressOrderDetails.add(orderId) })
  
    } else {

        inProgressOrderDetails.delete(orderId)

        if(inProgressOrderDetails && inProgressOrderDetails.size > 0) {
          this.setState({ inProgressOrderDetails : inProgressOrderDetails })
        } else {
          this.setState({ showingProgressBar : false, inProgressOrderDetails : inProgressOrderDetails })
        }
      
    }
    
  }

  render() {

    const { showingProgressBar, inProgressOrderDetails } = this.state;
    let tableHeaderItems = ['', 'Order Id', 'Order status', 'Consumer Id', 'Consumer name', 'Consumer phone', 'Delivery agent', 'Assigned to', 'Order placed time', '', '']
    let tableBodyItems = {}
    // let orderPlacedWaitingTime = null
    // let statusStyle = { fontStyle: 'italic' }

    for(let i in this.props.liveOrdersData) {

      const liveOrder = this.props.liveOrdersData[i]

      const {retailer_notified_time} = liveOrder
      const {dp_delivered_time } = liveOrder
      const {retailer_accepted_time} = liveOrder
      const {cancellation_time} = liveOrder
      const {cancelled_time} = liveOrder
      const {cancellation_return_time} = liveOrder
      const {dp_reached_to_consumer_time} = liveOrder
      const {dp_arrived_at_store_time} = liveOrder
      const {dp_accepted_time} = liveOrder
      const {dp_notified_time} = liveOrder
      const {dp_picked_up_time} = liveOrder
      const { dp_confirmation_time } = liveOrder

      const orderStatusArr = liveOrder.status ? liveOrder.status.split('::') : ''
      const status = orderStatusArr[0] || ''
      const time = eval(orderStatusArr[1]) || ''
      const article = orderStatusArr[2] || ''
      const orderStatus = `${status}${time}${article}`

      // orderPlacedWaitingTime = null
      // if (liveOrder.order_placed_time) {
      //   orderPlacedWaitingTime = getTimeDiff(data.order_placed_time)
      // }

      // statusStyle = { fontStyle: 'italic' }
      // if (cancellation_time) {
      //   statusStyle = {
      //     color: time >= 5 && !cancellation_time && getHasuraRole() !== 'excise_person' ? '#ff3b34' : ''
      //   }
      // }

      tableBodyItems[liveOrder.order_id] = [liveOrder.order_id, orderStatus, liveOrder.consumer_id, liveOrder.consumer_name, liveOrder.consumer_phone, liveOrder.dp_name, liveOrder.assigned_to_id, moment(liveOrder.order_placed_time).format('MMM Do YY, h:mm a') ]

    }

   
    
    return (
      // <Fragment>
      //   <div className='order-list-container'>
      //     <table className='orders-list'>
      //       <thead>
      //         <tr>
      //           <td></td>
      //           <td>Order Id</td>
      //           <td>Order status</td>
      //           <td>Consumer Id</td>
      //           <td>Consumer name</td>
      //           <td>Consumer phone</td>
      //           <td>Delivery agent</td>
      //           <td>Assigned to</td>
      //           <td>Order placed time</td>
      //           <td></td>
      //           <td></td>
      //         </tr>
      //       </thead>
      //       <tbody>
      //         {
      //           !this.props.loadingLiveOrders
      //           ? this.props.liveOrdersData.map((item) => {

      //             if((!showingProgressBar && inProgressOrderDetails.size === 0)  || (!showingProgressBar && inProgressOrderDetails.size > 0 && !inProgressOrderDetails.has(item.order_id))) {
      //                 return <LiveOrdersListItem
      //                         handleClick={this.handleClick}
      //                         handleOrderAssign={this.openAssignOrderModal}
      //                         handleShowNotes={this.handleShowNotes}
      //                         toggleProgressBar={this.toggleProgressBar}
      //                         key={item.order_id}
      //                         data={item}
      //                       />
      //             } else if(showingProgressBar && inProgressOrderDetails.size > 0 && !inProgressOrderDetails.has(item.order_id)) {
      //                 return <LiveOrdersListItem
      //                         handleClick={this.handleClick}
      //                         handleOrderAssign={this.openAssignOrderModal}
      //                         handleShowNotes={this.handleShowNotes}
      //                         toggleProgressBar={this.toggleProgressBar}
      //                         key={item.order_id}
      //                         data={item}
      //                       />
      //             } else if(showingProgressBar && inProgressOrderDetails.size > 0 && inProgressOrderDetails.has(item.order_id)) {
      //                 return <ProgressBar handleClick={this.toggleProgressBar} key={item.order_id} data={item}></ProgressBar>
      //             }
                 
      //           })
      //           : <tr className='loader2' />
      //         }
      //       </tbody>
      //     </table>
      //   </div>
      //   {
      //     !this.props.loadingLiveOrders && this.props.liveOrdersData.length
      //     ? <Pagination
      //       activePage={this.state.activePage}
      //       itemsCountPerPage={this.pagesLimit}
      //       totalItemsCount={this.props.liveOrdersCount}
      //       pageRangeDisplayed={5}
      //       onChange={this.handlePageChange}
      //     />
      //     : ''
      //   }
      //   {
      //     this.state.shouldMountNotesBox &&
      //     <Notes
      //       data={this.props.notesData}
      //       createNote={this.props.actions.createNote}
      //       id={this.orderId}
      //       loadingNotes={this.props.loadingNotes}
      //       position={this.state.notesBoxPosition}
      //       unmountNotesBox={this.unmountNotesBox}
      //     />
      //   }

      // </Fragment>
      //<div>hello</div>
      <div>
        {
          !this.props.loadingLiveOrders
          ?
            <TableView  tableHeaderItems={tableHeaderItems} 
              tableBodyItems={tableBodyItems}  
              handleClick={this.handleClick}  
              handleOrderAssign={this.openAssignOrderModal}
              handleShowNotes={this.handleShowNotes}>
              {/* <ProgressBar></ProgressBar> */}
            </TableView>

            // <Table>

            // </Table>

          
          : <tr className='loader2' />
        }

        {
          !this.props.loadingLiveOrders && this.props.liveOrdersData.length
          ? <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={this.pagesLimit}
            totalItemsCount={this.props.liveOrdersCount}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
          />
          : ''
        }
        {
          this.state.shouldMountNotesBox &&
          <Notes
            data={this.props.notesData}
            createNote={this.props.actions.createNote}
            id={this.orderId}
            loadingNotes={this.props.loadingNotes}
            position={this.state.notesBoxPosition}
            unmountNotesBox={this.unmountNotesBox}
          />
        }

      </div>
    )
  }
}

const mapStateToProps = state => state.OrderPage

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(LiveOrdersList)
