import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './../actions'
import AttemptedOrdersListItem from './AttemptedOrdersListItem'
import Pagination from 'react-js-pagination'
import Moment from 'moment'
import { getIcon } from './../utils'
import { mountModal } from '@components/ModalBox/utils'
import DatePicker from './DatePicker'

class AttemptedOrdersList extends React.Component {
  constructor() {
    super()
    const today = new Date()
    today.setUTCHours(0, 0, 0, 0)
    const tommorrow = new Date(today.getTime())
    tommorrow.setDate(tommorrow.getDate() + 1)
    tommorrow.setUTCHours(0, 0, 0, 0)
    this.pagesLimit = 40
    this.state = {
      activePage: 1,
      pageOffset: 0,
      fromDate: today.toISOString(),
      toDate: tommorrow.toISOString(),
      dateChanged: false
    }
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.getData = this.getData.bind(this)
    this.setDate = this.setDate.bind(this)
    this.handleChooseDate = this.handleChooseDate.bind(this)
    this.handleClearDate = this.handleClearDate.bind(this)
  }

  handleClick(orderId) {
    this.props.mountOrderDetail(orderId)
  }

  handlePageChange(pageNumber) {
    let offset = this.pagesLimit * (pageNumber - 1)
    this.setState({ activePage: pageNumber, pageOffset: offset })
    this.props.actions.fetchAttemptedOrders({
      limit: this.pagesLimit,
      offset,
      from: this.state.fromDate,
      to: this.state.toDate
    })
  }

  getData() {
    const { fromDate, toDate } = this.state
    return {
      fromDate,
      toDate
    }
  }

  handleChooseDate() {
    mountModal(DatePicker({
      setDate: this.setDate
    }))
  }

  handleClearDate() {
    const today = new Date()
    today.setUTCHours(0, 0, 0, 0)
    const tommorrow = new Date(today.getTime())
    tommorrow.setDate(tommorrow.getDate() + 1)
    tommorrow.setUTCHours(0, 0, 0, 0)

    this.setState({
      fromDate: today,
      toDate: tommorrow,
      dateChanged: false
    })

    this.props.actions.fetchAttemptedOrders({
      limit: 40,
      offset: 0,
      from: today,
      to: tommorrow
    })
  }

  setDate(fromDate, toDate) {
    this.setState({
      fromDate,
      toDate,
      dateChanged: true
    })
    this.props.actions.fetchAttemptedOrders({
      limit: 40,
      offset: 0,
      from: fromDate,
      to: toDate
    })
  }

  componentDidMount() {
    const { fromDate, toDate } = this.state
    this.props.actions.fetchAttemptedOrders({
      limit: 40,
      offset: 0,
      from: fromDate,
      to: toDate
    })
  }
  render() {
    const { dateChanged, fromDate, toDate } = this.state
    return (
      <Fragment>
        <button
          style={{
            textTransform: 'capitalize',
            color: '#333',
            marginTop: '20px',
            borderColor: '#333'
          }}
          onClick={this.handleChooseDate}
        >
          Choose date
        </button>
        <span style={{
          margin: '20px 0 0 40px',
          fontSize: '14px',
          border: '1px solid #333',
          padding: '5px 10px',
          borderRadius: '2px',
          color: '#333',
          borderTopRightRadius: dateChanged ? '0' : '2px',
          borderBottomRightRadius: dateChanged ? '0' : '2px'
        }}>
          {
            `${ Moment(new Date(fromDate).toJSON().slice(0, 10)).format('MMM Do YY') }
            to ${ Moment(new Date(toDate).toJSON().slice(0, 10)).format('MMM Do YY') }`
          }
        </span>
        {
          dateChanged &&
          <button
            onClick={this.handleClearDate}
            style={{
              padding: '5px',
              borderColor: '#333',
              borderLeft: '0',
              borderTopLeftRadius: '0',
              borderBottomLeftRadius: '0'
            }}>
            <span title="Clear date" style={{ position: 'relative', top: '2px' }}>{ getIcon('cross', '#333') }</span>
          </button>
        }
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
