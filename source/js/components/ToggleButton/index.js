import React from 'react'
import '@sass/components/_Toggle-button.scss'

class ToggleButton extends React.Component {
  render() {
    return (
      <div className="toggle">
        <input type="checkbox" />
        <span className="toggle-switch"></span>
        <span className="bg"></span>
      </div>
    )
  }
}

export default ToggleButton