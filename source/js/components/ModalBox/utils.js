import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

export function unMountModal() {
  document.body.setAttribute('class', '')
  unmountComponentAtNode(document.getElementById('confirm-modal'))
}

export function mountModal(Component) {
  console.log(<Component />);
  document.body.setAttribute('class', 'noScroll')
  render(
    <Component />, document.getElementById('confirm-modal')
  )
}
