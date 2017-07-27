import React, { Component } from 'react';

export default class OrderList extends Component {
  render() {
    return (
      <div className='NotFound'>
        <h1>Order list</h1>
        <table>
          <tr>
            <th>
                Order Number
            </th>
            <th>
                Status
            </th>
            <th>
                Assigned To
            </th>
          </tr>
            <th>
               #1234561
            </th>
            <th>
                Awaiting Confirmation From Retailer
            </th>
            <th>
                me
            </th>
          <tr>
            <th>
               #1234561
            </th>
            <th>
                Status
            </th>
            <th>
                Unassigned(Assign)
            </th>
          </tr>
          <tr>
            <th>
               #1234561
            </th>
            <th>
                Awaiting Confirmation From Deliverer
            </th>
            <th>
                Devraj
            </th>
          </tr>
        </table>
      </div>
    );
  }
}
