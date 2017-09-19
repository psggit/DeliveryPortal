import React from 'react'
import "whatwg-fetch"
import '@sass/login.scss'
import { Api } from './../../utils/config'

class LoginForm extends React.Component {
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

  componentWillMount() {
    if (!location.href.split('/')[3].length) history.pushState(null, null, '/login')
    if (localStorage.getItem('_hipbaru')) location.href = '/orders'
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

  getHasuraRole(data) {
    const hasuraRoles = data.hasura_roles
    // const hasuraRoles = ["user", "support_person", "excise", "support_admin"]
    const rolesMap = {
      "user": 1,
      "admin": 6,
      "support_person": 3,
      "support_admin": 5,
      "support_team_leader": 4,
      "excise_person": 2
    }
    let maxRole = rolesMap["user"]
    let xHasuraRole = "user"
    for(let i=0; i<hasuraRoles.length; i++) {
      if (maxRole < rolesMap[hasuraRoles[i]]) {
        maxRole = rolesMap[hasuraRoles[i]]
        xHasuraRole = hasuraRoles[i]
      }
    }
    return xHasuraRole
  }

  getAuthToken(data) {
    const token = data.auth_token
    return token
  }

  getHasuraId(data) {
    const hasuraId = data.hasura_id
    return hasuraId
  }

  setCookie(cname, cvalue, exdays = 365) {
    const d = new Date()
    d.setTime(d.getTime() + (exdays*24*60*60*1000))
    const expires = "expires=" + d.toUTCString()
    document.cookie = `${cname}=${cvalue}; ${expires}`
  }

  createSession(data) {
    localStorage.setItem('x-hasura-role', this.getHasuraRole(data))
    localStorage.setItem('auth-token', this.getAuthToken(data))
    localStorage.setItem('hasura-id', this.getHasuraId(data))
    // this.setCookie('dinoisses', this.getAuthToken(data))
    // function getCookie(cname) {
    //   var name = cname + "="
    //   var ca = document.cookie.split(';')
    //   for(var i=0; i<ca.length; i++) {
    //       var c = ca[i]
    //       while (c.charAt(0)==' ') c = c.substring(1)
    //       if (c.indexOf(name) == 0) return c.substring(name.length,c.length)
    //   }
    //   return ""
    // }
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
          localStorage.setItem('_hipbaru', JSON.stringify(data))
          _self.createSession(data)
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

export default LoginForm
