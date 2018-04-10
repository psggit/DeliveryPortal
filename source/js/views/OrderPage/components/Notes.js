import React from 'react'

const Notes = ({ data }) => (
  <div className='card'>
    <div className='card-head'>
      <h4>Notes</h4>
    </div>
    <div className='card-body'>
      {
        <ul>
          {
            data.map((item, i) => (
              <li style={{ fontSize: '14px' }}>{ item.note }</li>
            ))
          }
        </ul>
      }
    </div>
  </div>
)

export default Notes
