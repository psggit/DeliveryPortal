import React from 'react'
import "whatwg-fetch"
import '@sass/login.scss'
import { Api } from './../../utils/config'

class SupportLoginForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isSubmitting: false,
      showError: false,
      error: false,
      username: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handlePress = this.handlePress.bind(this)
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value, error: false })
  }

  handlePress(e) {
    const { username, password } = this.state
    if (username.length && password.length) {
      if (e.keyCode === 13) this.handleSubmit()
    }
  }

  handleSubmit () {
    const { username, password } = this.state
    const { createSession } = this.props
    const formData = {
      username,
      password
    }
    const { api } = this.props
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

    fetch(`${Api.authUrl}/login`, fetchOptions)
    .then(
      function(response) {
        console.log(response.headers)
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status)
          _self.setState({ isSubmitting: false, error: true })
          return
        }
        response.json().then(function(data) {
          createSession(data)
          location.href = '/home/orders/live'
        })
      }
    )
  .catch(function(err) {
    console.log('Fetch Error :-S', err)
    _self.setState({ isSubmitting: false })
  })
  }
  render () {
    const { isSubmitting, showError, error } = this.state
    const style = isSubmitting
                  ? { cursor: 'progress', opacity: '0.5', boxShadow: '0 2px 4px 0 #333'}
                  : { cursor: 'pointer', opacity: '1', boxShadow: '0 2px 4px 0 #333'}

    return (
      <div id='login'>
        <div className='form-container'>
          <div className='login-header'>
            <img src='https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAA1JAAAAJGI0MjhiMjNhLTcyYzctNGQyYi1hNjlmLTM5MTU0MWZmMzA4MQ.png'/>
            <span>Login</span>
          </div>
          <div className='form-wrapper'>
            <div className='form-group'>
              <label>EMAIL</label><br/>
              <input
                type='text'
                onChange={this.handleChange}
                onKeyDown={this.handlePress}
                name='username'
              />
            </div>
            <div className='form-group'>
              <label>PASSWORD</label><br/>
              <input
                type='password'
                onChange={this.handleChange}
                onKeyDown={this.handlePress}
                name='password'
              />
            </div>
            <button
              disabled={isSubmitting}
              className='form-group btn btn-black btn-lg'
              style={style} onClick={this.handleSubmit}>
              Login
            </button>
          </div>
          { error ? <p className='errorLogin'>Wrong username or password</p> : ''}
        </div>
      </div>
    )
  }
}

export default SupportLoginForm
