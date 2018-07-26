import React from 'react'
import SearchInput from '@components/SearchInput'
import '@sass/create-new-order.scss'
import * as Actions from './../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import createHistory from 'history/createBrowserHistory'
import AddressList from './AddressList';

const history = createHistory()

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
  }

  setPhoneNumber(e) {
    this.setState({ phoneNumber: e.target.value })
  }

  getCustomerDetails(query) {
    this.props.actions.fetchCustomerDetails({
      query,
      offset: 0,
      limit: 40
    })
    history.push(`/home/orders/customer-search?q=${query}`, null)
  }

  clearSearchResults() {
    const { currentRoute } = this.state
    history.push(`/home/orders/${currentRoute}`, null)
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
        { 
          !this.props.data.loadingCustomerDetails
          &&
          <AddressList data={this.props.data.customerDetails}></AddressList>
        }
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