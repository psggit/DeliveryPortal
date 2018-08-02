import React from 'react'
import ModalHeader from '@components/ModalBox/ModalHeader'
import ModalFooter from '@components/ModalBox/ModalFooter'
import ModalBody from '@components/ModalBox/ModalBody'
import ModalBox from '@components/ModalBox'
import * as Actions from './../actions'

export default function CartSummary(data) {
  return class CartSummary extends React.Component {

    constructor(props) {
      super(props)
    }

    renderCartItems() {
      return data.cartItems.map((item) => {
        const price = item.price.split("₹")[1] 
        return (
          <tr>
            <td style={{textAlign: 'center'}}> {item.brand} </td>
            <td style={{textAlign: 'center'}}> {item.quantity} </td>
            <td style={{textAlign: 'center'}}> {item.volume} </td>
            <td style={{textAlign: 'center'}}> {item.quantity * parseInt(price)} </td>
          </tr>
        )
      })
    }

    render() {
      const style = { 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          paddingBottom: '10px',
          marginBottom: '10px', 
          borderBottom: '1px solid #f6f6f6'
      }
      return (
        <ModalBox>
          <ModalHeader> ORDER SUMMARY </ModalHeader>
          <ModalBody>
            <table>
              <tbody>
                <tr>
                  <td style={{textAlign: 'center', fontWeight: '600'}}> Brand </td>
                  <td style={{textAlign: 'center', fontWeight: '600'}}> Quantity </td>
                  <td style={{textAlign: 'center', fontWeight: '600'}}> Volume </td>
                  <td style={{textAlign: 'center', fontWeight: '600'}}> Price </td>
                </tr>
                {
                  this.renderCartItems()
                }
              </tbody>
            </table>
          </ModalBody>
          <ModalFooter>
            <div style={style}>
              <div style={{fontWeight: '600'}}>
                Cart total: {data.cartTotal}
              </div>
              <div style={{fontWeight: '600'}}>
                Delivery fee: {data.deliveryFee}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: '600' }}>
              <div>
                Total: {data.total}
              </div>
              <button onClick={() => data.handleClick()}> PLACE ORDER </button>
            </div>
          </ModalFooter>
        </ModalBox>
      )
    }
  }
}

//export default NewAddress
