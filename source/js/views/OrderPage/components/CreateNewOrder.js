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
import '@sass/consumer-details.scss'
import { getQueryObj } from '@utils/url-utils'

const KEY = 'AIzaSyDpG-NeL-XGYAduQul2JenVr86HIPITEso'

const history = createHistory()

class CreateNewOrder extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isSubmitting: false,
      currentRoute: location.pathname.split('/')[3] || 'live',
      orderedItems: [],
      searchQuery: getQueryObj(location.search.slice(1)).q,
      addressId: ''
    }

    this.showCartItems = false
    this.phoneNumber = ''
    this.gps = ''
    //this.addressId = ''
    this.address = ''
    this.orderedList = []
    this.orderedListItemDetails = []

    this.getCustomerDetails = this.getCustomerDetails.bind(this)
    this.clearSearchResults = this.clearSearchResults.bind(this)
    this.fetchInventoryList = this.fetchInventoryList.bind(this)
    this.addItemToCart = this.addItemToCart.bind(this)
    this.increaseProductQuantity = this.increaseProductQuantity.bind(this)
    this.decreaseProductQuantity = this.decreaseProductQuantity.bind(this)
    this.removeItemFromCart = this.removeItemFromCart.bind(this)
    this.placeOrder = this.placeOrder.bind(this)
    this.renderAddressList = this.renderAddressList.bind(this)

  }

  componentDidMount() {

    if (location.search) {

      const data = getQueryObj(location.search.slice(1))
      const phoneNo = data.q
      const addressId = data.address_id

      this.setPhoneNumber(phoneNo)
      if(addressId) {
        this.setState({ addressId: parseInt(addressId) })
      }    
      this.props.actions.fetchCustomerDetails({
        mobile: phoneNo
      })
    }

  }

  setPhoneNumber(phoneNumber) {
    this.phoneNumber = phoneNumber
  }

  setAddress(address) {
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
    if (this.gps) {
      mountModal(showCatalogue({
        heading: 'Browse catalogue',
        gps: this.gps,
        addItemToCart: this.increaseProductQuantity
      }))
      this.showCartItems = true
    } else {
      this.props.data.customerDetails.addresses.map((item) => {
        if(item.address_id === this.state.addressId) {
          this.setAddress(item.address)
          this.setGPS(item.gps)
        }
      })
    }
  }

  addItemToCart(cartItem) {

    let foundItem = false

    this.orderedList.map((item) => {
      if (item.product_id === cartItem.id) {
        item.count += 1
        foundItem = true;
      }
    })

    this.orderedListItemDetails.map((item) => {
      if (item.id === cartItem.id) {
        item.quantity += 1
        foundItem = true;
      }
    })

    if (!foundItem) {
      let order = {
        product_id: cartItem.id,
        type: cartItem.type,
        count: 1
      }
      cartItem.quantity = 1
      this.orderedList.push(order)
      this.orderedListItemDetails.push(cartItem)
    }
  }

  removeItemFromCart(id) {
    let foundItem = false

    this.orderedList.map((item) => {
      if (item.product_id === id && item.count > 1) {
        item.count -= 1
        foundItem = true;
      }
    })

    this.orderedListItemDetails.map((item) => {
      if (item.id === id && item.quantity > 1) {
        item.quantity -= 1
        foundItem = true;
      }
    })

    if (!foundItem) {
      this.orderedList = this.orderedList.filter((item) => {
        if (item.product_id !== id) {
          return item
        }
      })

      this.orderedListItemDetails = this.orderedListItemDetails.filter((item) => {
        if (item.id !== id) {
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
      address_id: this.state.addressId,
      order_type: "delivery",
      products: this.state.orderedItems
    })
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

    this.orderedList = []
    this.orderedListItemDetails = []
    this.showCartItems = false;

    this.setState({ orderedItems: [] })

    if (gps && addressId && address) {
      this.setState({ addressId })
      this.setAddress(address)
      this.setGPS(gps)
    }

  }

  handleChange(e) {
    this.setState({
      addressId: parseInt(e.currentTarget.value)
    });
  }

  renderAddressList() {
    if (this.props.data.customerDetails.addresses.length) {
      return this.props.data.customerDetails.addresses.map((item, i) => {
        return (
          <React.Fragment>
            <label className="address" for={item.address_id} onClick={() => this.inputChange(item.gps, item.address_id, item.address)}>
              <input id={item.address_id} name="consumer-address" type="radio" value={item.address_id} checked={this.state.addressId === item.address_id} onChange={(e) => this.handleChange(e)} />
              {item.address}
            </label>
          </React.Fragment>
        )
      })
    } else {
      return <div className="notification-message">No addresses available!</div>
    }
  }

  render() {

    return (
      <React.Fragment>
        <SearchInput
          clearSearch={this.clearSearchResults}
          search={this.getCustomerDetails}
          placeholder='Phone number'
          searchQuery={this.state.searchQuery}
          maxLength={10}
        />
        <div className="new-order-container" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
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
                      <span>ADDRESS:</span>
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
            this.showCartItems &&
            <div className="cart">
              <div className="header">ORDER</div>
              <div className="cart-body">
                <div className="subheader">
                  <div className="title">Ordered Items ({this.orderedListItemDetails.length})</div>
                  <button  onClick={() => this.fetchInventoryList()}> Add item </button>
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
            !this.showCartItems
            &&
            <div className="cart">
              <div className="header">ORDER</div>
              <div className="cart-body">
                <div className="subheader">
                  <div className="title">Ordered Items ({this.orderedListItemDetails.length})</div>
                  {
                    this.state.addressId &&
                    <button onClick={() => this.fetchInventoryList()}> Add item </button>
                  }
                </div>
                <div className="cart-items">
                  <div className="notification-message">{this.state.addressId ? 'Cart is empty!' : 'Select delivery address'}</div>
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
    data: state.OrderPage
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