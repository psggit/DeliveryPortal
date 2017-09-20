import React from 'react'
import '@sass/components/_Toggle-button.scss'

class ToggleButton extends React.Component {
  constructor(props) {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.toggle = this.toggle.bind(this)
    this.state = {
      toggled: props.autoPilotStatus
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ toggled: nextProps.autoPilotStatus })
  }
  toggle(success) {
    this.setState({ toggled: success })
  }
  handleChange(e) {
    this.props.autoPilot(e.target.checked, this.toggle)
  }
  render() {
    return (
      <div className="toggle">
        <input type="checkbox" checked={this.state.toggled} onChange={this.handleChange} />
        <span className="toggle-switch"></span>
        <span className="bg"></span>
      </div>
    )
  }
}

export default ToggleButton