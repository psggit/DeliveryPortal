import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './../actions'
import ReturningOrdersListItem from './ReturningOrdersListItem'
import Pagination from 'react-js-pagination'

class ReturningOrdersList extends React.Component {
  constructor() {
    super()
    this.pagesLimit = 40
    this.state = {
      activePage: 1,
      pageOffset: 0
    }
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleRestock = this.handleRestock.bind(this)
  }

  handleClick(orderId, e) {
    if (e.target.nodeName !== 'BUTTON') {
      this.props.mountOrderDetail(orderId)
    }
  }

  handleRestock(orderId, dpId) {
    this.props.actions.restockOrder({
      order_id: orderId,
      dp_id: dpId
    })
  }

  handlePageChange(pageNumber) {
    let offset = this.pagesLimit * (pageNumber - 1)
    this.setState({ activePage: pageNumber, pageOffset: offset })
    this.props.actions.fetchReturningOrders({
      limit: this.pagesLimit,
      offset
    })
  }

  componentDidMount() {
    this.props.actions.fetchReturningOrders({
      limit: 40,
      offset: 0
    })
  }
  render() {
    return (
      <Fragment>
        <div className='order-list-container'>
          <table className='orders-list'>
            <thead>
              <tr>
                <td>Deliverer Id</td>
                <td style={{ textAlign: 'center' }}>Order status</td>
                <td>Order Id</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {
                !this.props.loadingReturningOrders && this.props.returningOrders.length
                ? this.props.returningOrders.map(item => (
                  <ReturningOrdersListItem
                    handleClick={this.handleClick}
                    handleRestock={this.handleRestock}
                    key={item.dp_id}
                    data={item}
                  />
                ))
                : ''
              }
            </tbody>
          </table>
        </div>
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.pagesLimit}
          totalItemsCount={this.props.returningOrdersCount}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />
      </Fragment>
    )
  }
}

const mapStateToProps = state => state.OrderPage

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ReturningOrdersList)
