import React from 'react'
import { Gmaps, Marker, InfoWindow } from 'react-gmaps';
const customerImg = '../../../../assets/icons/customer.png';
const delivererImg = '../../../../assets/icons/deliverer.png';
const outletImg = '../../../../assets/icons/outlet.png';
// import { Map } from 'immutable';

const params = {v: '3.exp', key: 'AIzaSyDpG-NeL-XGYAduQul2JenVr86HIPITEso'};

const Gmap = () => {
  // Initial Customer State
  const customer = {
    state: null,
    id: null,
    name: null,
    address: null,
    phone: null,
    x: null,
    y: null
  }

  // Initial Deliverer State
  const deliverer = {
    state: null,
    id: null,
    name: null,
    phone: null,
    orderPlacedTime: null,
    vehicleNo: null,
    orderAcceptedTime: null,
    deliveredTime: null,
    x: null,
    y: null
  }

  // Initial Retailer State
  const retailer = {
    state: null,
    id: null,
    name: null,
    phone: null,
    cancelled: null,
    orderPlacedTime: null,
    orderAcceptedTime: null,
    dispatchedTime: null,
    x: null,
    y: null
  }
  return (
    <div className='MapWrapper'>
      <Gmaps
        style={{width: '100%', height: '100vh'}}
        lat={(customer.x + retailer.x - 0.12)/2}
        lng={(customer.y + retailer.y/2)}
        zoom={12}
        loadingMessage={'Loading...'}
        params={params}
        onMapCreated={this.onMapCreated}>
        <Marker
          icon={customerImg}
          lat={customer.x}
          lng={customer.y} />
        <Marker
          icon={delivererImg}
          lat={deliverer.x}
          lng={deliverer.y} />
        <Marker
          icon={outletImg}
        lat={retailer.x}
        lng={retailer.y} />
      </Gmaps>
    </div>
  )
}

export default Gmap
