/* These are view particular utility functions */

import React from 'react'

export function getIcon(name) {
  const iconsPath = '../assets/icons/';
  switch (name) {
    case 'back':
      return (
        <svg fill="#333333" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" xmlnsXlink="http://www.w3.org/1999/xlink" enableBackground="new 0 0 44 44">
          <path d="M22,0C9.8,0,0,9.8,0,22s9.8,22,22,22s22-9.8,22-22S34.2,0,22,0z M35,23c0,0.6-0.4,1-1,1H17.4c-0.4,0-0.7,0.5-0.4,0.9l4,4  c0.4,0.4,0.4,1,0,1.4l-1.4,1.4c-0.2,0.2-0.4,0.3-0.7,0.3c-0.3,0-0.5-0.1-0.7-0.3l-9-9C9.1,22.5,9,22.3,9,22s0.1-0.5,0.3-0.7l9-9  c0.2-0.2,0.4-0.3,0.7-0.3c0.3,0,0.5,0.1,0.7,0.3l1.4,1.4c0.4,0.4,0.4,1,0,1.4l-4,4C16.8,19.4,17,20,17.5,20H34c0.6,0,1,0.4,1,1V23z"/>
        </svg>
      )
    case 'kyc_confirmed':
      return (        
        <img src={`${iconsPath}kyc_verified.png`} />
      )
    case 'delivery_verified':
      return (
        <img src={`${iconsPath}delivery_verified.png`} />
      )
    case 'confirmed':
      return ( 
        <img src={`${iconsPath}Confirmed.png`} />
      )  
    default:

  }
}

export function getTimeDiff(d1, d2) {
  return Math.round(
    (d1 - new Date(d2)) / 60000
  )
}

export function validateNumType(keyCode) {
  let allowed = [ 8, 46, 37, 39, 9 ]
  return allowed.indexOf(keyCode) > -1 || (keyCode >=48 && keyCode <=57)
}

export function checkCtrlA(e) {
  if (e.ctrlKey) {
    if (e.keyCode == 65 || e.keyCode == 97) {
      return true
    }
  }
  return false
}

export function getHasuraRole() {
  return localStorage.getItem('x-hasura-role')
}

export function getHasuraId() {
  return localStorage.getItem('hasura-id')
}

export function canAccess(feature) {
  // console.log(feature)
  const hasuraRole = getHasuraRole()
  const accessObj = {
    "admin": [],
    "support_admin": [],
    "support_person": ['resume-pause'],
    "support_team_leader": ['force-redeem', 'skip'],
    "excise_person": ['action-buttons', 'assign', 'consumer-col', 'resume-pause', 'other-orders']
  } 
  return !(accessObj[hasuraRole].indexOf(feature) > -1)
}
