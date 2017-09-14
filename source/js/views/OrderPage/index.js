/*
  !!! Beware of over abstraction while writing any function !!!
*/

import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as Actions from './actions'
import { getIcon, getTimeDiff, canAccess } from './utils'
import * as ActionTypes from './constants/actions'
import NavBar from '@components/NavBar'
import SideMenu from './components/SideMenu'
import OrdersList from './components/OrdersList'
import Dropdown from '@components/Dropdown'
import OrderDetail from './components/OrderDetail'
import { filterOptions, dateOptions } from './constants/strings'
import { bindActionCreators } from 'redux'
import Pagination from 'react-js-pagination'
import '@sass/components/_pagination.scss'
import Qr from 'query-string'
import { mountModal, unMountModal } from '@components/ModalBox/utils'
import DatePicker from './components/DatePicker'
import SearchInput from '@components/SearchInput'
// import Store from './../../'

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

    this.pagesLimit = 40
    this.state = {
      shouldMountOrderDetail: false,
      shouldListScroll: true,
      currentOrderId: null,
      activePage: 1,
      searchQuery: '',
      searchAPI: '/deliveryStatus/searchLiveOrders',
      fetchAPI: '/deliveryStatus/liveOrders',
      pageOffset: 0,
      ordersType: 'all'
    }
    // this.onStateChange = this.onStateChange.bind(this)
    this.mountOrderDetail = this.mountOrderDetail.bind(this)
    this.unmountOrderDetail = this.unmountOrderDetail.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    // this.handleRouteChange = this.handleRouteChange.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    // this.setQueryString = this.setQueryString.bind(this)
    this.resetPagination = this.resetPagination.bind(this)
    this.setSearchQuery = this.setSearchQuery.bind(this)
    this.fetchOrdersData = this.fetchOrdersData.bind(this)
    this.searchOrdersData = this.searchOrdersData.bind(this)
    this.filterOrdersData = this.filterOrdersData.bind(this)
    this.handleClearFilter = this.handleClearFilter.bind(this)
  }

  fetchOrdersData(ordersType, offset = this.state.pageOffset, filterType = '', filterValue = '') {
    this.setState({ ordersType, offset })
    this.setSearchQuery('')
    const { actions } = this.props
    const postData = {
      offset,
      limit: this.pagesLimit
      // where: {
      //   type: filterType,
      //   value: filterValue
      // }
    }

    switch (ordersType) {
      case 'assigned':
        postData.support_id = 1
        actions.fetchLiveAssignedOrders(postData)
        break

      case 'unassigned':
        actions.fetchLiveUnassignedOrders(postData)
        break

      case 'history':
        actions.fetchHistoryOrders(postData)
        break
        
      default:
        actions.fetchLiveOrders(postData)
        break
    }
  }
  
  searchOrdersData(searchQuery, offset) {
    const { actions } = this.props
    const { ordersType } = this.state
    const postData = {
      offset,
      limit: this.pagesLimit,
      query: searchQuery
    }
    
    switch (ordersType) {
      case 'assigned':
        postData.support_id = 1
        actions.searchLiveAssignedOrders(postData)
        break

      case 'unassigned':
        actions.searchLiveUnassignedOrders(postData)
        break

      case 'history':
        actions.searchHistoryOrders(postData)
        break

      default:
        actions.searchLiveOrders(postData)
        break
    }
  }

  // handleRouteChange(ordersType, calledBy) {
  //   this.setState({ ordersType })
  //   let fetchAPI = '/deliveryStatus/liveOrders'
  //   let searchAPI = '/deliveryStatus/searchLiveOrders'
  //   switch (ordersType) {
  //     case 'assigned':
  //       fetchAPI = '/deliveryStatus/liveAssignedOrders'
  //       searchAPI = 'deliveryStatus/searchAssignedOrders'
  //       break

  //     case 'history':
  //       fetchAPI = '/deliveryStatus/liveOrders'
  //       searchAPI = '/deliveryStatus/searchLiveOrders'
  //       break
  //   }
  //   this.setState({ fetchAPI, searchAPI, activePage: 1 })
  //   // if(calledBy !== 'componentDidMount') {
  //   //   this.resetPagination()
  //   //   this.setSearchQuery('')
  //   // }
  //   this.props.actions.fetchOrdersData({
  //     support_id: 1,
  //     offset: 0,
  //     limit: this.pagesLimit,
  //   }, fetchAPI)
  // }

  // fetchDataFromQueryParams() {
  //   const queryString = location.search
  //   const parsed = Qr.parse(queryString)
  //   const { actions } = this.props
  //   const pageNumber = Math.floor(parsed.start / this.pagesLimit) + 1
  //   const postData = {
  //     offset: parseInt(parsed.start) ? parseInt(parsed.start): 0,
  //     limit: this.pagesLimit
  //   }

  //   this.setState({ activePage: pageNumber ? pageNumber : 1 })
  //   if(parsed.q) {
  //     const { searchAPI } = this.state
  //     postData.query = parsed.q
  //     actions.fetchOrdersData(postData, searchAPI)
  //     return
  //   }
  //   actions.fetchOrdersData(postData)
  // }

  componentWillMount() {
    if (!localStorage.getItem('_hipbaru'))
    location.href = '/login'
  }

  componentDidMount() {
    const { actions } = this.props
    const { ordersType } = this.state
    const _self = this
    // this.fetchDataFromQueryParams()
    this.fetchOrdersData('all', 0)

    let timeOutId

    ;(function pollOrdersData() {
      const { pageOffset, ordersType, searchQuery } = _self.state

      searchQuery.length 
      ? _self.searchOrdersData(searchQuery, pageOffset)
      : _self.fetchOrdersData(ordersType, pageOffset)

      // if (ordersType !== 'all') {
      //   clearTimeout(timeOutId)
      // } else {
      //   timeOutId = setTimeout(pollOrdersData, 30000)
      // }
      setTimeout(pollOrdersData, 30000)
    })()
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
    this.props.actions.setLoadingOrderDetail()
  }

  setSearchQuery(searchQuery) {
    this.setState({ searchQuery })
  }

  // setQueryString(searchQuery = this.state, start = 0) {
  //   const { ordersType } = this.state
  //   const parsed = {}

  //   if (searchQuery.length) {
  //     parsed.q = searchQuery
  //   }
  //   parsed.start = start
  //   const queryString = Qr.stringify(parsed)

  //   const ot = !ordersType || ordersType == 'all' ? '' : `/${ordersType}`

  //   const pushUrl = `/orders${ot}?${queryString}`
  //   history.pushState(null, null, pushUrl)
  // }

  resetPagination() {
    this.setState({ activePage: 1, pageOffset: 0 })
  }

  filterOrdersData(filter) {
    const { actions } = this.props
    const postData = {
      limit: this.pagesLimit,
      offset: this.pageOffset,
      filter_by: filter
    }

    actions.fetchLiveOrders(postData)    
  }

  handlePageChange(pageNumber) {
    let offset = this.pagesLimit * (pageNumber - 1)
    const { actions } = this.props
    const { searchQuery, ordersType } = this.state

    this.setState({ activePage: pageNumber, pageOffset: offset })

    // this.setQueryString(searchQuery, offset)

    if(searchQuery.length) {
      this.searchOrdersData(searchQuery, offset)
      return
    }
    this.fetchOrdersData(ordersType, offset)
  }

  handleFilterChange(filter) {
    this.resetPagination()
    // const { actions } = this.props
    // const postData = {
    //   limit: this.pagesLimit,
    //   offset: 0,
    //   where: {
    //     type: 'status',
    //     value: ''
    //   }
    // }
    this.filterOrdersData(filter)
  }

  handleClearFilter() {
    const { ordersType, pageOffset } = this.state
    this.fetchOrdersData(ordersType, pageOffset)
  }

  // handleDateChange(dateType) {
  //   console.log(dateType)
  //   switch (dateType) {
  //     case 'custom':
  //       mountModal(DatePicker())
  //       break
  //   }
  // }
  handleChooseDate() {
    mountModal(DatePicker())
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
    //   'AwaitingRetailerConfirmation': getTimeDiff((new Date()) - retailer.notifiedTime),
    //   'SearchingDeliverer': '',
    //   'AwaitingDelivererConfirmation': getTimeDiff((new Date()) - deliverer.notifiedTime),
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


    const { actions } = this.props
    !shouldListScroll
    ? document.querySelector('body').className = 'no-scroll'
    : document.querySelector('body').className = ''

    return (
      <div>
        <NavBar
          handleRouteChange={this.fetchOrdersData}
          canAccess={canAccess}
          search={this.searchOrdersData}
          searchQuery={searchQuery}
          searchAPI={searchAPI}
          setQueryString={this.setQueryString}
          setSearchQuery={this.setSearchQuery}
          pagesLimit={this.pagesLimit}
          pageOffset={pageOffset}
          resetPagination={this.resetPagination}
          unmountOrderDetail={this.unmountOrderDetail}
        />
        {/* <SideMenu
          resetPagination={this.resetPagination}
          unmountOrderDetail={this.unmountOrderDetail}
          handleRouteChange={this.fetchOrdersData}
        /> */}
        <div className='body-container'>
          <div className='orders-filter'>
            { ordersType !== 'history' ? <label>Filter by</label> : '' }
            {
              ordersType !== 'history'
              ? <Dropdown
                  handleClearFilter={this.handleClearFilter}
                  options={filterOptions}
                  onChange={this.handleFilterChange}
                />
              : /*<button onClick={this.handleChooseDate}>Choose date</button>*/ ''
            }
            <SearchInput
              search={this.searchOrdersData}
              setQueryString={this.setQueryString}
              setSearchQuery={this.setSearchQuery}
              pagesLimit={this.pagesLimit}
              pageOffset={pageOffset}
              resetPagination={this.resetPagination}
              unmountOrderDetail={this.unmountOrderDetail}
              searchQuery={searchQuery}
            />
          </div>
          {
            orders
            ? <OrdersList
              canAccess={canAccess}
              loadingOrdersList={loadingOrdersList}
              orders={orders}
              ordersType={ordersType}
              unmountOrderDetail={this.unmountOrderDetail}
              mountOrderDetail={this.mountOrderDetail}
              actions={actions}
              state={state}
            />
            : ''
          }
          
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
              ordersType={ordersType}
              canAccess={canAccess}
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
