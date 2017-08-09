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
    this.state = {
      shouldMountOrderDetail: false,
      shouldListScroll: true,
      currentOrderId: null
    }
    this.onStateChange = this.onStateChange.bind(this)
    this.mountOrderDetail = this.mountOrderDetail.bind(this)
    this.unmountOrderDetail = this.unmountOrderDetail.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.fetchDataOnRouteChange = this.fetchDataOnRouteChange.bind(this)
  }

  fetchDataOnRouteChange(ordersType) {
    // TODO: Fetch data here on route change
    const { actions } = this.props
    actions.fetchDataOnRouteChange(ordersType)
  }

  componentDidMount() {
    const ordersType = location.href.split('/')[4] ? location.href.split('/')[4] : 'all'
    const { actions } = this.props
    // console.log(match.params);
    actions.fetchDataOnRouteChange(ordersType)
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

  onStateChange(e) {
    // const { dispatch } = this.props
    actions.stateChange(e.target.value)
  }

  handleChange(filter) {
    // Filter orders list with applied filter
    // const { dispatch } = this.props
    // dispatch(filterOrdersList(filter))
  }

  // onMapCreated(map) {
  //   map.setOptions({
  //     disableDefaultUI: true
  //   })
  // }

  render() {
    const {
      state,
      order,
      retailer,
      deliverer,
      customer,
      match
    } = this.props


    const titleMap = {
      'SearchingRetailer': 'Searching For Retailers',
      'AwaitingRetailerConfirmation': 'Awaiting Retailer Confirmation',
      'SearchingDeliverer': 'Searching For Deliverer',
      'AwaitingDelivererConfirmation': 'Awaiting Deliverer Confirmation',
      'DelivererConfirmed': 'Deliverer on way to pick up the order',
      'OrderDispatched': 'Order Picked Up and On way',
      'OrderDelivered': 'Order Delivered',
      'OrderCancelled': 'Order Cancelled',
    }

    const articleMap = {
      'SearchingRetailer': '',
      'AwaitingRetailerConfirmation': 'for',
      'SearchingDeliverer': '',
      'AwaitingDelivererConfirmation': 'for',
      'DelivererConfirmed': '',
      'OrderDispatched': '',
      'OrderDelivered': '',
      'OrderCancelled': 'at',
    }

    const epilogueMap = {
      'SearchingRetailer': '',
      'AwaitingRetailerConfirmation': 'Min.',
      'SearchingDeliverer': '',
      'AwaitingDelivererConfirmation': 'Min.',
      'DelivererConfirmed': 'Min Ago',
      'OrderDispatched': 'Min Ago',
      'OrderDelivered': '',
      'OrderCancelled': order.cancelledTime,
    }

    const timeMap = {
      'SearchingRetailer': '',
      'AwaitingRetailerConfirmation': getTimeDiff(retailer.orderPlacedTime),
      'SearchingDeliverer': '',
      'AwaitingDelivererConfirmation': getTimeDiff(deliverer.orderPlacedTime),
      'DelivererConfirmed': getTimeDiff(deliverer.orderAcceptedTime),
      'OrderDispatched': getTimeDiff(retailer.dispatchedTime),
      'OrderDelivered': '',
    }

    const { shouldMountOrderDetail, currentOrderId, shouldListScroll } = this.state
    const listWrapperInlineStyle = { overflow: shouldListScroll ? 'auto' : 'hidden' }
    const { actions } = this.props

    return (
      <div className='main-wrapper'>
        <NavBar />
        <SideMenu
          unmountOrderDetail={this.unmountOrderDetail}
          fetchDataOnRouteChange={this.fetchDataOnRouteChange}
        />
        <div className='order-wrapper' style={listWrapperInlineStyle}>
          <div className='orders-filter'>
            <Dropdown
              options={filterOptions}
              onChange={this.handleChange}
            />
          </div>
          <OrdersList
            orders={order.content}
            unmountOrderDetail={this.unmountOrderDetail}
            mountOrderDetail={this.mountOrderDetail}
            titleMap={titleMap}
            articleMap={articleMap}
            timeMap={timeMap}
            epilogueMap={epilogueMap}
            state={state}
          />
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
          <select style={{position: 'fixed', top: '65px', right: '0px'}} onChange={this.onStateChange}>
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
          </select>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  state: state.OrderPage.state,
  order: state.OrderPage.order,
  retailer: state.OrderPage.retailer,
  deliverer: state.OrderPage.deliverer,
  customer: state.OrderPage.customer,
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderPage)
