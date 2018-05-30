import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './../actions'
import UnavailableDpListItem from './UnavailableDpListItem'
import Pagination from 'react-js-pagination'

class UnavailableDpList extends React.Component {
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
    this.props.actions.fetchUnavailableDp({
      limit: this.pagesLimit,
      offset
    })
  }

  componentDidMount() {
    this.props.actions.fetchUnavailableDp({
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
                <td>Name</td>
                <td style={{ textAlign: 'center' }}>Contact no.</td>
                <td>Locality name</td>
                <td>Order Id</td>
                <td style={{ textAlign: 'center' }}>Order placed time</td>
              </tr>
            </thead>
            <tbody>
              {
                !this.props.loadingUnavailableDp
                ? this.props.unavailableDpsData.map(item => (
                  <UnavailableDpListItem
                    handleClick={this.handleClick}
                    key={item.dp_id}
                    data={item}
                  />
                ))
                : <tr className='loader2' />
              }
            </tbody>
          </table>
        </div>
        {
          !this.props.loadingReturningOrders && this.props.returningOrders.length
          ? <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={this.pagesLimit}
            totalItemsCount={this.props.unavailableDpsDataCount}
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

export default connect(mapStateToProps, mapDispatchToProps)(UnavailableDpList)
