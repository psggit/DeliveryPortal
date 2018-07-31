import React from 'react'
import ModalHeader from '@components/ModalBox/ModalHeader'
import ModalFooter from '@components/ModalBox/ModalFooter'
import ModalBody from '@components/ModalBox/ModalBody'
import ModalBox from '@components/ModalBox'
import Geocode from 'react-geocode'

import '@sass/new-address.scss'

const KEY ='AIzaSyDpG-NeL-XGYAduQul2JenVr86HIPITEso'

export default function NewAddress(data) {
  return class NewAddress extends React.Component {
    
    constructor() {

      super()

      this.address = ''
      this.flatNumber = ''
      this.addressType = ''
      this.landmark = ''
    }

    saveAddress(e) {
      Geocode.setApiKey(KEY);
 
      Geocode.fromAddress("Eiffel Tower").then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
          console.log(lat, lng);
        },
        error => {
          console.error(error);
        }
      );
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
                        <input className="address" type="text" />
                      </div>
                      <div className="input-field">
                        <div className="label">FLAT NO</div>
                        <input className="flat-number" type="text" />
                      </div>
                      <div className="input-field">
                        <div className="label">LANDMARK</div>
                        <input className="landmark" type="text" />
                      </div>
                      <div className="address-type input-field">
                        <div className="label">TYPE</div>
                        <div className="type"> 
                          <input type="radio" name="type" />
                          <div> HOME </div>
                        </div>
                        <div className="type"> 
                          <input type="radio" name="type" />
                          <div> OFFICE </div>
                        </div>
                        <div className="type"> 
                          <input type="radio" name="type" />
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
              <button onClick={data.goBack}> Back </button>
              <button onClick={data.saveAddress}> Continue </button>
            </div>
          </ModalFooter>
        </ModalBox>
      )
    }
  }
}

//export default NewAddress