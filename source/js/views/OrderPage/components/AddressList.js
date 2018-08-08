import React from 'react'
import ModalHeader from '@components/ModalBox/ModalHeader'
import ModalBody from '@components/ModalBox/ModalBody'
import ModalBox from '@components/ModalBox'

export default function AddressList(data) {
  return class AddressList extends React.Component {

    constructor(props) {
      super(props)
      this.renderAddressList = this.renderAddressList.bind(this)
    }

    renderAddressList() {
      return data.addresses.map((item, i) => {
        return (
          <React.Fragment>
            <tr key={i}>
              <td> <input type="radio" name="address" onClick={()=>data.handleClick(item.gps, item.address_id, item.address)}  /> </td>
              <td> { item.address } </td>
            </tr>
          </React.Fragment>
        )
      })
    }

    render() {
      return (
        <ModalBox>
          <ModalHeader>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <div>Select or add delivery address</div>
              <button onClick={data.showAddAddressModal}> Add address </button> 
            </div>
          </ModalHeader>
          <ModalBody height='560px'>
            <table className='table--hovered'>
              <tbody>
                {
                  this.renderAddressList()
                }
              </tbody>
            </table>
          </ModalBody>
        </ModalBox>
      )
    }
  }
}
//export default AddressList