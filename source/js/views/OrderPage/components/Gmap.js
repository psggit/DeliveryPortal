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
    const { customer, retailer, deliverer } = this.props
    const cx = parseFloat(customer.gps.split(',')[0])
    const cy = parseFloat(customer.gps.split(',')[1])
    const rx = parseFloat(retailer.gps.split(',')[0])
    const ry = parseFloat(retailer.gps.split(',')[1])
    const dx = parseFloat(retailer.gps.split(',')[0]) + 1
    const dy = parseFloat(retailer.gps.split(',')[1]) + 1

    return (
      <div className='MapWrapper'>
        <Gmaps
          style={{width: '100%', height: '100vh'}}
          lat={cx}
          lng={cy}
          zoom={12}
          loadingMessage={'Loading...'}
          params={params}
          onMapCreated={this.onMapCreated}>
          <Marker
            icon={customerImg}
            lat={cx}
            lng={cy} />
          <Marker
            icon={delivererImg}
            lat={rx}
            lng={ry} />
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
