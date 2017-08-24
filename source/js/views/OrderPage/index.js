import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as Actions from './actions'
import { getIcon, getTimeDiff } from './utils'
import * as ActionTypes from './constants/actions'
import OrderInfo from './components/OrderInfo'
import NavBar from '@components/NavBar'
import SideMenu from './components/SideMenu'
import OrdersList from './components/OrdersList'
import Dropdown from '@components/Dropdown'
import OrderDetail from './components/OrderDetail'
import { filterOptions } from './constants/strings'
import { bindActionCreators } from 'redux'
import Pagination from 'react-js-pagination'
import '@sass/components/_pagination.scss'

class OrderPage extends Component {

  static propTypes = {
    state: PropTypes.string,
    order: PropTypes.object,
    retailer: PropTypes.object,
    deliverer: PropTypes.object,
    customer: PropTypes.object,
    dispatch: PropTypes.func,
  }

  constructor() {
    super()

    this.pagesLimit = 5
    this.ordersType = location.href.split('/')[4]
                      ? location.href.split('/')[4]
                      : 'all'
    this.state = {
      shouldMountOrderDetail: false,
      shouldListScroll: true,
      currentOrderId: null,
      activePage: 1,
      queryString: '',
      searchAPI: '/deliveryStatus/searchLiveOrders'
    }
    // this.onStateChange = this.onStateChange.bind(this)
    this.mountOrderDetail = this.mountOrderDetail.bind(this)
    this.unmountOrderDetail = this.unmountOrderDetail.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleRouteChange = this.handleRouteChange.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.setQueryString = this.setQueryString.bind(this)
  }

  handleRouteChange() {
    switch (this.ordersType) {
      case 'assigned':
        this.setState({ searchAPI: '/deliveryStatus/searchAssignedOrders' })
        break

      case 'history':
        this.setState({ searchAPI: '/deliveryStatus/searchHistoryOrders' })
        break

      default:
        this.setState({ searchAPI: '/deliveryStatus/searchLiveOrders' })
        break
    }
  }

  componentWillMount() {
    if (!localStorage.getItem('_hipbaru'))
    location.href = '/login'
  }

  componentDidMount() {
    const { actions } = this.props
    const _self = this
    // console.log(match.params);
    actions.fetchOrdersData({
      offset: 0,
      limit: this.pagesLimit,
    })
    // ;(function pollOrdersData() {
    // 	_self.props.actions.fetchDataOnRouteChange(ordersType)
    // 	setTimeout(pollOrdersData, 10000)
    // })()
  }

  mountOrderDetail(orderId) {
    this.setState({
      shouldMountOrderDetail: true,
      shouldListScroll: false,
      currentOrderId: orderId
    })
  }

  unmountOrderDetail() {
    this.setState({
      shouldMountOrderDetail: false,
      shouldListScroll: true,
      currentOrderId: null
    })
  }

  setQueryString(queryString) {
    this.setState({ queryString })
  }

  handlePageChange(pageNumber) {
    let offset = this.pagesLimit * (pageNumber - 1)
    const { actions } = this.props
    const { searchAPI, queryString } = this.state
    this.setState({ activePage: pageNumber })

    const postData = {
      offset: offset,
      limit: this.pagesLimit
    }

    if(queryString.length) {
      postData.query = queryString
      actions.fetchOrdersData(postData, searchAPI)
      return
    }
    actions.fetchOrdersData(postData)
  }

  handleFilterChange(filter) {
    console.log(filter);
    // Filter orders list with applied filter
    // actions.filterOrdersData()
  }

  // onMapCreated(map) {
  //   map.setOptions({
  //     disableDefaultUI: true
  //   })
  // }

  render() {
    const {
      state,
      orders,
      ordersCount,
      // order,
      // retailer,
      // deliverer,
      // customer,
      loadingOrdersList,
      match
    } = this.props


    // const titleMap = {
    //   'SearchingRetailer': 'Searching For Retailers',
    //   'AwaitingRetailerConfirmation': 'Awaiting Retailer Confirmation',
    //   'SearchingDeliverer': 'Searching For Deliverer',
    //   'AwaitingDelivererConfirmation': 'Awaiting Deliverer Confirmation',
    //   'DelivererConfirmed': 'Deliverer on way to pick up the order',
    //   'OrderDispatched': 'Order Picked Up and On way',
    //   'OrderDelivered': 'Order Delivered',
    //   'OrderCancelled': 'Order Cancelled',
    // }

    // const articleMap = {
    //   'SearchingRetailer': '',
    //   'AwaitingRetailerConfirmation': 'for',
    //   'SearchingDeliverer': '',
    //   'AwaitingDelivererConfirmation': 'for',
    //   'DelivererConfirmed': '',
    //   'OrderDispatched': '',
    //   'OrderDelivered': '',
    //   'OrderCancelled': 'at',
    // }

    // const epilogueMap = {
    //   'SearchingRetailer': '',
    //   'AwaitingRetailerConfirmation': 'Min.',
    //   'SearchingDeliverer': '',
    //   'AwaitingDelivererConfirmation': 'Min.',
    //   'DelivererConfirmed': 'Min Ago',
    //   'OrderDispatched': 'Min Ago',
    //   'OrderDelivered': '',
    //   'OrderCancelled': order.cancelledTime,
    // }

    // const timeMap = {
    //   'SearchingRetailer': '',
    //   'AwaitingRetailerConfirmation': getTimeDiff((new Date()) - retailer.orderPlacedTime),
    //   'SearchingDeliverer': '',
    //   'AwaitingDelivererConfirmation': getTimeDiff((new Date()) - deliverer.orderPlacedTime),
    //   'DelivererConfirmed': getTimeDiff((new Date()), deliverer.orderAcceptedTime),
    //   'OrderDispatched': getTimeDiff((new Date()), retailer.dispatchedTime),
    //   'OrderDelivered': '',
    // }

    const {
      shouldMountOrderDetail,
      currentOrderId, shouldListScroll,
      activePage,
      searchAPI,
    } = this.state

    const listWrapperInlineStyle = { overflow: shouldListScroll ? 'auto' : 'hidden' }
    const { actions } = this.props

    return (
      <div>
        <NavBar
          search={actions.fetchOrdersData}
          searchAPI={searchAPI}
          setQueryString={this.setQueryString}
          pagesLimit={5}
        />
        <SideMenu
          unmountOrderDetail={this.unmountOrderDetail}
          fetchDataOnRouteChange={this.fetchDataOnRouteChange}
        />
        <div className='order-wrapper' style={listWrapperInlineStyle}>
          <div className='orders-filter'>
            <Dropdown
              options={filterOptions}
              onChange={this.handleFilterChange}
            />
          </div>
          <OrdersList
            loadingOrdersList={loadingOrdersList}
            orders={orders}
            unmountOrderDetail={this.unmountOrderDetail}
            mountOrderDetail={this.mountOrderDetail}
            // titleMap={titleMap}
            // articleMap={articleMap}
            // timeMap={timeMap}
            // epilogueMap={epilogueMap}
            state={state}
          />
          {
            !loadingOrdersList
            ? <Pagination
              activePage={activePage}
              itemsCountPerPage={this.pagesLimit}
              totalItemsCount={ordersCount}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
            />
            : ''
          }
          {
            shouldMountOrderDetail
            ? <OrderDetail
              retailer={retailer}
              actions={actions}
              order={order}
              dispatch={ this.props.dispatch }
              currentOrderId={currentOrderId}
              unmountOrderDetail={this.unmountOrderDetail}
            />
            : ''
          }
        </div>
        <div>
          {/* <select style={{position: 'fixed', top: '65px', right: '0px'}} onChange={this.onStateChange}>
            {
              Object.keys(ActionTypes).map((item, i) => {
                return (
                  <option
                    key={i + 1}
                    value={ActionTypes[item]}
                    >
                    {ActionTypes[item]}
                  </option>
                )
              })
            }
          </select> */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  state: state.OrderPage.state,
  loadingOrdersList: state.OrderPage.loadingOrdersList,
  orders: state.OrderPage.orders,
  ordersCount: state.OrderPage.ordersCount
  // order: state.OrderPage.order,
  // retailer: state.OrderPage.retailer,
  // deliverer: state.OrderPage.deliverer,
  // customer: state.OrderPage.customer,
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderPage)
