import React from 'react'

class CardSubheader extends React.Component {
  render() {
    return(
      <div className="subheader">
        { this.props.children }
      </div>
    )
  }
}

export default CardSubheader