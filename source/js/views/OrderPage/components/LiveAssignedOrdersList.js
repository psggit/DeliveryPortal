import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './../actions'
import LiveAssignedOrdersListItem from './LiveAssignedOrdersListItem'
import Pagination from 'react-js-pagination'

class LiveAssignedOrdersList extends React.Component {
  constructor() {
    super()
    this.hasuraID = parseInt(localStorage.getItem('hasura-id'))
    this.pagesLimit = 40
    this.state = {
      activePage: 1,
      pageOffset: 0
    }
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(orderId) {
    this.props.mountOrderDetail(orderId)
  }

  handlePageChange(pageNumber) {
    let offset = this.pagesLimit * (pageNumber - 1)
    this.setState({ activePage: pageNumber, pageOffset: offset })
    this.props.actions.fetchLiveAssignedOrders({
      limit: this.pagesLimit,
      offset,
      support_id: this.hasuraID
    })
  }

  componentDidMount() {
    this.props.actions.fetchLiveAssignedOrders({
      limit: 40,
      offset: 0,
      support_id: this.hasuraID
    })
  }
  render() {
    return (
      <Fragment>
        <div className='order-list-container'>
          <table className='orders-list'>
            <thead>
              <tr>
                <td>Order Id</td>
                <td>Order status</td>
                <td>Consumer Id</td>
                <td>Consumer name</td>
                <td>Consumer phone</td>
                <td>Delivery agent</td>
                <td>Assigned to</td>
                <td>Order placed time</td>
              </tr>
            </thead>
            <tbody>
              {
                !this.props.loadingLiveAssignedOrders
                ? this.props.liveAssignedOrdersData.map(item => (
                  <LiveAssignedOrdersListItem
                    handleClick={this.handleClick}
                    key={item.order_id}
                    data={item}
                  />
                ))
                : <tr className='loader2' />
              }
            </tbody>
          </table>
        </div>
        {
          !this.props.loadingLiveAssignedOrders && this.props.liveAssignedOrdersData.length
          ? <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={this.pagesLimit}
            totalItemsCount={this.props.liveAssignedOrdersCount}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
          />
          : ''
        }

      </Fragment>
    )
  }
}

const mapStateToProps = state => state.OrderPage

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(LiveAssignedOrdersList)
