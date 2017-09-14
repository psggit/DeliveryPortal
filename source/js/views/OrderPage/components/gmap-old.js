import React, { Component } from 'react'
import { Gmaps, Marker, InfoWindow } from 'react-gmaps';
const customerImg = '../assets/icons/customer.svg';
const delivererImg = '../assets/icons/deliverer.svg';
const outletImg = '../assets/icons/retailer.svg';

// import customer from '/icons/customer.svg'
// console.log(customer)
import { getIcon } from './../utils'
// import { Map } from 'immutable';

const params = {v: '3.exp', key: 'AIzaSyDpG-NeL-XGYAduQul2JenVr86HIPITEso'};

class Gmap extends Component {
  constructor() {
    super()
    this.state = {
      dx: null,
      dy: null,
      zoom: 18
    }
    this.handleMapCreated = this.handleMapCreated.bind(this)
    this.handleZoomChanged = this.handleZoomChanged.bind(this)
  }
  
  componentDidMount() {
    document.querySelector('.modal-container').style.width = '70%'
    document.querySelector('.modal-container').style.height = '80%'
    const { orderId } = this.props
    const _self = this
    var socket = io('https://livered.bulwarks78.hasura-app.io/', {
      path: '/pool'
    })
    socket.on('status', function (data) {
      console.log(data);
      socket.emit('subscribe', {"order_id": orderId });
    });
    
    socket.on('subscribed', function(data) {
      console.log(data)
    })
    
    socket.on('live_data', function(res) {
      console.log(res)
      _self.setState({
        dx: res.gps_coordinates[0],
        dy: res.gps_coordinates[1]
      })
    })
  }

  handleMapCreated(map) {
    this.setState({ map })
  }
  handleZoomChanged() {
    const { map, zoom } = this.state
    const newZoome = map.getZoom()
    // console.log(newZoome, zoom)
    if (zoom !== newZoome) {
      // console.log('changed')
      this.setState({ zoom: newZoome }) 
    }
  }
  componentWillUnmount() {
    document.querySelector('.modal-container').style.width = '46%'
    document.querySelector('.modal-container').style.height = 'auto'
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
    const { dx, dy } = this.state

    return (
      <div className='MapWrapper'>
        <Gmaps
          style={{width: '100%', height: '100%'}}
          lat={dx}
          lng={dy}
          zoom={this.state.zoom}
          loadingMessage={'Loading...'}
          params={params}
          onMapCreated={this.handleMapCreated}
          onZoomChanged={this.handleZoomChanged}
          >
          <Marker
            icon={'../assets/icons/customer.svg'}
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
