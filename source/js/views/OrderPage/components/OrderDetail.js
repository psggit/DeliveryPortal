import React, { Component } from 'react'
import { getIcon } from './../utils'

class OrderDetail extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.props.unmountOrderDetail()
  }
  openGmap() {
    window.open(`/orders/${1}`, '_blank')
  }
  componentDidMount() {

  }
  render() {
    const itemStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '10px'
    }
    const trackBtnStyle = {
      display: 'block',
      margin: '0 auto'
    }

    const loadingOrderDetail = true
    const { ordersType } = this.props

    return (
      <div className='order-detail'>
        <span className='return-to-list' onClick={this.handleClick}>{ getIcon('back') }</span>

        {
          loadingOrderDetail
          ? (
            <div>
              <div className='order detail-card'>
                <h4>Order detail</h4>
                <div className='info'>
                  <div style={itemStyle}>
                    <p><b>#2323</b></p>
                    <p>John Carter</p>
                  </div>
                  <p className='order-status'>Awaiting retailer confirmation</p>
                </div>
                {
                  ordersType !== 'history'
                  ? (
                    <div>
                      <button className='btn btn-green'>Assign me</button>
                      <button className='btn btn-blue'>Skip order</button>
                    </div>
                  )
                  : ''
                }
              </div>

              <div className='retailer detail-card'>
                <h4>Retailer detail</h4>
                <div className='info'>
                  <div style={itemStyle}>
                    <p><b>Melting corner</b></p>
                    <p>Khal drogo</p>
                  </div>
                  <p className='order-status'>Awaiting retailer confirmation</p>
                </div>
                {
                  ordersType !== 'history'
                  ? (
                    <div>
                      <button className='btn btn-red'>Cancel</button>
                      <button className='btn btn-green'>Confirm</button>
                    </div>
                  )
                  : ''
                }
              </div>

              <div className='delivery detail-card'>
                <h4>Delievery detail</h4>
                <div className='info'>
                  <div style={itemStyle}>
                    <p><b>Ajay Nayak</b></p>
                    {/* <p>John Carter</p> */}
                  </div>
                  <p className='order-status'>Awaiting retailer confirmation</p>
                </div>
                {
                  ordersType !== 'history'
                  ? (
                    <div>
                      <button className='btn btn-red'>Cancel</button>
                      <button className='btn btn-green'>Confirm</button>
                    </div>
                  )
                  : ''
                }

              </div>

              {
                ordersType !== 'history'
                ? <button
                  style={trackBtnStyle}
                  onClick={this.openGmap}
                  className='btn btn-black btn-lg'>
                  Track the order
                </button>
                : ''
              }
            </div>
          )
          : <div className='loader'>loading...</div>
        }

      </div>
    )
  }
}

export default OrderDetail
