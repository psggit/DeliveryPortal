import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as Actions from './actions'
import { getIcon, getTimeDiff } from './utils'
import * as ActionTypes from './constants/actions'
import NavBar from '@components/NavBar'
import SideMenu from './components/SideMenu'
import OrdersList from './components/OrdersList'
import Dropdown from '@components/Dropdown'
import OrderDetail from './components/OrderDetail'
import { filterOptions } from './constants/strings'
import { bindActionCreators } from 'redux'
import Pagination from 'react-js-pagination'
import '@sass/components/_pagination.scss'
import Qr from 'query-string'

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
    this.state = {
      shouldMountOrderDetail: false,
      shouldListScroll: true,
      currentOrderId: null,
      activePage: 1,
      searchQuery: Qr.parse(location.search).q ? Qr.parse(location.search).q : '',
      searchAPI: '/deliveryStatus/searchLiveOrders',
      fetchAPI: '/deliveryStatus/liveOrders',
      pageOffset: 0,
      ordersType: location.href.split('/')[4]
    }
    // this.onStateChange = this.onStateChange.bind(this)
    this.mountOrderDetail = this.mountOrderDetail.bind(this)
    this.unmountOrderDetail = this.unmountOrderDetail.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleRouteChange = this.handleRouteChange.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.setQueryString = this.setQueryString.bind(this)
    this.resetPagination = this.resetPagination.bind(this)
    this.setSearchQuery = this.setSearchQuery.bind(this)
  }

  handleRouteChange(ordersType) {
    this.setState({ ordersType })
    let fetchAPI = '/deliveryStatus/liveOrders'
    let searchAPI = '/deliveryStatus/searchLiveOrders'
    switch (ordersType) {
      case 'assigned':
        fetchAPI = '/deliveryStatus/liveAssignedOrders'
        searchAPI = 'deliveryStatsu/searchAssignedOrders'
        break

      case 'history':
        fetchAPI = '/deliveryStatus/liveAssignedOrders'
        searchAPI = '/deliveryStatus/searchHistoryOrders'
        break
    }
    this.setState({ fetchAPI, searchAPI })
    this.resetPagination()
    this.setSearchQuery('')
    this.props.actions.fetchOrdersData({
      support_id: 1,
      offset: 0,
      limit: this.pagesLimit
    }, fetchAPI)
  }

  fetchDataFromQueryParams() {
    const queryString = location.search
    const parsed = Qr.parse(queryString)
    const { actions } = this.props
    const pageNumber = Math.floor(parsed.start / this.pagesLimit) + 1
    const postData = {
      offset: parseInt(parsed.start) ? parseInt(parsed.start): 0,
      limit: this.pagesLimit
    }

    this.setState({ activePage: pageNumber ? pageNumber : 1 })
    if(parsed.q) {
      const { searchAPI } = this.state
      postData.query = parsed.q
      actions.fetchOrdersData(postData, searchAPI)
      return
    }
    actions.fetchOrdersData(postData)
  }

  componentWillMount() {
    if (!localStorage.getItem('_hipbaru'))
    location.href = '/login'
  }

  componentDidMount() {
    const { actions } = this.props
    const { ordersType } = this.state
    const _self = this
    this.fetchDataFromQueryParams()
    this.handleRouteChange(ordersType)
    // ;(function pollOrdersData() {
    // 	_self.props.actions.fetchOrdersData()
    // 	setTimeout(pollOrdersData, 10000)
    // })()
  }

  mountOrderDetail(orderId) {
    this.setState({
      shouldMountOrderDetail: true,
      shouldListScroll: false,
      currentOrderId: orderId
    })
    const { actions } = this.props
    actions.fetchOrderDetail(orderId)
  }

  unmountOrderDetail() {
    this.setState({
      shouldMountOrderDetail: false,
      shouldListScroll: true,
      currentOrderId: null
    })
  }

  setSearchQuery(searchQuery) {
    this.setState({ searchQuery })
  }

  setQueryString(searchQuery = this.state, start = 0) {
    const { ordersType } = this.state
    const parsed = {}

    if (searchQuery.length) {
      parsed.q = searchQuery
    }
    parsed.start = start
    const queryString = Qr.stringify(parsed)

    const ot = !ordersType || ordersType == 'all' ? '' : `/${ordersType}`

    const pushUrl = `/orders${ot}?${queryString}`
    history.pushState(null, null, pushUrl)
  }

  resetPagination() {
    this.setState({ activePage: 1 })
  }

  handlePageChange(pageNumber) {
    let offset = this.pagesLimit * (pageNumber - 1)
    const { actions } = this.props
    const { searchAPI, fetchAPI, searchQuery } = this.state

    this.setState({ activePage: pageNumber, pageOffset: offset })

    const postData = {
      offset: offset,
      limit: this.pagesLimit
    }

    this.setQueryString(searchQuery, offset)

    if(searchQuery.length) {
      postData.query = searchQuery
      actions.fetchOrdersData(postData, searchAPI)
      return
    }
    actions.fetchOrdersData(postData, fetchAPI)
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
      order,
      retailer,
      deliverer,
      customer,
      loadingOrdersList,
      loadingOrderDetail,
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
      currentOrderId,
      shouldListScroll,
      ordersType,
      activePage,
      pageOffset,
      searchAPI,
      searchQuery
    } = this.state


    const listWrapperInlineStyle = { overflow: shouldListScroll ? 'auto' : 'hidden' }
    const { actions } = this.props

    return (
      <div>
        <NavBar
          search={actions.fetchOrdersData}
          searchQuery={searchQuery}
          searchAPI={searchAPI}
          setQueryString={this.setQueryString}
          setSearchQuery={this.setSearchQuery}
          pagesLimit={this.pagesLimit}
          pageOffset={pageOffset}
          resetPagination={this.resetPagination}
          unmountOrderDetail={this.unmountOrderDetail}
        />
        <SideMenu
          unmountOrderDetail={this.unmountOrderDetail}
          handleRouteChange={this.handleRouteChange}
        />
        <div className='order-wrapper' style={listWrapperInlineStyle}>
          <div className='orders-filter'>
            {
              ordersType !== 'history'
              ? <Dropdown
                  options={filterOptions}
                  onChange={this.handleFilterChange}
                />
              : <input type='date' />
            }
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
              customer={customer}
              deliverer={deliverer}
              loadingOrderDetail={loadingOrderDetail}
              actions={actions}
              order={order}
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
  ordersCount: state.OrderPage.ordersCount,
  order: state.OrderPage.order,
  retailer: state.OrderPage.retailer,
  deliverer: state.OrderPage.deliverer,
  customer: state.OrderPage.customer,
  loadingOrderDetail: state.OrderPage.loadingOrderDetail
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderPage)
