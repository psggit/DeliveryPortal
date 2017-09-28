import React from 'react'
import LoginForm from './form'

class Login extends React.Component {
  componentWillMount() {
    if (!location.href.split('/')[3].length) history.pushState(null, null, '/login')
  }

  render() {
    const subUrl = 'excise'
    let fieldLabel1 = 'EMAIL'
    let fieldLabel2 = 'PASSWORD'

    if (subUrl !== 'excise') {
      fieldLabel1 = 'PHONE NO.'
      fieldLabel2 = 'OTP'
    }

    return (
      <div>
        {
          !localStorage.getItem('_hipbaru')
          ? <LoginForm
            fieldLabel1={fieldLabel1}
            fieldLabel2={fieldLabel2}
            />
          : location.href = '/orders'
        } 
      </div>
    )
  }
}

export default Login