import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as actions from './actions'
import { getIcon, getTimeDiff } from './utils'
import * as ActionTypes from './constants/actions'
import OrderInfo from './components/OrderInfo'
import NavBar from '@components/NavBar'
import SideMenu from './components/SideMenu'
import OrdersList from './components/OrdersList'
import Dropdown from '@components/Dropdown'
import OrderDetail from './components/OrderDetail'
import { filterOptions } from './constants/strings'

@connect(state => ({
  state: state.OrderPage.get('state'),
  order: state.OrderPage.get('order'),
  retailer: state.OrderPage.get('retailer'),
  deliverer: state.OrderPage.get('deliverer'),
  customer: state.OrderPage.get('customer'),
}))

export default class OrderPage extends Component {

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
    const { dispatch } = this.props
    dispatch(actions.fetchDataOnRouteChange(ordersType))
  }

  componentDidMount() {
    const ordersType = location.href.split('/')[4] ? location.href.split('/')[4] : 'all'
    const { dispatch, match } = this.props

    // console.log(match.params);
    dispatch(actions.fetchDataOnRouteChange(ordersType))
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
    const { dispatch } = this.props
    dispatch(actions.stateChange(e.target.value))
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
      'OrderCancelled': order.get('cancelledTime'),
    }

    const timeMap = {
      'SearchingRetailer': '',
      'AwaitingRetailerConfirmation': getTimeDiff(retailer.get('orderPlacedTime')),
      'SearchingDeliverer': '',
      'AwaitingDelivererConfirmation': getTimeDiff(deliverer.get('orderPlacedTime')),
      'DelivererConfirmed': getTimeDiff(deliverer.get('orderAcceptedTime')),
      'OrderDispatched': getTimeDiff(retailer.get('dispatchedTime')),
      'OrderDelivered': '',
    }

    const { shouldMountOrderDetail, currentOrderId, shouldListScroll } = this.state
    const listWrapperInlineStyle = { overflow: shouldListScroll ? 'auto' : 'hidden' }
    const ordersType = match.path.split('/').length < 3 ? 'all' :  match.path.split('/')[2]

    return (
      <div className='main-wrapper'>
        <NavBar />
        <SideMenu fetchDataOnRouteChange={this.fetchDataOnRouteChange} />
        <div className='order-wrapper' style={listWrapperInlineStyle}>
          <div className='orders-filter'>
            <Dropdown
              options={filterOptions}
              onChange={this.handleChange}
            />
          </div>
          <OrdersList
            orders={order.toJS().content}
            ordersType={ordersType}
            unmountOrderDetail={this.unmountOrderDetail}
            mountOrderDetail={this.mountOrderDetail}
          />
          {
            shouldMountOrderDetail
            ? <OrderDetail
              retailer={retailer}
              actions={actions}
              order={order}
              dispatch={ this.props.dispatch }
              ordersType={ordersType}
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
        <div className='OrderPage'>
          {/* <div onClick={this.epicenter} className='HeadingWrapper'>
                <select onChange={this.onStateChange}>
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
          </div> */}
          <div className='OrderWrapper'>
            {/* <Gmap
              customer={customer}
              deliverer={deliverer}
              retailer={retailer}
            /> */}
            {/* <OrderInfo
              state={state}
              customer={customer}
              order={order}
              deliverer={deliverer}
              retailer={retailer}
              match={match}
              timeMap={timeMap}
              titleMap={titleMap}
              articleMap={articleMap}
              epilogueMap={epilogueMap}
            /> */}
          </div>
        </div>
      </div>
    )
  }
}
