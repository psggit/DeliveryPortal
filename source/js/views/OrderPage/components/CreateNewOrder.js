import React from 'react'
import SearchInput from '@components/SearchInput'
import '@sass/create-new-order.scss'
import * as Actions from './../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { mountModal, unMountModal } from '@components/ModalBox/utils'
import ConfirmModal from '@components/ModalBox/ConfirmModal'
import showCatalogue from './ShowCatalogue'
import { getIcon } from './../utils'
import NewAddress from './NewAddress'
import '@sass/consumer-details.scss'
import Geocode from 'react-geocode'
import { GET, POST } from '@utils/fetch'


const KEY ='AIzaSyDpG-NeL-XGYAduQul2JenVr86HIPITEso'

const history = createHistory()

class CreateNewOrder extends React.Component {

  constructor(props) {
    super(props) 
    this.state = {
      isSubmitting : false,
      currentRoute: location.pathname.split('/')[3] || 'live',
      orderedItems: [],
    }

    this.showCart = false
    this.phoneNumber = ''
    this.gps = ''
    this.addressId = ''
    this.address = ''
    this.orderedList = []
    this.orderedListItemDetails = []
   
    this.showAddAddressModal = this.showAddAddressModal.bind(this)
    this.getCustomerDetails = this.getCustomerDetails.bind(this)
    this.clearSearchResults = this.clearSearchResults.bind(this)
    this.fetchInventoryList = this.fetchInventoryList.bind(this)
    this.addItemToCart = this.addItemToCart.bind(this)
    this.increaseProductQuantity = this.increaseProductQuantity.bind(this)
    this.decreaseProductQuantity = this.decreaseProductQuantity.bind(this)
    this.removeItemFromCart = this.removeItemFromCart.bind(this)
    this.placeOrder = this.placeOrder.bind(this)
    this.renderAddressList = this.renderAddressList.bind(this)
    this.getGPSFromAddress = this.getGPSFromAddress.bind(this)

    this.saveAddress = this.saveAddress.bind(this)
    this.validateAddress = this.validateAddress.bind(this)
  }

  componentDidMount() {
    if(location.search) {
      const phoneNo = location.search.split("=")[1]
      this.setPhoneNumber(phoneNo)
      this.props.actions.fetchCustomerDetails({
        mobile: phoneNo
      })
    }
  }

  setPhoneNumber(phoneNumber) {
    this.phoneNumber = phoneNumber
  }

  setAddress(addressId, address) {
    this.addressId = addressId
    this.address = address
  }

  setGPS(gps) {
    this.gps = gps
  }

  getCustomerDetails(query) {
    
    this.props.actions.fetchCustomerDetails({
      mobile: query
    })
    this.setPhoneNumber(query)
    history.push(`/home/orders/create-new-order?q=${query}`, null)
  }

  clearSearchResults() {
    const { currentRoute } = this.state
    history.push(`/home/orders/${currentRoute}`, null)
  }


  fetchInventoryList() {
  
    if(this.gps) {
      mountModal(showCatalogue({
        heading: 'Browse catalogue',
        gps: this.gps,
        addItemToCart: this.increaseProductQuantity
      }))
      this.showCart = true
    } else {
      const message = {
        heading: 'Error message',
        confirmMessage: 'Please select delivery address to list the products..'
      }
      this.showErrorNotification(message)
    }
    
  }

  addItemToCart(cartItem) {
   
    let foundItem = false

    this.orderedList.map((item) => {
      if(item.product_id === cartItem.id) {
          item.count += 1
          foundItem = true;
      } 
    })

    this.orderedListItemDetails.map((item) => {
      if(item.id === cartItem.id) {
        item.quantity += 1
        foundItem = true;
      } 
    })

    if(!foundItem) {
      let order = {
        product_id : cartItem.id,
        type : cartItem.type,
        count : 1
      }
      cartItem.quantity = 1
      this.orderedList.push(order)
      this.orderedListItemDetails.push(cartItem)
    }
  }

  removeItemFromCart(id) {
    let foundItem = false

    this.orderedList.map((item) => {
      if(item.product_id === id && item.count > 1) {
          item.count -= 1
          foundItem = true;
      } 
    })

    this.orderedListItemDetails.map((item) => {
      if(item.id === id && item.quantity > 1) {
        item.quantity -= 1
        foundItem = true;
      } 
    })

    if(!foundItem) {
      this.orderedList = this.orderedList.filter((item) => {
        if(item.product_id !== id) {
           return item
        } 
      })
  
      this.orderedListItemDetails = this.orderedListItemDetails.filter((item) => {
        if(item.id !== id) {
          return item
        } 
      })

    }
  }
  
  increaseProductQuantity(item) {
    this.addItemToCart(item)
    this.setState({ orderedItems: this.orderedList })
    unMountModal()
  }

  decreaseProductQuantity(id) {
    this.removeItemFromCart(id)
    this.setState({ orderedItems: this.orderedList })
    unMountModal()
  }

  showErrorNotification(messageObj) {
      mountModal(ConfirmModal({
        heading: messageObj.heading,
        confirmMessage: messageObj.confirmMessage,
        handleConfirm: () => {
          unMountModal()
        }
      }))
  }

  placeOrder() {
    this.props.actions.placeOrder({
      mobile: this.phoneNumber,
      address_id: this.addressId,
      order_type: "delivery",
      products: this.state.orderedItems
    })
  }

  showAddAddressModal() {
    mountModal(NewAddress({
      handleClick: this.getGPSFromAddress
    }))
  }

  renderCartItems() {
    return this.orderedListItemDetails.map((item) => {
      return <div className="cart-item">
              <div className="brand box-style"> {item.brand} </div>
              <div className="volume box-style"> {item.volume} </div>
              <div className="price box-style"> {item.price} </div>
              <div className="quantity box-style" > 
                <span
                  onClick={() => { this.decreaseProductQuantity(item.id) }}
                  style={{
                    cursor: 'pointer'
                  }}>
                  {getIcon('minus')}
                </span>
                  {item.quantity}
                <span
                  onClick={() => { this.increaseProductQuantity(item) }}
                  style={{
                    cursor: 'pointer'
                  }}>
                  {getIcon('plus')}
                </span>
              </div>
            </div>
    })
  }

  inputChange(gps, addressId, address) {
    if(gps && addressId && address){
      this.setAddress(addressId, address)
      this.setGPS(gps)
    }
  }

  renderAddressList() {
    if(this.props.data.customerDetails.addresses.length) {
      return  this.props.data.customerDetails.addresses.map((item, i) => {
        return (
                <React.Fragment>
                  <div className="address">
                    <input name="consumer-address" type="radio" value={item.address} onClick={() => this.inputChange(item.gps, item.address_id, item.address)}/>
                    <div> {item.address} </div>
                  </div>
                </React.Fragment>
              )
      })
    } else {
      return <div className="notification-message">No addresses available!</div>
    }
  }

  getGPSFromAddress(formValuesObj) {

    Geocode.setApiKey(KEY);
    //var self = this;
    Geocode.fromAddress(formValuesObj.address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        const data = Object.assign({}, formValuesObj)
        data.gps = `${lat},${lng}`
        this.validateAddress(data)
      },
      error => {
        console.error(error);
      }
    );

  }

  validateAddress(addressObj) {
    POST({
      api: `/consumer/delivery/address/check`,
      handleError: true,
      apiBase: 'blogicUrl',
      data: {
        gps: addressObj.gps
      }
    })
    .then((json) => {
      this.saveAddress(addressObj)
    })
    .catch((err) => {
      const message = {
        heading: 'Error message',
        confirmMessage: 'Address is not valid..'
      }
      this.showErrorNotification(message)
    })
  }

  saveAddress(addressObj) {
    POST({
      api: `/consumer/settings/address`,
      handleError: true,
      apiBase: 'blogicUrl',
      data: {
        address: addressObj.address,
        flat_number: addressObj.flatNumber,
        gps: addressObj.gps,
        landmark: addressObj.landmark,
        type: addressObj.addressType
      }
    })
    .then((json) => {
      this.getCustomerDetails(this.phoneNumber)
    })
    .catch((err) => {
      console.warning("Error in fetching consumer details", err)
    })

  }

  render() {
   
    return (
      <React.Fragment>
        <SearchInput
          clearSearch={this.clearSearchResults}
          search={this.getCustomerDetails}
          placeholder='Phone number'
          maxLength = {10}
        />
        <div className="new-order-container" style={{display: 'flex', justifyContent: 'space-between', marginTop: '30px'}}>
          {
            !this.props.data.loadingCustomerDetails && 
            Object.keys(this.props.data.customerDetails).length
            ? 
            <div className="consumer-details">
              <div className="header">CONSUMER</div>
              <div className="content">
                <div className="field">
                  <span> NAME:</span> 
                  <div className="field-value"> {this.props.data.customerDetails.consumer_details.consumer_name} </div>
                </div>
                <div className="field"> 
                  <span>CREDITS:</span> 
                  <div className="field-value">{this.props.data.customerDetails.consumer_details.available_credits} </div>
                </div>
                <div className="addresses-container"> 
                  <div className="field">
                    <span>SELECT DELIVERY ADDRESS:</span> 
                  </div>
                  <div className="addresses">
                    {this.renderAddressList()}
                  </div>
                  {/* <div className="add-address"><button onClick={this.showAddAddressModal}> Add address </button> </div> */}
                </div>
              </div>
            </div>
            : ''
          }
          {
            this.showCart &&
            <div className="cart">
              <div className="header">ORDER</div>
              <div className="cart-body"> 
                <div className="subheader">
                  <div className="title">Ordered Items ({this.orderedListItemDetails.length})</div>
                  <button onClick={() => this.fetchInventoryList(this.gps, this.addressId)}> Add item </button>
                </div>
                {
                  <React.Fragment>
                  <div className="cart-header">
                    <div className="brand box-style"> Brand </div>
                    <div className="volume box-style"> Volume </div>
                    <div className="price box-style"> Price </div>
                    <div className="quantity box-style"> Quantity </div>
                  </div>
                  <div className="cart-items">
                    {this.renderCartItems()}
                  </div>
                  <div className="place-order">
                    <button onClick={() => this.placeOrder()}> PLACE ORDER </button>
                  </div>
                  </React.Fragment>
                }
              </div>
              
            </div>
          }
          {
            !this.props.data.loadingCustomerDetails && 
            Object.keys(this.props.data.customerDetails).length &&
            !this.showCart
            &&
            <div className="cart"> 
            <div className="header">ORDER</div>
            <div className="cart-body"> 
              <div className="subheader">
                <div className="title">Ordered Items ({this.orderedListItemDetails.length})</div>
                <button onClick={() => this.fetchInventoryList(this.gps, this.addressId)}> Add item </button>
              </div>
              <div className="cart-items">
                <div className="notification-message">Cart is empty!</div>
              </div>
            </div>
          </div>
          }
        </div>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
      data : state.OrderPage
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateNewOrder)

//export default CreateNewOrder