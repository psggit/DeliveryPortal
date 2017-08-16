import React from 'react'
import "whatwg-fetch"
import '@sass/login.scss'

class LoginForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isSubmitting: false,
      showError: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handlePress = this.handlePress.bind(this)
  }

  componentWillMount() {
    if (localStorage.getItem('_hipbaru')) location.href = '/orders'
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handlePress(e) {
    if (e.keyCode === 13) this.handleSubmit()
  }

  handleSubmit () {
    const { username, password } = this.state
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
      mode: 'cors',
      body: JSON.stringify(formData)
    }

    // {username: "bala_admin", password: "bala_admin"}

    this.setState({isSubmitting: true})

    fetch('https://auth.hearsay81.hasura-app.io/login', fetchOptions)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status)
          _self.setState({ isSubmitting: false })
          return
        }
        response.json().then(function(data) {
          localStorage.setItem('_hipbaru', JSON.stringify(data))
          location.href = '/orders'
        })
      }
    )
  .catch(function(err) {
    console.log('Fetch Error :-S', err)
    _self.setState({ isSubmitting: false })
  })
  }
  render () {
    const { isSubmitting, showError } = this.state
    const style = isSubmitting
                  ? { cursor: 'progress', opacity: '0.5'}
                  : { cursor: 'pointer', opacity: '1' }

    return (
      <div className='form-wrapper'>
        <div className='form-group'>
          <label>Email</label><br/>
          <input
            type='text'
            onChange={this.handleChange}
            onKeyDown={this.handlePress}
            name='username'
          />
        </div>
        <div className='form-group'>
          <label>Password</label><br/>
          <input
            type='password'
            onChange={this.handleChange}
            onKeyDown={this.handlePress}
            name='password'
          />
        </div>
        <button
          className='form-group btn btn-green btn-lg'
          style={style} onClick={this.handleSubmit}>
          Login
        </button>
      </div>
    )
  }
}

export default LoginForm
