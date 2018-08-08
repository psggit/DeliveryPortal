import React from 'react'
import ModalHeader from '@components/ModalBox/ModalHeader'
import ModalFooter from '@components/ModalBox/ModalFooter'
import ModalBody from '@components/ModalBox/ModalBody'
import ModalBox from '@components/ModalBox'
import { unMountModal } from '@components/ModalBox/utils'
import '@sass/OrdersPage/ShowNotified.scss'
import Moment from 'moment'

export default function showNotified (data) {
  return class showNotified extends React.Component {
    constructor () {
      super()
    }
    render () {
      return (
        <ModalBox>
          <ModalHeader>{ data.heading }</ModalHeader>
            <ModalBody>
              <table>
                <thead>
                  <tr>
                    <td>Id</td>
                    <td>Name</td>
                    <td>Notified at</td>
                    <td>Status</td>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.content.map((item, i) => {
                      return (
                        <tr key={`notified-retailer-${i}`}>
                          <td>{item.retailer_id}</td>
                          <td>{item.retailer_name}</td>
                          <td>{Moment(item.notified_at).format('MMM, Do, YY, h:mm a')}</td>
                          <td>{item.status}</td>
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
