import React from 'react'
import { Gmaps, Marker, InfoWindow } from 'react-gmaps';
const customerImg = '../../../../assets/icons/customer.png';
const delivererImg = '../../../../assets/icons/deliverer.png';
const outletImg = '../../../../assets/icons/outlet.png';
import { Map } from 'immutable';

const params = {v: '3.exp', key: 'AIzaSyDpG-NeL-XGYAduQul2JenVr86HIPITEso'};

const Gmap = () => {
  // Initial Customer State
  const customer = Map({
    state: null,
    id: null,
    name: null,
    address: null,
    phone: null,
    x: null,
    y: null
  });

  // Initial Deliverer State
  const deliverer = Map({
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
  });

  // Initial Retailer State
  const retailer = Map({
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
  });
  return (
    <div className='MapWrapper'>
      <Gmaps
        style={{width: '100%', height: '100vh'}}
        lat={(customer.get('x') + retailer.get('x') - 0.12)/2}
        lng={(customer.get('y') + retailer.get('y'))/2}
        zoom={12}
        loadingMessage={'Loading...'}
        params={params}
        onMapCreated={this.onMapCreated}>
        <Marker
          icon={customerImg}
          lat={customer.get('x')}
          lng={customer.get('y')} />
        <Marker
          icon={delivererImg}
          lat={deliverer.get('x')}
          lng={deliverer.get('y')} />
        <Marker
          icon={outletImg}
        lat={retailer.get('x')}
        lng={retailer.get('y')} />
      </Gmaps>
    </div>
  )
}

export default Gmap
