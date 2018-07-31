import React from 'react'
import ModalHeader from '@components/ModalBox/ModalHeader'
import ModalFooter from '@components/ModalBox/ModalFooter'
import ModalBody from '@components/ModalBox/ModalBody'
import ModalBox from '@components/ModalBox'
import Geocode from 'react-geocode'
import * as Actions from './../actions'

import '@sass/new-address.scss'

const KEY ='AIzaSyDpG-NeL-XGYAduQul2JenVr86HIPITEso'

export default function NewAddress(data) {
  return class NewAddress extends React.Component {

    constructor(props) {

      super(props)

      this.state = {
        address: '',
        flatNumber: '',
        addressType: '',
        landmark: ''
      }
      this.inputChange = this.inputChange.bind(this)
      this.getFormValue = this.getFormValue.bind(this)
      //this.validateAddress = this.validateAddress.bind(this)
    }

    inputChange(e, value) {
      this.setState({
          [e.target.name]: value
      })
    }

    getFormValue() {
      const formValues = {
        address: this.state.address,
        flatNumber: this.state.flatNumber,
        addressType: this.state.addressType,
        landmark: this.state.landmark
      }
      data.handleClick(formValues)
    }

    render() {
      return(
        <ModalBox>
          <ModalHeader> Add delivery address </ModalHeader>
          <ModalBody> 
            <table>
              <tbody>
                <tr>
                  <td colSpan="4">
                    <div className="new-address-container">
                      <div className="input-field">
                        <div className="label">ADDRESS</div>
                        <input name="address" className="address" type="text" value={this.state.address} onChange={(e) => this.inputChange(e, e.target.value)}/>
                      </div>
                      <div className="input-field">
                        <div className="label">FLAT NO</div>
                        <input name="flatNumber" className="flat-number" type="text" value={this.state.flatNumber} onChange={(e) => this.inputChange(e, e.target.value)}/>
                      </div>
                      <div className="input-field">
                        <div className="label">LANDMARK</div>
                        <input name="landmark" className="landmark" type="text" value={this.state.landmark} onChange={(e) => this.inputChange(e, e.target.value)}/>
                      </div>
                      <div className="address-type input-field">
                        <div className="label">TYPE</div>
                        <div className="type"> 
                          <input type="radio" name="addressType" value={this.state.addressType} onClick={(e) => this.inputChange(e, "HOME")}/>
                          <div> HOME </div>
                        </div>
                        <div className="type"> 
                          <input type="radio" name="addressType" value={this.state.addressType} onClick={(e) => this.inputChange(e, "OFFICE")}/>
                          <div> OFFICE </div>
                        </div>
                        <div className="type"> 
                          <input type="radio" name="addressType" value={this.state.addressType} onClick={(e) => this.inputChange(e, "OTHER")}/>
                          <div> OTHER </div>
                        </div>
                      </div>  
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </ModalBody>
          <ModalFooter>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <button onClick={() => this.getFormValue()}> Continue </button>
            </div>
          </ModalFooter>
        </ModalBox>
      )
    }
  }
}

//export default NewAddress