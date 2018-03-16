import React from 'react'
import ModalHeader from '@components/ModalBox/ModalHeader'
import ModalFooter from '@components/ModalBox/ModalFooter'
import ModalBody from '@components/ModalBox/ModalBody'
import ModalBox from '@components/ModalBox'
import { mountModal, unMountModal } from '@components/ModalBox/utils'
import ConfirmModal from '@components/ModalBox/ConfirmModal'
import '@sass/OrdersPage/ShowNotified.scss'
import Moment from 'moment'
import { POST } from '@utils/fetch'

export default function showNotified(data) {
  return class showNotified extends React.Component {
    constructor() {
      super()
      this.DP = []
      this.state = {
        loadingDP: true
      }
      this.listDP = this.listDP.bind(this)
    }

    componentDidMount() {
      this.listDP()
    }

    listDP() {
      POST({
        api: '/support/getDpsForOrder',
        handleError: true,
        apiBase: 'deliverymanUrl',
        data: {
          retailer_id: data.retailerId,
          delivery_order_id: data.orderId
        }
      })
      .then(json => {
        this.DP = json.Dps
        this.setState({ loadingDP: false })
      })
    }

    assignNewDeliveryAgent(deliveryAgentId) {
      mountModal(ConfirmModal({
        heading: 'Confirm assign delivery agent',
        confirmMessage: 'Are you sure you want to assign this delivery agent to this order?',
        handleConfirm: () => {
          data.assignNewDeliveryAgentToOrder({
            delivery_order_id: data.orderId,
            retailer_id: data.retailerId,
            dp_id: deliveryAgentId
          })
          data.setLoading('loadingOrderDetail')
          unMountModal()
        }
      }))
    }

    render() {
      console.log(this.DP);
      return (
        <ModalBox>
          <ModalHeader>{ data.heading }</ModalHeader>
            <ModalBody>
              <table>
                <thead>
                  <tr>
                    <td>ID</td>
                    <td>NAME</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {
                    !this.state.loadingDP && this.DP &&
                    this.DP.map((item, i) => {
                      return (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>
                            <button
                              onClick={() => { this.assignNewDeliveryAgent(item.id) }}
                              style={{
                                padding: '2px 20px'
                              }}
                            >
                              assign
                            </button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </ModalBody>
          <ModalFooter>
            <button className='btn btn-primary' onClick={unMountModal}>Close</button>
          </ModalFooter>
        </ModalBox>
      )
    }
  }
}
