import React from 'react'

class CardBody extends React.Component {
  render() {
    return(
      <div className="card-body" style={this.props.style}>
        {this.props.children}
      </div>
    )
  }
}

export default CardBody