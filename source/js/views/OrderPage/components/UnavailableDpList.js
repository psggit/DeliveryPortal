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
  }

  handlePageChange(pageNumber) {
    let offset = this.pagesLimit * (pageNumber - 1)
    this.setState({ activePage: pageNumber, pageOffset: offset })
    this.props.actions.fetchUnavailableDp({
      limit: this.pagesLimit,
      offset: this.state.pageOffset
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
                <td>Order status</td>
                <td>Name</td>
                <td style={{ textAlign: 'center' }}>Contact no.</td>
                <td>Locality name</td>
                <td>Order Id</td>
                <td style={{ textAlign: 'center' }}>Order placed time</td>
              </tr>
            </thead>
            <tbody>
              {
                !this.props.loadingUnavailableDp && this.props.unavailableDpsData.length &&
                this.props.unavailableDpsData.map(item => (
                  <UnavailableDpListItem key={item.dp_id} data={item}/>
                ))
              }
            </tbody>
          </table>
        </div>
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.pagesLimit}
          totalItemsCount={this.props.unavailableDpsDataCount}
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

export default connect(mapStateToProps, mapDispatchToProps)(UnavailableDpList)
