import React from 'react'
import './index.scss'

class Card extends React.Component {
  constructor() {
    super()
  }

  render() {
    return(
      <div id="CardContainer" style={this.props.style}>
        <div className="card">
          { this.props.children }
        </div>
      </div>
    )
  }
}

export default Card