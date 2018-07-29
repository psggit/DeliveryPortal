import React from 'react'
import '@sass/address-list.scss'
import ModalHeader from '@components/ModalBox/ModalHeader'
import ModalFooter from '@components/ModalBox/ModalFooter'
import ModalBody from '@components/ModalBox/ModalBody'
import ModalBox from '@components/ModalBox'
import { unMountModal } from '@components/ModalBox/utils'
import { mountModal } from '../../../components/ModalBox/utils';
import NewAddress from './NewAddress'

class AddressList extends React.Component {

  constructor(props) {
    super(props)
    this.renderAddressList = this.renderAddressList.bind(this)
  }

  renderAddressList() {
    return this.props.data.addresses.map((item, i) => {
      return (
        <div key={i} onClick={()=>this.props.handleClick(item.gps, item.address_id)} className="address">{ item.address }</div>
        // <React.Fragment>
        //   <tr>
        //     <td> <input type="radio" name="address" onClick={()=>this.props.handleClick(item.gps, item.address_id)}  /> </td>
        //     <td> { item.address } </td>
        //   </tr>
        // </React.Fragment>
      )
    })
  }

  showAddAddressModal() {
    mountModal(NewAddress({}))
  }

  render() {
    return (
      <div className="address-container">
        <div className="title header">CREDITS: {this.props.data.consumer_details.available_credits} </div>
        <div className="subtitle header">
          <div> Select delivery address </div>
          <div> <button onClick={this.showAddAddressModal}> Add address </button> </div>
        </div>
        <div className="addresses">
          {
            this.renderAddressList()
          }
        </div>
      </div>
      // <ModalBox>
      //   <ModalHeader>Select or add delivery address</ModalHeader>
      //   <ModalBody height='560px'>
      //     <table className='table--hovered'>
      //       <tbody>
      //         {
      //           this.renderAddressList()
      //         }
      //       </tbody>
      //     </table>
      //   </ModalBody>
           //<ModalFooter> <button> Add address </button> </ModalFooter> 
      // </ModalBox>
    )
  }
}

export default AddressList