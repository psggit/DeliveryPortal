import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
const customerImg = '../assets/icons/customer.svg';
const delivererImg = '../assets/icons/deliverer.svg';
const outletImg = '../assets/icons/retailer.svg';

const AnyReactComponent = ({ img }) => <div><img src={img} /></div>;

class Gmap extends Component {
  // static defaultProps = {
  //   center: {lat: 59.95, lng: 30.33},
  //   zoom: 12
  // };

  constructor(props) {
    const { customer, retailer, deliverer } = props
    const cx = parseFloat(customer.gps.split(',')[0])
    const cy = parseFloat(customer.gps.split(',')[1])
    const rx = parseFloat(retailer.gps.split(',')[0])
    const ry = parseFloat(retailer.gps.split(',')[1])
    super(props)
    this.state = {
      center: { lat: cx, lng: cy },
      zoom: 16,
      cx,
      cy,
      rx,
      ry,
      dx: 13.009563,
      dy: 80.254907
    }
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
  componentWillUnmount() {
    document.querySelector('.modal-container').style.width = '46%'
    document.querySelector('.modal-container').style.height = 'auto'
  }

  handleZoomStart(e) {
    console.log(e)
  }
  render() {
    const { dx, dy, cx, cy, rx, ry } = this.state

    return (
      <div className='MapWrapper'>
        <GoogleMapReact
        style={{width: '100%', height: '100%'}}
        defaultCenter={this.state.center}
        defaultZoom={this.state.zoom}
        onZoomAnimationStart={this.handleZoomStart}
      >
        <AnyReactComponent
          lat={cx}
          lng={cy}
          img={customerImg}
        />
        <AnyReactComponent
          lat={rx}
          lng={ry}
          img={outletImg}
        />
        <AnyReactComponent
          lat={dx}
          lng={dy}
          img={delivererImg}
        />
      </GoogleMapReact>
      </div>
    )
  }
}

export default Gmap