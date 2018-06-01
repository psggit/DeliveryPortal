/*
  Please read this before writing anything:
  ========================================
*/

import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './actions'
import { Route, Switch } from 'react-router-dom'
import { Router } from 'react-router'
import createHistory from 'history/createBrowserHistory'
import LiveOrdersList from './components/LiveOrdersList'
import LiveAssignedOrdersList from './components/LiveAssignedOrdersList'
import LiveUnassignedOrdersList from './components/LiveUnassignedOrdersList'
import HistoryOrdersList from './components/HistoryOrdersList'
import NeedToBeCancelledOrdersList from './components/NeedToBeCancelledOrdersList'
import AttemptedOrdersList from './components/AttemptedOrdersList'
import BusyDeliveryAgentsList from './components/UnavailableDpList'
import ReturningOrdersList from './components/ReturningOrdersList'
import SearchOrdersList from './components/SearchOrdersList'
import SideMenu from './components/SideMenu'
import { menuItemsMap } from './constants/strings'
import OrderDetail from './components/OrderDetail'
import { canAccess } from './utils'

import NavBar from '@components/NavBar'
import SearchInput from '@components/SearchInput'

import '@sass/components/_pagination.scss'
import '@sass/OrdersPage/OrdersList.scss'
// import { getIcon, getTimeDiff, canAccess, getHasuraId } from './utils'
// import * as ActionTypes from './constants/actions'
// import NavBar from '@components/NavBar'
// import SideMenu from './components/SideMenu'
// import OrdersList from './components/OrdersList'
// import Dropdown from '@components/Dropdown'
// import OrderDetail from './components/OrderDetail'
// import { filterOptions, dateOptions } from './constants/strings'
// import Pagination from 'react-js-pagination'
// import '@sass/components/_pagination.scss'
// import '@sass/OrdersPage/OrdersList.scss'
// import Qr from 'query-string'
// import { mountModal, unMountModal } from '@components/ModalBox/utils'
// import DatePicker from './components/DatePicker'
// import SearchInput from '@components/SearchInput'
// import Moment from 'moment'
// import UnavailableDpList from './components/UnavailableDpList'
// import ReturningOrdersList from './components/ReturningOrdersList'
// import { menuItems } from './constants/strings'

const history = createHistory()
class Home extends Component {
  constructor() {
    super()
    this.pagesLimit = 40
    this.timeOutId = null
    this.isTimeOutCleared = false
    this.menuItemsMap = {}
    this.state = {
      isSideMenuOpen: false,
      currentRoute: location.pathname.split('/')[3] || 'live',
      shouldMountOrderDetail: false,
      currentOrderId: null,
      key: 0
    }

    this.setSideMenuToggle = this.setSideMenuToggle.bind(this)
    this.handleRouteChange = this.handleRouteChange.bind(this)
    this.mountOrderDetail = this.mountOrderDetail.bind(this)
    this.unmountOrderDetail = this.unmountOrderDetail.bind(this)
    this.searchOrders = this.searchOrders.bind(this)
    this.clearSearchOrders = this.clearSearchOrders.bind(this)
    this.updateKey = this.updateKey.bind(this)
    // this.onStateChange = this.onStateChange.bind(this)
    // this.pollOrdersData = this.pollOrdersData.bind(this)
    // this.mountOrderDetail = this.mountOrderDetail.bind(this)
    // this.unmountOrderDetail = this.unmountOrderDetail.bind(this)
    // this.handleFilterChange = this.handleFilterChange.bind(this)
    // this.handleRouteChange = this.handleRouteChange.bind(this)
    // this.handlePageChange = this.handlePageChange.bind(this)
    // // this.setQueryString = this.setQueryString.bind(this)
    // this.resetPagination = this.resetPagination.bind(this)
    // this.setSearchQuery = this.setSearchQuery.bind(this)
    // this.fetchOrdersData = this.fetchOrdersData.bind(this)
    // this.searchOrdersData = this.searchOrdersData.bind(this)
    // this.filterOrdersData = this.filterOrdersData.bind(this)
    // this.handleClearFilter = this.handleClearFilter.bind(this)
    this.handleAutoPilot = this.handleAutoPilot.bind(this)
    // this.setDate = this.setDate.bind(this)
    // this.handleChooseDate = this.handleChooseDate.bind(this)
    // this.handleClearDate = this.handleClearDate.bind(this)
    // this.setSideMenuToggle = this.setSideMenuToggle.bind(this)
    // this.changeKey =this.changeKey.bind(this)
    // this.handlefetchAutoPilotStatus = this.handlefetchAutoPilotStatus.bind(this)
  }

  searchOrders(query) {
    this.props.actions.searchLiveOrders({
      query,
      offset: 0,
      limit: 40
    })
    history.push(`/home/orders/search?q=${query}`, null)
  }

  clearSearchOrders() {
    const { currentRoute } = this.state
    history.push(`/home/orders/${currentRoute}`, null)
  }

  setSideMenuToggle() {
    const { isSideMenuOpen } = this.state
    this.setState({ isSideMenuOpen: !isSideMenuOpen })
  }

  updateKey() {
    const { key } = this.state
    this.setState({ key: key + 1 })
  }

  handleRouteChange(nextroute) {
    const { currentRoute } = this.state
    this.props.actions.setLoadingAll()
    if (currentRoute === nextroute) {
      this.updateKey()
    } else {
      this.setState({ currentRoute: nextroute })
    }
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

  componentDidMount() {
    const _self = this

    ;(function pollAutoPilotStatus() {
      _self.props.actions.fetchAutoPilotStatus({ city_id: 5 })
      setTimeout(pollAutoPilotStatus, 30000)
    })()

    this.unlisten = history.listen(location => {
      this.props.actions.setLoadingAll()
      const nextroute = location.pathname.split('/')[3]
      if (nextroute === this.state.currentRoute) {
        this.updateKey()
      }
      if (nextroute !== 'search') {
        this.setState({ currentRoute: nextroute })
      }
      this.unmountOrderDetail()
    })
  }

  // setSearchQuery(searchQuery, ordersType) {
  //   if (ordersType) {
  //     this.setState({ searchQuery, ordersType })
  //   }
  // }
  //
  // setDate(fromDate, toDate) {
  //   this.setState({
  //     fromDate,
  //     toDate,
  //     dateChanged: true
  //   }, function() {
  //     this.fetchOrdersData('attempted', 0)
  //   })
  // }

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

  // resetPagination() {
  //   this.setState({ activePage: 1, pageOffset: 0 })
  // }
  //
  // filterOrdersData(filter) {
  //   const { actions } = this.props
  //   const postData = {
  //     limit: this.pagesLimit,
  //     offset: this.pageOffset,
  //     filter_by: filter
  //   }
  //
  //   actions.fetchLiveOrders(postData)
  // }
  //
  //
  // handleFilterChange(filter) {
  //   this.resetPagination()
  //   // const { actions } = this.props
  //   // const postData = {
  //   //   limit: this.pagesLimit,
  //   //   offset: 0,
  //   //   where: {
  //   //     type: 'status',
  //   //     value: ''
  //   //   }
  //   // }
  //   this.filterOrdersData(filter)
  // }

  // handleClearFilter() {
  //   const { ordersType, pageOffset } = this.state
  //   this.fetchOrdersData(ordersType, pageOffset)
  // }
  //
  handleAutoPilot(status, CB) {
    const { actions } = this.props
    const postData = {
      status
    }
    actions.autoPilot(postData, CB)
  }


  // handleDateChange(dateType) {
  //   console.log(dateType)
  //   switch (dateType) {
  //     case 'custom':
  //       mountModal(DatePicker())
  //       break
  //   }
  // }

  // handleClearDate() {
  //   const today = new Date()
  //   const tommorrow = new Date(today.getTime())
  //   tommorrow.setDate(tommorrow.getDate() + 1)
  //
  //   this.setState({
  //     fromDate: today,
  //     toDate: tommorrow,
  //     dateChanged: false
  //   }, function() {
  //     this.fetchOrdersData('attempted', 0)
  //   })
  // }

  // handleChooseDate() {
  //   mountModal(DatePicker({
  //     setDate: this.setDate,
  //     apply: this.fetchOrdersData
  //   }))
  // }
  // onMapCreated(map) {
  //   map.setOptions({
  //     disableDefaultUI: true
  //   })
  // }

  render() {
    return (
      <Router history={history}>
        <div>
          <NavBar
            history={history}
            isSideMenuOpen={this.state.isSideMenuOpen}
            autoPilot={this.handleAutoPilot}
            autoPilotStatus={false}
            setSideMenuToggle={this.setSideMenuToggle}
          />

          <SideMenu
            setSideMenuToggle={this.setSideMenuToggle}
            isOpen={this.state.isSideMenuOpen}
            currentRoute={this.state.currentRoute}
            resetPagination={this.resetPagination}
            unmountOrderDetail={this.unmountOrderDetail}
            handleRouteChange={this.handleRouteChange}
          />
          <div className='body-container'>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '600px' }}>
              <SearchInput
                clearSearch={this.clearSearchOrders}
                search={this.searchOrders}
                placeholder='Search all orders...'
              />
            </div>
            {
              // OrderDetail component is using the old API
              this.state.shouldMountOrderDetail &&
              <OrderDetail
                ordersType={this.state.currentRoute}
                canAccess={canAccess}
                currentOrderId={this.state.currentOrderId}
                unmountOrderDetail={this.unmountOrderDetail}
              />
            }
          </div>
          <div style={{
            marginTop: '10px',
            padding: '10px',
            background: '#f6f6f6',
            position: 'sticky',
            top: '65px',
            boxShadow: '0px 1px 2px 0px #ddd'
          }}>
            <h3 style={{
              textTransform: 'uppercase',
              margin: '0',
              textAlign: 'center'
            }}>
              { location.search ? 'All orders' : menuItemsMap[this.state.currentRoute] }
            </h3>
          </div>
          <Switch key={this.state.key}>
            <Route exact path='/home/orders' render={ props => <LiveOrdersList {...props} mountOrderDetail={this.mountOrderDetail} /> } />
            <Route exact path='/home/orders/live' render={ props => <LiveOrdersList {...props} mountOrderDetail={this.mountOrderDetail} /> } />
            <Route exact path='/home/orders/assigned' render={ props => <LiveAssignedOrdersList {...props} mountOrderDetail={this.mountOrderDetail} /> } />
            <Route exact path='/home/orders/unassigned' render={ props => <LiveUnassignedOrdersList {...props} mountOrderDetail={this.mountOrderDetail} /> } />
            <Route exact path='/home/orders/history' render={ props => <HistoryOrdersList {...props} mountOrderDetail={this.mountOrderDetail} /> } />
            <Route exact path='/home/orders/need-to-be-cancelled' render={ props => <NeedToBeCancelledOrdersList {...props} mountOrderDetail={this.mountOrderDetail} /> } />
            <Route exact path='/home/orders/attempted' render={ props => <AttemptedOrdersList {...props} mountOrderDetail={this.mountOrderDetail} /> } />
            <Route exact path='/home/orders/busy-delivery-agents' render={ props => <BusyDeliveryAgentsList {...props} mountOrderDetail={this.mountOrderDetail} /> } />
            <Route exact path='/home/orders/returning' render={ props => <ReturningOrdersList {...props} mountOrderDetail={this.mountOrderDetail} /> } />
            <Route exact path='/home/orders/search' render={ props => <SearchOrdersList {...props} mountOrderDetail={this.mountOrderDetail} /> } />
          </Switch>
        </div>
      </Router>
    )

    // const {
    //   shouldMountOrderDetail,
    //   currentOrderId,
    //   shouldListScroll,
    //   ordersType,
    //   activePage,
    //   pageOffset,
    //   searchAPI,
    //   searchQuery,
    //   dateChanged,
    //   fromDate,
    //   toDate
    // } = this.state
    //
    //
    // const { actions } = this.props
    // !shouldListScroll
    // ? document.querySelector('body').className = 'no-scroll'
    // : document.querySelector('body').className = ''
    //
    // const menuItemsMap = {}
    // menuItems.reduce((menuItemsMap, item) => {
    //   menuItemsMap[item.value] = item.label
    //   return menuItemsMap
    // }, menuItemsMap)
    //
    // return (
    //   <div key={this.state.key}>
        // <NavBar
        //   isSideMenuOpen={this.state.isSideMenuOpen}
        //   autoPilot={this.handleAutoPilot}
        //   autoPilotStatus={autoPilotStatus}
        //   handleRouteChange={this.fetchOrdersData}
        //   canAccess={canAccess}
        //   search={this.searchOrdersData}
        //   searchQuery={searchQuery}
        //   searchAPI={searchAPI}
        //   setQueryString={this.setQueryString}
        //   setSearchQuery={this.setSearchQuery}
        //   pagesLimit={this.pagesLimit}
        //   pageOffset={pageOffset}
        //   resetPagination={this.resetPagination}
        //   unmountOrderDetail={this.unmountOrderDetail}
        //   setSideMenuToggle={this.setSideMenuToggle}
        // />
    //     <SideMenu
    //       changeOrderpageKey={this.changeKey}
    //       changeAppKey={this.props.changeAppKey}
    //       setSideMenuToggle={this.setSideMenuToggle}
    //       isOpen={this.state.isSideMenuOpen}
    //       ordersType={this.state.ordersType}
    //       resetPagination={this.resetPagination}
    //       unmountOrderDetail={this.unmountOrderDetail}
    //       handleRouteChange={this.handleRouteChange}
    //     />
    //     <div className='body-container'>
    //       <div className='orders-filter'>
    //         { ordersType !== 'history' ? <label>Filter by</label> : '' }
    //         {
    //           ordersType !== 'history' && ordersType !== 'attempted' &&
    //             <Fragment>
    //               <Dropdown
    //                 handleClearFilter={this.handleClearFilter}
    //                 options={filterOptions}
    //                 onChange={this.handleFilterChange}
    //               />
    //               <div style={{ width: '40px' }}></div>
    //             </Fragment>
    //         }
    //         {
    //           ordersType == 'attempted' &&
    //             <button style={{textTransform: 'capitalize'}} onClick={this.handleChooseDate}>
    //               {
    //                 !dateChanged
    //                 ? 'Choose date'
    //                 : `${new Date(fromDate).toJSON().slice(0, 10)} to ${new Date(toDate).toJSON().slice(0, 10)}`
    //               }
    //             </button>
    //         }
    //         {
    //           dateChanged && ordersType == 'attempted'
    //           ? <button onClick={this.handleClearDate}>
    //               <span
    //                 style={{position: 'relative', top: '4px', left: '0px'}}>
    //                   {getIcon('cross')}
    //               </span>
    //             </button>
    //           : ''
    //         }
    //
    //         <SearchInput
    //           search={this.searchOrdersData}
    //           setSearchQuery={this.setSearchQuery}
    //           searchQuery={searchQuery}
    //           ordersType={ordersType}
    //           changeAppKey={this.props.changeAppKey}
    //         />
    //       </div>
          // <div style={{
          //   marginTop: '10px',
          //   padding: '10px',
          //   background: '#f6f6f6',
          //   position: 'sticky',
          //   top: '65px',
          //   boxShadow: '0px 1px 2px 0px #ddd'
          // }}>
          //   <h3 style={{
          //     textTransform: 'uppercase',
          //     margin: '0',
          //     textAlign: 'center'
          //   }}>
          //     { menuItemsMap[ordersType] }
          //   </h3>
          // </div>
    //       {
    //         orders && (searchQuery.length || (ordersType !== 'busy-delivery-agents' && ordersType !== 'returning'))
    //         ? <OrdersList
    //           canAccess={canAccess}
    //           loadingOrdersList={loadingOrdersList}
    //           orders={orders}
    //           ordersType={ordersType}
    //           unmountOrderDetail={this.unmountOrderDetail}
    //           mountOrderDetail={this.mountOrderDetail}
    //           actions={actions}
    //           notesData={notesData}
    //           loadingNotes={loadingNotes}
    //           state={state}
    //         />
    //         : ''
    //       }
    //
    //       {
    //         ordersType === 'busy-delivery-agents' && !searchQuery.length &&
    //         <UnavailableDpList mountOrderDetail={this.mountOrderDetail} />
    //       }
    //
    //       {
    //         ordersType === 'returning' && !searchQuery.length &&
    //         <ReturningOrdersList mountOrderDetail={this.mountOrderDetail} />
    //       }
    //
    //       {
    //         !loadingOrdersList && ordersCount > 0 &&
    //         ordersType !== 'busy-delivery-agents' && ordersType !== 'returning'
    //         ? <Pagination
    //           activePage={activePage}
    //           itemsCountPerPage={this.pagesLimit}
    //           totalItemsCount={ordersCount}
    //           pageRangeDisplayed={5}
    //           onChange={this.handlePageChange}
    //         />
    //         : ''
    //       }
    //       {
    //         shouldMountOrderDetail
    //         ? <OrderDetail
    //           plotData={plotData}
    //           ordersType={ordersType}
    //           canAccess={canAccess}
    //           retailer={retailer}
    //           customer={customer}
    //           deliverer={deliverer}
    //           loadingOrderDetail={loadingOrderDetail}
    //           actions={actions}
    //           order={order}
    //           currentOrderId={currentOrderId}
    //           unmountOrderDetail={this.unmountOrderDetail}
    //         />
    //         : ''
    //       }
    //       </div>
    //     <div>
    //
    //     </div>
    //   </div>
    // )
  }
}
//
const mapStateToProps = state => state.OrderPage

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

// export default Home
