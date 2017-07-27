import React from 'react'

const OrderInfo = ({ state, match, timeMap, titleMap, articleMap, customer, retailer, deliverer, order, epilogueMap }) => {
  return (
    <div className='InfoWrapper'>
      <div className='OrderNum'>
        <span className='OrderLabel'>Order ID: </span> #{match.params.id}
      </div>
      <div className='StatusBox'>
        <span className='Status'>{titleMap[state]}</span> {articleMap[state]} <span className='Duration'> {timeMap[state]} {epilogueMap[state]} </span>
      </div>
      <div className='DurationBox'>
        <span className='Status'>Order Placed </span><span className='Duration'>{Math.round((new Date() - new Date(order.get('orderPlacedTime')))/60000) } Min Ago</span>
      </div>
      <div className='DetailsWrapper'>
        <div className='ConsumerInfo DetailBlock'>
          <div className='title'>
            Consumer ({customer.get('state')})
          </div>
          <div className='InfoH1'>
            {customer.get('name')}
          </div>
          <div className='addressInfo'>
            {customer.get('address')}
          </div>
          <div className='phoneInfo'>
             Ph:{customer.get('phone')}
          </div>
        </div>

        <div className='RetailerInfo DetailBlock'>
          <div className='title'>
            Outlet ({retailer.get('state')})
          </div>
          <div className='InfoH1'>
            {retailer.get('name')}
          </div>
            {retailer.get('address')}
          <div className='InfoH1'>
             Ph:{retailer.get('phone')}
          </div>
        </div>

        <div className='DelivererInfo DetailBlock'>
          <div className='title'>
            Deliverer ({deliverer.get('state')})
          </div>
          <div className='InfoH1'>
            {deliverer.get('name')}
          </div>
          <div className='InfoH1'>
            {deliverer.get('vehicleNo')}
          </div>
          <div className='InfoH1'>
             Ph: {deliverer.get('phone')}
          </div>
        </div>
      </div>
      <div className='OrderInfo InfoBlock'>
        <div className='title'>
        </div>
        <div className='OrderList'>
          <div className='Orderitem'>
            <span className='OrderitemQuantity'> 2 </span> Jack Daniels - 180 ml
          </div>
          <div className='Orderitem'>
           <span className='OrderitemQuantity'> 2 </span> Jack Daniels - 180 ml
          </div>
          <div className='Orderitem'>
           <span className='OrderitemQuantity'> 2 </span> Jack Daniels - 180 ml
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
      <div className='SummaryInfo InfoBlock'>
        <div className='QuantitySummary'>
            Delivery Chrg : 40rs
        </div>
        <div className='CostSummary'>
            Cost : 500rs
        </div>
        <div className='EstimatedTime'>
            Cancellation Chrg : {(order.get('cancellationCharge') === null ? 0 : order.get('cancellationCharge'))} Rs
        </div>
        <div className="clearfix"></div>
      </div>
      <div className='actionBox InfoBlock'>
        <button className={'redBtn ' + (order.get('state') === 'placed' ? 'show' : 'hide')} onClick={this.onStateChange}>
          CANCEL ORDER
        </button>
        <button className={'blueBtn ' + (deliverer.get('state') === 'waiting' ? 'show' : 'hide')}>
          SKIP DELIVERY PERSON
        </button>
        <button className={'greenBtn ' + (deliverer.get('state') === 'waiting' ? 'show' : 'hide')}>
          CONFIRM DELIVERY PERSON
        </button>
        <button className={'blueBtn ' + (retailer.get('state') === 'waiting' ? 'show' : 'hide')}>
          SKIP OUTLET
        </button>
        <button className={'greenBtn ' + (retailer.get('state') === 'waiting' ? 'show' : 'hide')}>
          CONFIRM OUTLET
        </button>
      </div>
    </div>
  )
}

export default OrderInfo
