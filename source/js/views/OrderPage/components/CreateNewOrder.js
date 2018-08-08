import React from 'react'
import SearchInput from '@components/SearchInput'
import * as Actions from './../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { mountModal, unMountModal } from '@components/ModalBox/utils'
import ConfirmModal from '@components/ModalBox/ConfirmModal'
import showCatalogue from './ShowCatalogue'
import { getIcon } from './../utils'
import { getQueryObj } from '@utils/url-utils'
import CartSummary from './CartSummary';
//import { Repeat } from 'immutable';

import Card from '@components/Card'
import CardHeader from '@components/Card/CardHeader'
import CardSubheader from '@components/Card/CardSubheader'
import CardBody from '@components/Card/CardBody'
import CardFooter from '@components/Card/CardFooter'

const history = createHistory()

class CreateNewOrder extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      // isSubmitting: false,
      currentRoute: location.pathname.split('/')[3] || 'live',
      orderedItems: [],
      searchQuery: getQueryObj(location.search.slice(1)).q,
      //phoneNo: '',
      addressId: '',
      credits: '',
      validatingCart: false,
      // isSubmittingOrder: false
    }

    this.showCartItems = false
    this.phoneNo = ''
    this.gps = ''
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
    this.checkout = this.checkout.bind(this)

  }

  componentDidMount() {

    if (location.search) {

      const data = getQueryObj(location.search.slice(1))
      const phoneNo = data.q
      const addressId = data.address_id
      //this.setState({phoneNo})
      this.setPhoneNumber(phoneNo)
      if(addressId) {
        this.setState({ addressId: parseInt(addressId) })
      }    
      this.props.actions.fetchCustomerDetails({
        mobile: phoneNo
      })
    }

  }

  componentWillReceiveProps(newProps) {
    if(Object.keys(newProps.data.customerDetails).length > 0) {
      this.setState({credits: newProps.data.customerDetails.consumer_details.available_credits})
    }
  }

  setPhoneNumber(phoneNo) {
    this.phoneNo = phoneNo
    //this.setState({phoneNo})
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
    unMountModal()
    // this.setState({isSubmittingOrder : true })
    this.props.actions.placeOrder({
      mobile: this.phoneNo,
      address_id: this.state.addressId,
      order_type: "delivery",
      products: this.state.orderedItems
    })
  }

  renderCartItems() {
    return this.orderedListItemDetails.map((item) => {
      return <div className="card-item" style={{ height: 'auto', textAlign: 'center'}}>
        <div style={{width: '30%',textAlign: 'center',fontWeight: '600'}}> {item.brand} </div>
        <div style={{width: '25%',textAlign: 'center',fontWeight: '600'}}> {item.volume} </div>
        <div style={{width: '25%',textAlign: 'center',fontWeight: '600'}}> {item.price} </div>
        <div style={{width: '20%',textAlign: 'center',fontWeight: '600'}}>
          <span
            onClick={() => { this.decreaseProductQuantity(item.id) }}
            style={{
              cursor: 'pointer',
              margin: '0px 10px 0px 10px',
              textAlign: 'center'
            }}>
            {getIcon('minus')}
          </span>
          {item.quantity}
          <span
            onClick={() => { this.increaseProductQuantity(item) }}
            style={{
              cursor: 'pointer',
              margin: '0px 10px 0px 10px',
              textAlign: 'center'
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

  mountOrderSummaryModal(response) {

    if(this.props.data.customerDetails.consumer_details.available_credits !== response.total_credits) {
      this.setState({credits: response.total_credits})
    }
    
    if(response.delivery_possible) {
      mountModal(CartSummary({
        cartTotal: response.cart_total,
        total: response.total,
        deliveryFee: response.delivery_fee,
        cartItems: this.orderedListItemDetails,
        handleClick: this.placeOrder
      }))
    }
  }

  checkout() {
    if(!this.state.validatingCart) {
      this.props.actions.validateOrder({
        mobile: this.phoneNo,
        address_id: this.state.addressId,
        order_type: "delivery",
        products: this.state.orderedItems
      }, (response) => this.mountOrderSummaryModal(response))
      this.setState({validatingCart : true })
    }
  }

  renderAddressList() {
    if (this.props.data.customerDetails.addresses.length) {
      return this.props.data.customerDetails.addresses.map((item, i) => {
        return (
          <React.Fragment>
            <label for={item.address_id} onClick={() => this.inputChange(item.gps, item.address_id, item.address)}>
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
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
          {
            !this.props.data.loadingCustomerDetails &&
            Object.keys(this.props.data.customerDetails).length > 0
            &&
            <Card style={{ width: '50%'}}>
              <CardHeader>CONSUMER</CardHeader>
              <CardBody style={{height: 'calc(100% - 42px - 20px)'}}>
                  <div className="card-item">
                    <span> NAME:</span>
                    <div className="card-value"> {this.props.data.customerDetails.consumer_details.consumer_name} </div>
                  </div>
                  <div className="card-item">
                    <span>CREDITS:</span>
                    <div className="card-value">{this.state.credits} </div>
                  </div>
                  <div style={{height: 'calc(100% - 80px)'}}>
                    <div className="card-item">
                      <span style={{width: '100%'}}>ADDRESS:</span>
                    </div>
                    <div className="card-body-content" style={{height: 'calc(100% - 40px)',  padding: '10px', border: '1px solid #f6f6f6'}}>
                      {this.renderAddressList()}
                    </div>
                  </div>
              </CardBody>
            </Card>
        }
          {
            !this.props.data.loadingCustomerDetails &&
            Object.keys(this.props.data.customerDetails).length > 0 &&
            this.showCartItems &&
            <Card style={{ width: '46%'}}>
              <CardHeader>ORDER</CardHeader>
              <CardSubheader>
                <div>Ordered Items ({this.orderedListItemDetails.length})</div>
                <button  onClick={() => this.fetchInventoryList()}> Add item </button>
              </CardSubheader>
              <CardBody style={{height: 'calc(100% - 42px - 60px - 20px - 60px)'}}>
                <React.Fragment>
                  <div className="card-body-header">
                    <div style={{width: '30%',textAlign: 'center',fontWeight: '600'}}> Brand </div>
                    <div style={{width: '25%',textAlign: 'center',fontWeight: '600'}}> Volume </div>
                    <div style={{width: '25%',textAlign: 'center',fontWeight: '600'}}> Price </div>
                    <div style={{width: '20%',textAlign: 'center',fontWeight: '600'}}> Quantity </div>
                  </div>
                  <div className="card-body-content" style={{height: 'calc(100% - 40px)'}}>
                    {this.renderCartItems()}
                  </div>
                </React.Fragment>
              </CardBody>
              <CardFooter>
                <button className={this.state.validatingCart ? 'disable' : ''} onClick={() => this.checkout()}> CHECKOUT </button>
              </CardFooter>
            </Card>

          }
          {
            !this.props.data.loadingCustomerDetails &&
            Object.keys(this.props.data.customerDetails).length > 0 &&
            !this.showCartItems
            &&
            <Card style={{ width: '46%'}}>
              <CardHeader>ORDER</CardHeader>
              <CardSubheader>
                <div>Ordered Items ({this.orderedListItemDetails.length})</div>
                {
                  this.state.addressId &&
                  <button onClick={() => this.fetchInventoryList()}> Add item </button>
                }
              </CardSubheader>
              <CardBody style={{height: 'calc(100% - 42px - 60px - 20px)'}}>
                <div className="card-body-content">
                  <div className="notification-message">{this.state.addressId ? 'Cart is empty!' : 'Select delivery address'}</div>
                </div>
              </CardBody>
            </Card>
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