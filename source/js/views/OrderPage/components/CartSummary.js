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

    cartTotal() {
      return data.cartItems.reduce((sum, item) => {
        const price = item.price.split("₹")[1] 
        return sum + parseInt(price)
      }, 0)
    }

    renderCartItems() {
      return data.cartItems.map((item, i) => {
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                Total: {this.cartTotal()}
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
