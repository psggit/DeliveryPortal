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

const history = createHistory()

//const KEY = 'AIzaSyDpG-NeL-XGYAduQul2JenVr86HIPITEso'

class CreateNewOrder extends React.Component {

  constructor(props) {
    super(props) 
    this.state = {
      phoneNumber : '',
      isSubmitting : false,
      currentRoute: location.pathname.split('/')[3] || 'live'
    }
    this.setPhoneNumber = this.setPhoneNumber.bind(this)
    this.getCustomerDetails = this.getCustomerDetails.bind(this)
    this.clearSearchResults = this.clearSearchResults.bind(this)
    this.fetchInventoryList = this.fetchInventoryList.bind(this)
  }

  setPhoneNumber(e) {
    this.setState({ phoneNumber: e.target.value })
  }

  getCustomerDetails(query) {
    this.props.actions.fetchCustomerDetails({
      query,
      offset: 0,
      limit: 9999
    })
    history.push(`/home/orders/customer-search?q=${query}`, null)
  }

  // validateGeolocation(gps) {
  //   this.props.actions.fetchCustomerDetails({
  //     gps
  //   })
  // }

  clearSearchResults() {
    const { currentRoute } = this.state
    history.push(`/home/orders/${currentRoute}`, null)
  }

  // getLatitudeLongitude(address) {
  //   Geocode.setApiKey(KEY);
  //   // Enable or disable logs. Its optional.
  //   Geocode.enableDebug();
  //   Geocode.fromAddress(address).then(
  //     response => {
  //       const { lat, lng } = response.results[0].geometry.location;
  //       console.log(lat, lng);
  //     },
  //     error => {
  //       console.error(error);
  //     }
  //   );
  // }

  fetchInventoryList(gps) {
    this.props.actions.fetchInventoryList({
      from : 0,
      gps : gps,
      is_featured : false,
      km : "40km",
      size : 9999,
      stateName : "TN"
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
            !this.props.data.loadingInventoryList && 
            Object.keys(this.props.data.inventoryList).length
            ?
            <InventoryList data={this.props.data.inventoryList}></InventoryList>
            : ''
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