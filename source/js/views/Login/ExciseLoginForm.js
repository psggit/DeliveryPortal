import React from 'react'
import "whatwg-fetch"
import '@sass/login.scss'
import { Api } from './../../utils/config'
import PhoneField from './PhoneField'
import OTPField from './OTPField'

class ExciseLoginForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isSubmitting: false,
      showError: false,
      error: false,
      username: '',
      password: '',
      activeForm: 'form1',
      phone: null
    }
    this.handleNext = this.handleNext.bind(this)
    this.setPhoneNo = this.setPhoneNo.bind(this)
  }

  handleNext() {
    this.setState({ activeForm: 'form2' })
  }

  setPhoneNo(phone) {
    this.setState({ phone })
  }

  render () {
    const { isSubmitting, showError, error, activeForm, phone } = this.state
    const { createSession } = this.props
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
           <div>
            <PhoneField
              Api={Api}
              style={style}
              activeForm={activeForm}
              handleNext={this.handleNext}
              setPhoneNo={this.setPhoneNo}
            />
            <OTPField
              Api={Api}
              createSession={createSession}
              style={style}
              activeForm={activeForm}
              phone={phone}
            />
           </div>
        </div>
      </div>
    )
  }
}

export default ExciseLoginForm
