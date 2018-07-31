import React from 'react'
import ModalHeader from '@components/ModalBox/ModalHeader'
import ModalFooter from '@components/ModalBox/ModalFooter'
import ModalBody from '@components/ModalBox/ModalBody'
import ModalBox from '@components/ModalBox'
import { Gmaps, Marker, InfoWindow } from 'react-gmaps'

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
      this.saveAddress = this.saveAddress.bind(this)
    }

    componentDidMount() {
      // const geocoder = new google.maps.Geocoder()
      // console.log(geocoder)
    }

    saveAddress() {

      console.log("state", this.state);
      // Geocode.setApiKey(KEY);
 
      // Geocode.fromAddress("Eiffel Tower").then(
      //   response => {
      //     const { lat, lng } = response.results[0].geometry.location;
      //     console.log(lat, lng);
      //   },
      //   error => {
      //     console.error(error);
      //   }
      // );
    }

    inputChange(e) {

      this.setState({
          [e.target.name]: e.target.value
      })

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
                        <input name="address" className="address" type="text" value={this.state.address} onChange={this.inputChange}/>
                      </div>
                      <div className="input-field">
                        <div className="label">FLAT NO</div>
                        <input name="flatNumber" className="flat-number" type="text" value={this.state.flatNumber} onChange={this.inputChange}/>
                      </div>
                      <div className="input-field">
                        <div className="label">LANDMARK</div>
                        <input name="landmark" className="landmark" type="text" value={this.state.landmark} onChange={this.inputChange}/>
                      </div>
                      <div className="address-type input-field">
                        <div className="label">TYPE</div>
                        <div className="type"> 
                          <input type="radio" name="type" value={this.state.type} onChange={this.inputChange}/>
                          <div> HOME </div>
                        </div>
                        <div className="type"> 
                          <input type="radio" name="type" value={this.state.type} onChange={this.inputChange}/>
                          <div> OFFICE </div>
                        </div>
                        <div className="type"> 
                          <input type="radio" name="type" value={this.state.type} onChange={this.inputChange}/>
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
              <button onClick={this.saveAddress}> Continue </button>
            </div>
          </ModalFooter>
        </ModalBox>
      )
    }
  }
}

//export default NewAddress