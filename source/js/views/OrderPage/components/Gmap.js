import React, { Component } from 'react'
import { Gmaps, Marker, InfoWindow } from 'react-gmaps';
const customerImg = '../../../../assets/icons/customer.png';
const delivererImg = '../../../../assets/icons/deliverer.png';
const outletImg = '../../../../assets/icons/outlet.png';
// import { Map } from 'immutable';

const params = {v: '3.exp', key: 'AIzaSyDpG-NeL-XGYAduQul2JenVr86HIPITEso'};

class Gmap extends Component {
  constructor() {
    super()
    this.state = {
      dx: 13.009563,
      dy: 80.254907
    }
  }
  // // Initial Customer State
  // const customer = {
  //   state: null,
  //   id: null,
  //   name: null,
  //   address: null,
  //   phone: null,
  //   x: null,
  //   y: null
  // }

  // // Initial Deliverer State
  // const deliverer = {
  //   state: null,
  //   id: null,
  //   name: null,
  //   phone: null,
  //   orderPlacedTime: null,
  //   vehicleNo: null,
  //   orderAcceptedTime: null,
  //   deliveredTime: null,
  //   x: null,
  //   y: null
  // }

  // // Initial Retailer State
  // const retailer = {
  //   state: null,
  //   id: null,
  //   name: null,
  //   phone: null,
  //   cancelled: null,
  //   orderPlacedTime: null,
  //   orderAcceptedTime: null,
  //   dispatchedTime: null,
  //   x: null,
  //   y: null
  // }
  render() {
    var socket = io('https://livered.hearsay81.hasura-app.io/', {
      path: '/pool'
    })
    
    console.log(socket)
    
    socket.on('status', function (data) {
      console.log(data);
      socket.emit('subscribe', {"order_id": '43'});
    });
    
    socket.on('subscribed', function(data) {
      console.log(data)
    })
    
    socket.on('live_data', function(res) {
      console.log(res)
      this.setState({
        dx: res.gps.split(',')[0],
        dy: res.gps.split(',')[1]
      })
    })
    
    const { customer, retailer, deliverer } = this.props
    const cx = parseFloat(customer.gps.split(',')[0])
    const cy = parseFloat(customer.gps.split(',')[1])
    const rx = parseFloat(retailer.gps.split(',')[0])
    const ry = parseFloat(retailer.gps.split(',')[1])
    const { dx, dy } = this.state

    return (
      <div className='MapWrapper'>
        <Gmaps
          style={{width: '100%', height: '100%'}}
          lat={dx}
          lng={dy}
          zoom={12}
          loadingMessage={'Loading...'}
          params={params}
          >
          <Marker
            icon={customerImg}
            lat={cx}
            lng={cy} />
          <Marker
            icon={delivererImg}
            lat={dx}
            lng={dy} />
          <Marker
            icon={outletImg}
          lat={rx}
          lng={ry} />
        </Gmaps>
      </div>
    )
  }
}

export default Gmap
