import React from 'react'
import "whatwg-fetch"

class OTPField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      otpErr: null,
      error: null,
      otp: '',
      isSubmitting: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handlePress = this.handlePress.bind(this)
  }

  handleChange(e) {
    this.setState({ otp: e.target.value, otpErr: false, error: false })
  }

  handleSubmit () {
    const { otp } = this.state
    const { createSession, phone } = this.props
    const formData = {
      mobile: phone,
      otp
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

    fetch(`https://gremlin.hearsay81.hasura-app.io/excise-person/auth/otp-login`, fetchOptions)
      .then(
        function(response) {
          console.log(response.headers)
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + response.status)
            _self.setState({ isSubmitting: false, error: true })
            return
          }
          response.json().then(function(data) {
            localStorage.setItem('_hipbaru', JSON.stringify(data))
            createSession(data)
            location.href = '/orders'
          })
        }
      )
    .catch(function(err) {
      console.log('Fetch Error :-S', err)
      _self.setState({ isSubmitting: false })
    })
  }
  
  handleClick() {
    const { otp } = this.state
    if (otp.length) {
      this.handleSubmit()
    } else {
      this.setState({ otpErr: true })
    }
  }

  handlePress(e) {
    const { otp } = this.state
    if (otp.length) {
      if (e.keyCode === 13) this.handleSubmit()
    }
  }

  render() {
    const { isSubmitting, error, otpErr } = this.state
    const { activeForm } = this.props
    return (
      <div style={activeForm !== 'form2' ? {display: 'none'} : {display: 'block'}}>
        <div className='form-wrapper'>
          <div className='form-group'>
            <label>OTP</label><br/>
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
            Submit
          </button>
        </div>
        { otpErr ? <p className='errorLogin'>Please enter OTP</p> : ''}
        { error ? <p className='errorLogin'>Incorret OTP.</p> : ''}
      </div>
    )
  }
}

export default OTPField