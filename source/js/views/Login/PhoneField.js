import React from 'react'
import Notify from '@components/Notification'
import "whatwg-fetch"

class PhoneField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      phoneErr: null,
      phone: '',
      error: null,
      isSubmitting: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handlePress = this.handlePress.bind(this)
  }

  handleChange(e) {
    this.setState({ phone: e.target.value, phoneErr: false, error: false })
  }

  handlePress(e) {
    const { phone } = this.state
    if (phone.length) {
      if (e.keyCode === 13) this.handleSubmit()
    }
  }
  
  handleClick() {
    const { phone } = this.state
    if (phone.length) {
      this.handleSubmit()
    } else {
      this.setState({ phoneErr: true })
    } 
  }

  handleSubmit () {
    const { phone } = this.state
    const { handleNext, setPhoneNo, Api } = this.props
    const formData = {
      mobile: phone,
      otp: null
    }
    // const { api } = this.props
    const _self = this
    const fetchOptions = {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: "include",
      mode: 'cors',
      body: JSON.stringify(formData)
    }

    // {username: "bala_admin", password: "bala_admin"}

    this.setState({isSubmitting: true})

    fetch(`${Api.authUrl}/excise-person/auth/otp-login`, fetchOptions)
      .then(
        function(response) {
          console.log(response.headers)
          // if (response.status !== 200) {
          //   console.log('Looks like there was a problem. Status Code: ' + response.status)
          //   _self.setState({ isSubmitting: false, error: true })
          //   return
          // }
          response.json().then(function(data) {
            // localStorage.setItem('_hipbaru', JSON.stringify(data))
            // console.log(JSON.parse(data.data).message)
            if (data.message.indexOf('Permission') == -1) {
              Notify(JSON.parse(data.data).message)
              setPhoneNo(phone)
              handleNext()
            } else {
              Notify('Permission denied', 'warning')
            }
            // handleNext()
          })
        }
      )
    .catch(function(err) {
      console.log('Fetch Error :-S', err)
      _self.setState({ isSubmitting: false })
    })
  }

  render() {
    const { isSubmitting, error, phoneErr } = this.state
    const { activeForm } = this.props
    return (
      <div style={activeForm !== 'form1' ? {display: 'none'} : {display: 'block'}}>
        <div className='form-wrapper'>
          <div className='form-group'>
            <label>PHONE</label><br/>
            <input
              type='text'
              onChange={this.handleChange}
              onKeyDown={this.handlePress}
              name='username'
            />
          </div>
          <button
            disabled={isSubmitting}
            className='form-group btn btn-black btn-lg'
            style={this.props.style} onClick={this.handleClick}>
            Next
          </button>
        </div>
        { phoneErr ? <p className='errorLogin'>Please enter phone no.</p> : ''}
        { error ? <p className='errorLogin'>Incorrect phone no.</p> : ''}
      </div>
    )
  }
}

export default PhoneField