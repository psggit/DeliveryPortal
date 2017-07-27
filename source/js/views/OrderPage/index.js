import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { filterOrdersList } from './actions'
import { getIcon } from './utils'
import * as ActionTypes from './constants/actions'
import OrderInfo from './components/OrderInfo'
import NavBar from '@components/NavBar'
import SideMenu from './components/SideMenu'
import OrdersList from './components/OrdersList'
import Dropdown from '@components/Dropdown'
import OrderDetail from './components/OrderDetail'

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
      shouldListScroll: true
    }
    // this.onStateChange = this.onStateChange.bind(this)
    this.mountOrderDetail = this.mountOrderDetail.bind(this)
    this.unmountOrderDetail = this.unmountOrderDetail.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }


  componentWillMount() {
    // fetchOrderInformation
  }

  mountOrderDetail() {
    this.setState({
      shouldMountOrderDetail: true,
      shouldListScroll: false
    })
  }

  unmountOrderDetail() {
    this.setState({
      shouldMountOrderDetail: false,
      shouldListScroll: true
    })
  }

  // onStateChange(e) {
  //   const { dispatch } = this.props
  //   dispatch(stateChange(e.target.value))
  // }

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
    console.log('mounted');
    const {
      state,
      order,
      retailer,
      deliverer,
      customer,
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
    //
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
    //
    // const epilogueMap = {
    //   'SearchingRetailer': '',
    //   'AwaitingRetailerConfirmation': 'Min.',
    //   'SearchingDeliverer': '',
    //   'AwaitingDelivererConfirmation': 'Min.',
    //   'DelivererConfirmed': 'Min Ago',
    //   'OrderDispatched': 'Min Ago',
    //   'OrderDelivered': '',
    //   'OrderCancelled': order.get('cancelledTime'),
    // }
    //
    // const timeMap = {
    //   'SearchingRetailer': '',
    //   'AwaitingRetailerConfirmation': Math.round((new Date() - new Date(retailer.get('orderPlacedTime')))/60000),
    //   'SearchingDeliverer': '',
    //   'AwaitingDelivererConfirmation': Math.round((new Date() - new Date(deliverer.get('orderPlacedTime')))/60000),
    //   'DelivererConfirmed':Math.round((new Date() - new Date(deliverer.get('orderAcceptedTime')))/60000),
    //   'OrderDispatched': Math.round((new Date() - new Date(retailer.get('dispatchedTime')))/60000),
    //   'OrderDelivered': '',
    // }
    //
    const options = [
      { value: 'finding retailer', label: 'Finding Retailer'},
      { value: 'awaiting confirmation from retailer', label: 'Awaiting confirmation from retailer '},
      { value: 'finding delievery boy', label: 'Finding delievery boy'},
      { value: 'awaiting confirmation from delievery boy', label: 'Awaiting confirmation from delievery boy'}
    ]

    const { shouldMountOrderDetail } = this.state
    const { shouldListScroll } = this.state
    const listWrapperInlineStyle = { overflow: shouldListScroll ? 'auto' : 'hidden' }
    const ordersType = match.path.split('/').length < 3 ? 'all' :  match.path.split('/')[2]

    return (
      <div className='main-wrapper'>
        <NavBar />
        <SideMenu />
        <div className='order-wrapper' style={listWrapperInlineStyle}>
          <div className='orders-filter'>
            <Dropdown options={options} onChange={this.handleChange} />
          </div>
          <OrdersList ordersType={ordersType} mountOrderDetail={this.mountOrderDetail} />
          {
            shouldMountOrderDetail
            ? <OrderDetail ordersType={ordersType} unmountOrderDetail={this.unmountOrderDetail} />
            : ''
          }
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
