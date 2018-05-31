import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './../actions'
import AttemptedOrdersListItem from './AttemptedOrdersListItem'
import Pagination from 'react-js-pagination'

class AttemptedOrdersList extends React.Component {
  constructor() {
    super()
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
    this.props.actions.fetchHistoryOrders({
      limit: this.pagesLimit,
      offset
    })
  }

  componentDidMount() {
    this.props.actions.fetchHistoryOrders({
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
                <td>Cart value</td>
                <td>Consumer Id</td>
                <td>Consumer name</td>
                <td>Consumer phone</td>
                <td>Consumer address</td>
                <td>Reason</td>
                <td>Cart details</td>
                <td>Nearby retailers</td>
                <td>Delivery agent</td>
                <td>Unavailable product</td>
                <td>Prime retailer</td>
                <td>Locality name</td>
                <td>Order attempted time</td>
              </tr>
            </thead>
            <tbody>
              {
                !this.props.loadingAttemptedOrders
                ? this.props.attemptedOrdersData.map(item => (
                  <AttemptedOrdersListItem
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
          !this.props.loadingAttemptedOrders && this.props.attemptedOrdersData.length
          ? <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={this.pagesLimit}
            totalItemsCount={this.props.attemptedOrdersCount}
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

export default connect(mapStateToProps, mapDispatchToProps)(AttemptedOrdersList)
