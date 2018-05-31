import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Pagination from 'react-js-pagination'
import * as Actions from './../actions'
import LiveOrdersListItem from './LiveOrdersListItem'

class LiveOrdersList extends React.Component {
  constructor() {
    super()
    this.pagesLimit = 40
    this.state = {
      activePage: 1,
      pageOffset: 0
    }
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.pollData = this.pollData.bind(this)
  }

  handleClick(orderId) {
    this.props.mountOrderDetail(orderId)
  }

  handlePageChange(pageNumber) {
    let offset = this.pagesLimit * (pageNumber - 1)
    this.setState({ activePage: pageNumber, pageOffset: offset })
    this.props.actions.fetchLiveOrders({
      limit: this.pagesLimit,
      offset
    })
  }

  componentDidMount() {
    this.props.actions.fetchLiveOrders({
      limit: 40,
      offset: 0
    })

    this.pollData()
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
                <td>Delivery agent</td>
                <td>Assigned to</td>
                <td>Order placed time</td>
              </tr>
            </thead>
            <tbody>
              {
                !this.props.loadingLiveOrders
                ? this.props.liveOrdersData.map(item => (
                  <LiveOrdersListItem
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

      </Fragment>
    )
  }
}

const mapStateToProps = state => state.OrderPage

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(LiveOrdersList)
