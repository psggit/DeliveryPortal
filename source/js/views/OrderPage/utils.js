import React from 'react'

export function getIcon(name) {
  switch (name) {
    case 'back':
      return (
        <svg fill="#9b9b9b" version="1.1" id="Capa_1" x="0px" y="0px"
        	 width="400.004px" height="400.004px" viewBox="0 0 400.004 400.004">
        <g>
        	<path d="M382.688,182.686H59.116l77.209-77.214c6.764-6.76,6.764-17.726,0-24.485c-6.764-6.764-17.73-6.764-24.484,0L5.073,187.757
        		c-6.764,6.76-6.764,17.727,0,24.485l106.768,106.775c3.381,3.383,7.812,5.072,12.242,5.072c4.43,0,8.861-1.689,12.242-5.072
        		c6.764-6.76,6.764-17.726,0-24.484l-77.209-77.218h323.572c9.562,0,17.316-7.753,17.316-17.315
        		C400.004,190.438,392.251,182.686,382.688,182.686z"/>
        </g>
        </svg>
      )
    default:

  }
}
