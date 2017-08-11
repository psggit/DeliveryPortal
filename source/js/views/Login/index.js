import React from 'react'
// import { attachRippleEffectOnButttons } from './utils'
// import Session from "@utils/session"
// import { POST } from '@utils/request'

class LoginForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isSubmitting: false,
      showError: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (formData) {
    const { api } = this.props
    this.setState({isSubmitting: true})
    POST({
      url: api,
      data: formData,
      success: (res) => {
        this.setState({formState: false})
        // if (document.referrer && (document.referrer !== window.location.origin + '/') && !(document.referrer.indexOf('signup') > -1)) {
        //   Session.login(res, document.referrer)
        // } else {
        //   Session.login(res)
        // }
      },
      error: (res) => {
        this.setState({
          isSubmitting: false,
          showError: true
        })
      }
    })
  }
  render () {
    const { formState, isSubmitting, showError } = this.state
    const { regKey } = this.props
    return (
      <div>

      </div>
    )
  }
}

export default Right
