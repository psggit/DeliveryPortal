import React from 'react'
import Moment from 'moment'

const Notes = ({ data }) => (
  <div className='card'>
    <div className='card-head'>
      <h4>Notes</h4>
    </div>
    <div className='card-body'>
      <table>
        <thead>
          <tr>
            <td>Note</td>
            <td>Added by</td>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item, i) => (
              <tr>
                <td>{ item.note }</td>
                <td>{`Support id: ${item.support_id} at ${Moment(item.created_at).format('MMM Do YY', 'h:mm a')}`}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  </div>
)

export default Notes
