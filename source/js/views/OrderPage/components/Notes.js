import React from 'react'
import Moment from 'moment'

const Notes = ({ data }) => (
  <div className='card' style={{ height: '400px', overflow: 'auto' }}>
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
            data.map((item, i) => {
              const note = item.note.trim().split('\n')
              return (
                <tr>
                  <td>
                    {
                      note.map(el => (
                        <span>{ el }<br/></span>
                      ))
                    }
                  </td>
                  <td>{`Support id: ${item.support_id} on ${Moment(item.created_at).format('MMM Do, YYYY')} at ${Moment(item.created_at).format('h:mm a')}`}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  </div>
)

export default Notes
