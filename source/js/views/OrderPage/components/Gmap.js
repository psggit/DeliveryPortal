import React from 'react'
import { Gmaps, Marker, InfoWindow } from 'react-gmaps';
const customerImg = '../../../../assets/icons/customer.png';
const delivererImg = '../../../../assets/icons/deliverer.png';
const outletImg = '../../../../assets/icons/outlet.png';

const params = {v: '3.exp', key: 'AIzaSyDpG-NeL-XGYAduQul2JenVr86HIPITEso'};

const Gmap = ({ customer, deliverer, retailer }) => {
  return (
    <div className='MapWrapper'>
      <Gmaps
        width={'1000px'}
        height={'800px'}
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
