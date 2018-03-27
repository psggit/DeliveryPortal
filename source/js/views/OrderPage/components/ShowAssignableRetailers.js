import React from 'react'
import ModalHeader from '@components/ModalBox/ModalHeader'
import ModalFooter from '@components/ModalBox/ModalFooter'
import ModalBody from '@components/ModalBox/ModalBody'
import ModalBox from '@components/ModalBox'
import { mountModal, unMountModal } from '@components/ModalBox/utils'
import ConfirmModal from '@components/ModalBox/ConfirmModal'
import '@sass/OrdersPage/ShowNotified.scss'
import { POST } from '@utils/fetch'

export default function showNotified(data) {
  return class showNotified extends React.Component {
    constructor() {
      super()
      this.retailers = []
      this.state = {
        loadingRetailers: true
      }
      this.listRetailers = this.listRetailers.bind(this)
    }

    componentDidMount() {
      this.listRetailers()
    }

    listRetailers() {
      POST({
        api: '/support/getRetailersForOrder',
        handleError: true,
        apiBase: 'deliverymanUrl',
        data: {
          delivery_order_id: data.orderId
        }
      })
      .then(json => {
        this.retailers = json.retailers
        this.setState({ loadingRetailers: false })
      })
    }

    assignNewRetailer(retailerId) {
      mountModal(ConfirmModal({
        heading: 'Confirm assign retailer',
        confirmMessage: 'Are you sure you want to assign this retailer to this order?',
        handleConfirm: () => {
          data.assignNewRetailerToOrder({
            delivery_order_id: data.orderId,
            retailer_id: retailerId
          })
          data.setLoading('loadingOrderDetail')
          unMountModal()
        }
      }))
    }

    render() {
      return (
        <ModalBox>
          <ModalHeader>{ data.heading }</ModalHeader>
            <ModalBody>
              <table>
                <thead>
                  <tr>
                    <td>ID</td>
                    <td>NAME</td>
                    <td style={{ textAlign: 'center' }}>Inventory available</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {
                    !this.state.loadingRetailers && this.retailers &&
                    this.retailers.map((item, i) => {
                      return (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.org_name}</td>
                          <td style={{ textAlign: 'center' }}>{item.check ? 'Yes' : 'No' }</td>
                          <td>
                            <button
                              onClick={() => { this.assignNewRetailer(item.id) }}
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
                  {
                    this.state.loadingRetailers &&
                    'Loading...'
                  }
                  {
                    !this.state.loadingRetailers && (!this.retailers || !this.retailers.length) &&
                    'No retailers available'
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
