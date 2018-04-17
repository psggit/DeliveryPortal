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
    case 'refresh':
      return (
        <svg style={{pointerEvents: 'none'}} fill="#9b9b9b" version="1.1" id="Capa_1"  x="0px" y="0px"
        width="50px" height="50px" viewBox="0 0 561 561">
        <g>
          <g id="loop">
            <path d="M280.5,76.5V0l-102,102l102,102v-76.5c84.15,0,153,68.85,153,153c0,25.5-7.65,51-17.85,71.4l38.25,38.25
              C471.75,357,484.5,321.3,484.5,280.5C484.5,168.3,392.7,76.5,280.5,76.5z M280.5,433.5c-84.15,0-153-68.85-153-153
              c0-25.5,7.65-51,17.85-71.4l-38.25-38.25C89.25,204,76.5,239.7,76.5,280.5c0,112.2,91.8,204,204,204V561l102-102l-102-102V433.5z"
              />
          </g>
        </g>
        </svg>
      )
    case 'cross':
      return (
        <svg fill="#FFFFFF" width="14px" height="14px" version="1.1" id="Layer_1" x="0px" y="0px"
          viewBox="0 0 512 512">
        <g>
          <g>
            <path d="M505.943,6.058c-8.077-8.077-21.172-8.077-29.249,0L6.058,476.693c-8.077,8.077-8.077,21.172,0,29.249
              C10.096,509.982,15.39,512,20.683,512c5.293,0,10.586-2.019,14.625-6.059L505.943,35.306
              C514.019,27.23,514.019,14.135,505.943,6.058z"/>
          </g>
        </g>
        <g>
          <g>
            <path d="M505.942,476.694L35.306,6.059c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636
              c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z"/>
          </g>
        </g>
        </svg>
    )
    case 'plus':
      return (
        <svg width="16" height="16" version="1.1" id="Capa_1" x="0px" y="0px"
        	 viewBox="0 0 52 52">
        <g>
        	<path stroke="#21b121" d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M26,50C12.767,50,2,39.233,2,26
        		S12.767,2,26,2s24,10.767,24,24S39.233,50,26,50z"/>
        	<path stroke="#21b121" d="M38.5,25H27V14c0-0.553-0.448-1-1-1s-1,0.447-1,1v11H13.5c-0.552,0-1,0.447-1,1s0.448,1,1,1H25v12c0,0.553,0.448,1,1,1
        		s1-0.447,1-1V27h11.5c0.552,0,1-0.447,1-1S39.052,25,38.5,25z"/>
        </g>
        </svg>
      )
     case 'minus':
        return (
          <svg width="16" height="16" version="1.1" id="Capa_1" x="0px" y="0px"
          	 viewBox="0 0 52 52">
          <g>
          	<path stroke="#ff3b34" d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M26,50C12.767,50,2,39.233,2,26
          		S12.767,2,26,2s24,10.767,24,24S39.233,50,26,50z"/>
          	<path stroke="#ff3b34" d="M39,25H13c-0.552,0-1,0.447-1,1s0.448,1,1,1h26c0.552,0,1-0.447,1-1S39.552,25,39,25z"/>
          </g>
          </svg>
        )
    case 'dustbin':
        return (
          <svg version="1.1" id="Capa_1" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 408.483 408.483">
          <g>
          	<g>
          		<path d="M87.748,388.784c0.461,11.01,9.521,19.699,20.539,19.699h191.911c11.018,0,20.078-8.689,20.539-19.699l13.705-289.316    H74.043L87.748,388.784z M247.655,171.329c0-4.61,3.738-8.349,8.35-8.349h13.355c4.609,0,8.35,3.738,8.35,8.349v165.293    c0,4.611-3.738,8.349-8.35,8.349h-13.355c-4.61,0-8.35-3.736-8.35-8.349V171.329z M189.216,171.329    c0-4.61,3.738-8.349,8.349-8.349h13.355c4.609,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.737,8.349-8.349,8.349h-13.355    c-4.61,0-8.349-3.736-8.349-8.349V171.329L189.216,171.329z M130.775,171.329c0-4.61,3.738-8.349,8.349-8.349h13.356    c4.61,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.738,8.349-8.349,8.349h-13.356c-4.61,0-8.349-3.736-8.349-8.349V171.329z" fill="#D80027"/>
          		<path d="M343.567,21.043h-88.535V4.305c0-2.377-1.927-4.305-4.305-4.305h-92.971c-2.377,0-4.304,1.928-4.304,4.305v16.737H64.916    c-7.125,0-12.9,5.776-12.9,12.901V74.47h304.451V33.944C356.467,26.819,350.692,21.043,343.567,21.043z" fill="#D80027"/>
          	</g>
          </g>
          </svg>
        )
    case 'down-arrow':
        return (
          <svg width="16px" height="16px" fill="#9b9b9b" version="1.1" viewBox="0 0 129 129">
            <g>
              <path d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z"/>
            </g>
          </svg>
        )
    case 'notebook':
        return (
          <svg version="1.1" id="Capa_1" x="0px" y="0px" width="22px" height="22px" viewBox="0 0 528.807 528.807">
          <g>
          	<path d="M513.74,204.829l-29.482,29.486l-82.147-82.139l29.494-29.489c9.292-9.292,23.253-10.441,31.138-2.565l53.563,53.572
          		C524.179,181.567,523.032,195.537,513.74,204.829z M388.421,165.859l82.147,82.147l-195.883,195.88
          		c-0.898,0.898-3.393,3.393-6.892,4.285c-0.405,0.195-0.819,0.361-1.229,0.491l-102.23,32.58c-2.861,0.904-5.736,0.319-7.601-1.549
          		c-1.871-1.868-2.45-4.74-1.555-7.602l32.58-102.221c0.139-0.419,0.305-0.827,0.491-1.224c0.896-3.505,3.384-5.993,4.292-6.897
          		l36.812-36.812H105.02c-5.012,0-9.079-4.066-9.079-9.079c0-5.023,4.066-9.078,9.079-9.078h142.491L388.421,165.859z
          		 M249.417,437.574l-50.569-50.561l-13.565,42.581l21.554,21.557L249.417,437.574z M385.265,198.508
          		c-2.908-2.911-7.625-2.911-10.527,0L222.03,351.206c-2.905,2.908-2.905,7.625,0,10.533c2.905,2.908,7.625,2.908,10.53,0
          		l152.705-152.699C388.172,206.129,388.172,201.413,385.265,198.508z M376.037,489.217c0,5.455-4.438,9.9-9.895,9.9H185.956
          		l-16.275,5.189c-3.269,1.041-6.629,1.566-9.992,1.566c-7.161,0-13.819-2.453-19.266-6.756H46.885c-5.458,0-9.909-4.434-9.909-9.9
          		V73.424c0-5.458,4.445-9.9,9.909-9.9h37.12v15.675c0,5.464,4.43,9.897,9.903,9.897c5.471,0,9.901-4.433,9.901-9.897V63.523h56.92
          		v15.675c0,5.464,4.43,9.897,9.901,9.897c5.473,0,9.903-4.433,9.903-9.897V63.523h49.497v15.675c0,5.464,4.43,9.897,9.904,9.897
          		c5.47,0,9.9-4.433,9.9-9.897V63.523h54.453v15.675c0,5.464,4.427,9.897,9.895,9.897c5.473,0,9.906-4.433,9.906-9.897V63.523h42.072
          		c5.45,0,9.896,4.442,9.896,9.9v68.571l10.379-10.374l19.322-19.325V73.424c0-21.831-17.762-39.596-39.597-39.596h-42.072V9.904
          		c0-5.467-4.434-9.904-9.906-9.904c-5.462,0-9.895,4.431-9.895,9.904v23.924h-54.465V9.904c0-5.467-4.43-9.904-9.901-9.904
          		c-5.473,0-9.903,4.431-9.903,9.904v23.924h-49.497V9.904c0-5.467-4.43-9.904-9.904-9.904c-5.47,0-9.9,4.431-9.9,9.904v23.924
          		h-56.92V9.904c0-5.467-4.431-9.904-9.901-9.904c-5.473,0-9.903,4.431-9.903,9.904v23.924h-37.12
          		c-21.832,0-39.602,17.765-39.602,39.596v415.787c0,21.834,17.771,39.596,39.602,39.596h319.264
          		c21.835,0,39.597-17.762,39.597-39.596V345.059l-29.702,29.708v114.45H376.037z M298.707,152.436H105.02
          		c-5.012,0-9.079,4.061-9.079,9.079c0,5.019,4.066,9.079,9.079,9.079h193.687c5.013,0,9.079-4.061,9.079-9.079
          		C307.786,156.497,303.72,152.436,298.707,152.436z M298.707,225.635H105.02c-5.012,0-9.079,4.063-9.079,9.079
          		c0,5.019,4.066,9.079,9.079,9.079h193.687c5.013,0,9.079-4.061,9.079-9.079C307.786,229.698,303.72,225.635,298.707,225.635z"/>
          </g>
          </svg>
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
  if (!hasuraRole) return;
  const accessObj = {
    "admin": [],
    "support_admin": [],
    "support_master": [],
    "support_person": [],
    "business_team": [],
    "user": [],
    "delivery_support_person": ['resume-pause'],
    "support_team_leader": ['force-redeem', 'skip'],
    "excise_person": ['action-buttons', 'assign', 'consumer-col', 'resume-pause', 'other-orders', 'auto-pilot']
  }
  return !(accessObj[hasuraRole].indexOf(feature) > -1)
}
