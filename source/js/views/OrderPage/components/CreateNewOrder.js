import React from 'react'
import SearchInput from '@components/SearchInput'
import '@sass/create-new-order.scss'
import * as Actions from './../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import createHistory from 'history/createBrowserHistory'
import AddressList from './AddressList';
import InventoryList from './InventoryList'
import Geocode from 'react-geocode'
import { mountModal, unMountModal } from '@components/ModalBox/utils'
import ConfirmModal from '@components/ModalBox/ConfirmModal'
import showCatalogue from './ShowCatalogue'
import { getIcon } from './../utils'

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
  }

  setPhoneNumber(phoneNumber) {
    this.phoneNumber = phoneNumber
  }

  setAddressId(addressId) {
    this.addressId = addressId
  }

  setGPS(gps) {
    this.gps = gps
  }

  getCustomerDetails(query) {
    this.props.actions.fetchCustomerDetails({
      query,
      offset: 0,
      limit: 9999
    })
    this.setPhoneNumber(query)
    history.push(`/home/orders/customer-search?q=${query}`, null)
  }

  clearSearchResults() {
    const { currentRoute } = this.state
    history.push(`/home/orders/${currentRoute}`, null)
  }


  fetchInventoryList(gps, addressId) {
    this.setAddressId(addressId)
    this.setGPS(gps)
    mountModal(showCatalogue({
      heading: 'Browse catalogue',
      gps,
      addItemToCart: this.increaseProductQuantity
    }))
    this.showCart = true
  }

  addItemToCart(cartItem, brand) {
   
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
      cartItem.brand = brand
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
  
  increaseProductQuantity(item, brand) {
    mountModal(ConfirmModal({
      heading: 'Add item to cart',
      confirmMessage: 'Are you sure you want to add this product?',
      handleConfirm: () => {
        this.addItemToCart(item, brand)
        this.setState({ orderedItems: this.orderedList })
        unMountModal()
      }
    }))
  }



  decreaseProductQuantity(id) {
    mountModal(ConfirmModal({
      heading: 'Delete item from cart',
      confirmMessage: 'Are you sure you want to delete this product?',
      handleConfirm: () => {
        this.removeItemFromCart(id)
        this.setState({ orderedItems: this.orderedList })
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
                  onClick={() => { this.increaseProductQuantity(item, item.brand) }}
                  style={{
                    cursor: 'pointer'
                  }}>
                  {getIcon('plus')}
                </span>
              </div>
            </div>
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
            <AddressList data={this.props.data.customerDetails} handleClick={this.fetchInventoryList}></AddressList>
            : ''
          }
          {
            !this.props.data.loadingCustomerDetails && 
            Object.keys(this.props.data.customerDetails).length === 0
            ?
            <button> Add address </button>
            : ''
          }
          {
            this.showCart
            &&
            <div className="cart">
              <div className="header">ORDER</div>
              <div className="cart-body"> 
                <div className="subheader">
                  <div className="title">Ordered Items ({this.orderedListItemDetails.length})</div>
                  <button onClick={() => this.fetchInventoryList(this.state.gps, '')}> Add item </button>
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