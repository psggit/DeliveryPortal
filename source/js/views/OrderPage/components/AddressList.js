import React from 'react'
import '@sass/address-list.scss'

class AddressList extends React.Component {

  constructor(props) {
    super(props)
    this.renderAddressList = this.renderAddressList.bind(this)
  }

  renderAddressList() {
    return this.props.data.addresses.map((item, i) => {
      return (
        <div key={i} onClick={()=>this.props.handleClick(item.gps, item.id)} className="address">{ item.address }</div>
      )
    })
  }

  render() {
    return (
      <div className="address-container">
        <div className="credits header">CREDITS: {this.props.data.consumer_info.credits}</div>
        <div className="title header">Select delivery address </div>
        <div className="addresses">
          {
            this.renderAddressList()
          }
        </div>
      </div>
    )
  }
}

export default AddressList