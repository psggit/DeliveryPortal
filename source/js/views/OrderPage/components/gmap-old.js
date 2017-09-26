import React, { Component } from 'react'
import { Gmaps, Marker, InfoWindow } from 'react-gmaps';
import { Api } from './../../../utils/config'
const customerImg = '../assets/icons/customer.svg';
const delivererImg = '../assets/icons/deliverer.svg';
const outletImg = '../assets/icons/retailer.svg';

// import customer from '/icons/customer.svg'
// console.log(customer)
import { getIcon } from './../utils'
// import { Map } from 'immutable';

const params = {v: '3.exp', key: 'AIzaSyDpG-NeL-XGYAduQul2JenVr86HIPITEso'};

class Gmap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dx: null,
      dy: null,
      zoom: 18,
      plotData: props.plotData || []
    }
    this.handleMapCreated = this.handleMapCreated.bind(this)
    this.handleZoomChanged = this.handleZoomChanged.bind(this)
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({ plotData: nextProps.plotData })
  }

  componentDidMount() {
    document.querySelector('.modal-container').style.width = '70%'
    document.querySelector('.modal-container').style.height = '80%'


    const { orderId, actions, ordersType } = this.props
    
    const _self = this
    if (ordersType !== 'history') {
      var socket = io(Api.socketUrl, {
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
        let dx = res.gps_coordinates[0]
        let dy = res.gps_coordinates[1]
        _self.setState({
          dx: dx,
          dy: dy
        })
        
        _self.state.plotData.push({lat: dx, lng: dy})
      })
    }
  }

  handleMapCreated(map) {
    this.setState({ map })
    const { plotData } = this.state
    this.setState({
      dx: plotData[plotData.length - 1].lat,
      dy: plotData[plotData.length - 1].lng
    })
    var trafficLayer = new google.maps.TrafficLayer()
    
    // const flightPlanCoordinates = [
    //   {lat: 37.772, lng: -122.214},
    //   {lat: 21.291, lng: -157.821},
    //   {lat: -18.142, lng: 178.431},
    //   {lat: -27.467, lng: 153.027},
    // ]
    const deliveryPath = new google.maps.Polyline({
      path: plotData,
      geodesic: true,
      strokeColor: '#4990e2',
      strokeOpacity: 1.0,
      strokeWeight: 2,
    })
    
    trafficLayer.setMap(map)
    deliveryPath.setMap(map)
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
    const cx = customer.gps ? parseFloat(customer.gps.split(',')[0]) : null
    const cy = customer.gps ? parseFloat(customer.gps.split(',')[1]) : null
    const rx = retailer.gps ? parseFloat(retailer.gps.split(',')[0]) : null
    const ry = retailer.gps ? parseFloat(retailer.gps.split(',')[1]) : null
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
