import React from 'react'
import SupportLoginForm from './SupportLoginForm'
import ExciseLoginForm from './ExciseLoginForm'
import { createSession } from './utils'

class Login extends React.Component {
  constructor() {
    super()
  }
  // componentWillMount() {
  //   if (!location.href.split('/')[3].length) history.pushState(null, null, '/login')
  // }

  render() {
    const subdomain = window.location.hostname.split('.')[0]

    return (
      <div>
        {
            subdomain == 'excise'
            ? <ExciseLoginForm createSession={createSession} />
            : <SupportLoginForm createSession={createSession} />
        }
      </div>
    )
  }
}

export default Login
