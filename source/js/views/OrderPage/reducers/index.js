// import { Map } from 'immutable';

/*
  Event Map
  -*-*-*-*-
  Order Placed: STATE_FINDING_RETAILER,
  Searching for compatible Retailer: STATE_AWAITING_RETAILER_CONFIRMATION,
  Order Confirmed by Retailer: STATE_AWAITING_DELIVERER_CONFIRMATION,
  Searching for compatible Deliverer: STATE_FINDING_DELIVERER,
  Order Confirmed bt Deliverer: STATE_AWAITING_DELIVERY_PICK_UP,
  Order Picked Up: STATE_ON_ROUTE,
  Order Delivered: STATE_DELIVERED,
  Order Cancelled: STATE_CANCELLED,
  Order Returning: STATE_RETURNING

  Object States
  -*-*-*-*-*-*-
  Order:     placed > placed > placed > placed > placed > placed > completed/cancelled > returning
  Customer:  placed > placed > placed > placed > placed > placed > completed/cancelled
  Retailer:  searching > waiting > confirmed > confirmed > confirmed > dispatched > dispatched > awaiting_return
  Deliverer: null > null > null > searching > confirmed > picked > delivered > returning
*/

import * as ActionTypes from './../constants/actions'

// Initial Order State
const OrderState = {
  state: null,
  id: null,
  content: [
    {
      id: 1,
      customer: {
        name: 'John'
      }
    },
    {
      id: 2,
      customer: {
        name: 'John'
      }
    },
    {
      id: 3,
      customer: {
        name: 'John'
      }
    },
    {
      id: 4,
      customer: {
        name: 'John'
      }
    },
    {
      id: 5,
      customer: {
        name: 'John'
      }
    },
    {
      id: 6,
      customer: {
        name: 'John'
      }
    }
  ],
  orderPlacedTime: null,
  cancelledTime: null,
  estimatedTime: null,
  cancelled: null,
  totalValue: null,
  cancellationCharge: null,
  assignedTo: null,
  deliveryCharge: null,
  feedback: null,
  rating: null,
}

// Initial Customer State
const CustomerState = {
  state: null,
  id: null,
  name: null,
  address: null,
  phone: null,
  x: null,
  y: null
}

// Initial Deliverer State
const DelivererState = {
  state: null,
  id: null,
  name: null,
  phone: null,
  orderPlacedTime: null,
  vehicleNo: null,
  orderAcceptedTime: null,
  deliveredTime: null,
  x: null,
  y: null
}

// Initial Retailer State
const RetailerState = {
  state: null,
  id: null,
  name: null,
  phone: null,
  cancelled: null,
  orderPlacedTime: null,
  orderAcceptedTime: null,
  dispatchedTime: null,
  x: null,
  y: null
}

// Initial Order State
const CompleteOrderState = {
  state: null,
  loadingOrdersList: true,
  order: OrderState,
  retailer: RetailerState,
  deliverer: DelivererState,
  customer: CustomerState
}



const actionsMap = {
  [ActionTypes.SUCCESS_FETCH_ORDERS_DATA]: (state, action) => {

    // Order Management : placed
    // order.set('state', 'placed')
    // order.set('content')

    const order = {
      state: 'placed',
      assignedTo: null,
      id: 1,
      content: [
        {
          id: 5,
          customer: {
            name: 'John'
          }
        },
        {
          id: 6,
          customer: {
            name: 'John'
          }
        }
      ],
      orderPlacedTime: '2017-02-12T04:58:00+05:30', // action.data.order.orderPlacedTime
      totalValue: 400,
      cancellationCharge: null,
      deliveryCharge: 40,
      feedback: null,
      rating: null,
      cancelledTime: null,
      estimatedTime: null,
      cancelled: null
    }

    // Customer Management : placed
    const customer = {
      state: 'placed',
      id: 3,// action.data.customer.id,
      name: 'Uma Rajesh',// action.data.customer.name,
      address: '169/12, C-2, Satyashreee APartment, Adayar, Chennai - 90', // action.data.customer.address,
      landmark: 'Opposite to Kvb ATM',// action.data.customer.landmark
      phone: 9884840627,// action.data.customer.phone,
      x: 12.7895679,// action.data.customer.gps.x,
      y: 80.2138785// action.data.customer.gps.y
    }

    // Deliverer Management : null
    const deliverer = {
      state: null,
      vehicleNo: null,
      id: null,
      name: null,
      phone: null,
      orderPlacedTime: null,
      orderAcceptedTime: null,
      deliveredTime: null,
      x: null,
      y: null
    }

    // Retailer Management : searching
    const retailer = {
      state: 'searching',
      id: null,
      name: null,
      phone: null,
      address: null,
      cancelled: null,
      dispatchedTime: null,
      notifiedTime: null,
      orderPlacedTime: null,
      orderAcceptedTime: null,
      x: null,
      y: null
    }

    return Object.assign({}, state, {
      state: 'SearchingRetailer',
      loadingOrdersList: false,
      order,
      retailer,
      deliverer,
      customer
    })
  },

  [ActionTypes.REQUEST_ASSIGN_ORDER]: (state, action) => {

  },

  [ActionTypes.SUCCESS_FORCE_REDEEM]: (state, action) => {
    return state
  },

  [ActionTypes.STATE_FINDING_RETAILER]: (state, action) => {
    // Order Management : placed
    const order = {
      state: 'placed',
      assignedTo: null,
      id: 1, // action.data.order.id
      content: [{'name':'Item 1' ,'quantity': 400, 'amount': 3, 'price': 400}, {'name':'Item 3' ,'quantity': 400, 'amount': 3, 'price': 400}, {'name':'Item 2' ,'quantity': 300, 'amount': 2, 'price': 400}], // action.data.order.content
      orderPlacedTime: '2017-02-12T04:58:00+05:30', // action.data.order.orderPlacedTime
      totalValue: 400,
      cancellationCharge: null,
      deliveryCharge: 40,
      feedback: null,
      rating: null,
      cancelledTime: null,
      estimatedTime: null,
      cancelled: null
    }

    // Customer Management : placed
    const customer = {
      state: 'placed',
      id: 3,// action.data.customer.id,
      name: 'Uma Rajesh',// action.data.customer.name,
      address: '169/12, C-2, Satyashreee APartment, Adayar, Chennai - 90', // action.data.customer.address,
      landmark: 'Opposite to Kvb ATM',// action.data.customer.landmark
      phone: 9884840627,// action.data.customer.phone,
      x: 12.7895679,// action.data.customer.gps.x,
      y: 80.2138785// action.data.customer.gps.y
    }

    // Deliverer Management : null
    const deliverer = {
      state: null,
      vehicleNo: null,
      id: null,
      name: null,
      phone: null,
      orderPlacedTime: null,
      orderAcceptedTime: null,
      deliveredTime: null,
      x: null,
      y: null
    }

    // Retailer Management : searching
    const retailer = {
      state: 'searching',
      id: null,
      name: null,
      phone: null,
      address: null,
      cancelled: null,
      dispatchedTime: null,
      notifiedTime: null,
      orderPlacedTime: null,
      orderAcceptedTime: null,
      x: null,
      y: null
    }

    return Object.assign({}, state, {
      state: 'SearchingRetailer',
      order,
      retailer,
      deliverer,
      customer
    })
  },

  [ActionTypes.STATE_AWAITING_RETAILER_CONFIRMATION]: (state, action) => {

    // Order Management : placed
    const order = {
      state: 'placed',
      assignedTo: null,
      id: 1, // action.data.order.id
      content: [{'name':'Item 1' ,'quantity': 400, 'amount': 3, 'price': 400}, {'name':'Item 3' ,'quantity': 400, 'amount': 3, 'price': 400}, {'name':'Item 2' ,'quantity': 300, 'amount': 2, 'price': 400}], // action.data.order.content
      orderPlacedTime: '2017-02-12T04:58:00+05:30',  // action.data.order.orderPlacedTime
      cancelledTime: null,
      estimatedTime: null,
      cancelled: false,
      totalValue: 400,
      cancellationCharge: null,
      deliveryCharge: 40,
      feedback: null,
      rating: null,
    }

    // Customer Management : placed
    const customer = {
      state: 'placed',
      id: 3,// action.data.customer.id,
      name: 'Uma Rajesh',// action.data.customer.name,
      address: '169/12, C-2, Satyashreee APartment, Adayar, Chennai - 90', // action.data.customer.address,
      landmark: 'Opposite to Kvb ATM',// action.data.customer.landmark
      phone: 9884840627,// action.data.customer.phone,
      x: 12.7895679,// action.data.customer.gps.x,
      y: 80.2138785// action.data.customer.gps.y
    }

    // Retailer Management : waiting
    const retailer = {
      state: 'waiting',
      id: 4,
      name: 'Tasmac Central',
      address: 'asdf asdf',
      phone: 83372878332,
      notifiedTime: '',
      orderPlacedTime: '2017-02-12T05:01:00+05:30',
      orderAcceptedTime: null,
      dispatchedTime: null,
      x: 12.7925679,
      y: 80.2238785
    }

    // Deliverer Management : null
    const deliverer = {
      state: null,
      vehicleNo: null,
      deliveredTime: null,
      id: null,
      name: null,
      phone: null,
      orderPlacedTime: null,
      orderAcceptedTime: null,
      x: null,
      y: null
    }

    return Object.assign({}, state, {
      state: 'AwaitingRetailerConfirmation',
      order,
      retailer,
      deliverer,
      customer
    })
  },

  [ActionTypes.STATE_FINDING_DELIVERER]: (state, action) => {
    // Order Management : placed
    const order = {
      assignedTo: null,
      state: 'placed',
      id: 1, // action.data.order.id
      content: [{'name':'Item 1' ,'quantity': 400, 'amount': 3, 'price': 400}, {'name':'Item 3' ,'quantity': 400, 'amount': 3, 'price': 400}, {'name':'Item 2' ,'quantity': 300, 'amount': 2, 'price': 400}], // action.data.order.content
      orderPlacedTime: '2017-02-12T04:58:00+05:30',  // action.data.order.orderPlacedTime
      cancelledTime: null,
      estimatedTime: null,
      cancelled: false,
      totalValue: 400,
      cancellationCharge: null,
      deliveryCharge: 40,
      feedback: null,
      rating: null,
    }

    // Customer Management : placed
    const customer = {
      state: 'placed',
      id: 3,// action.data.customer.id,
      name: 'Uma Rajesh',// action.data.customer.name,
      address: '169/12, C-2, Satyashreee APartment, Adayar, Chennai - 90', // action.data.customer.address,
      landmark: 'Opposite to Kvb ATM',// action.data.customer.landmark
      phone: 9884840627,// action.data.customer.phone,
      x: 12.7895679,// action.data.customer.gps.x,
      y: 80.2138785// action.data.customer.gps.y
    }

    // Retailer Management : confirmed
    const retailer = {
      state: 'confirmed',
      id: 4,
      name: 'Tasmac Central',
      address: 'asdf asdf',
      phone: 83372878332,
      orderPlacedTime: '2017-02-12T05:01:00+05:30',
      orderAcceptedTime: '2017-02-12T05:01:43+05:30',
      dispatchedTime: null,
      x: 12.7925679,
      y: 80.2238785
    }

    // Deliverer Management : searching
    const deliverer = {
      state: 'searching',
      deliveredTime: null,
      id: null,
      name: null,
      phone: null,
      orderPlacedTime: null,
      orderAcceptedTime: null,
      vehicleNo: null,
      x: null,
      y: null
    }

    return Object.assign({}, state, {
      state: 'SearchingDeliverer',
      order,
      retailer,
      deliverer,
      customer
    })
  },

  [ActionTypes.STATE_AWAITING_DELIVERER_CONFIRMATION]: (state, action) => {

    // Order Management : placed
    const order = {
      state: 'placed',
      assignedTo: null,
      id: 1, // action.data.order.id
      content: [{'name':'Item 1' ,'quantity': 400, 'amount': 3, 'price': 400}, {'name':'Item 3' ,'quantity': 400, 'amount': 3, 'price': 400}, {'name':'Item 2' ,'quantity': 300, 'amount': 2, 'price': 400}], // action.data.order.content
      orderPlacedTime: '2017-02-12T04:58:00+05:30',  // action.data.order.orderPlacedTime
      cancelledTime: null,
      estimatedTime: null,
      cancelled: false,
      totalValue: 400,
      cancellationCharge: null,
      deliveryCharge: 40,
      feedback: null,
      rating: null,
    }

    // Customer Management : placed
    const customer = {
      state: 'placed',
      id: 3,// action.data.customer.id,
      name: 'Uma Rajesh',// action.data.customer.name,
      address: '169/12, C-2, Satyashreee APartment, Adayar, Chennai - 90', // action.data.customer.address,
      landmark: 'Opposite to Kvb ATM',// action.data.customer.landmark
      phone: 9884840627,// action.data.customer.phone,
      x: 12.7895679,// action.data.customer.gps.x,
      y: 80.2138785// action.data.customer.gps.y
    }

    // Retailer Management : confirmed
    const retailer = {
      state: 'confirmed',
      id: 4,
      name: 'Tasmac Central',
      address: 'asdf asdf',
      phone: 83372878332,
      orderPlacedTime: '2017-02-12T05:01:00+05:30',
      orderAcceptedTime: '2017-02-12T05:01:43+05:30',
      dispatchedTime: null,
      x: 12.7925679,
      y: 80.2238785
    }

    // Deliverer Management : waiting
    const deliverer = {
      state: 'waiting',
      deliveredTime: null,
      id: 5,
      name: 'Mamun Khan',
      phone: 2626728940,
      orderPlacedTime: '2017-02-12T05:05:00+05:30' ,
      vehicleNo: 'TN012',
      orderAcceptedTime: null,
      x: 12.7925679,
      y: 80.2238785
    }
    return Object.assign({}, state, {
      state: 'AwaitingDelivererConfirmation',
      order,
      retailer,
      deliverer,
      customer
    })
  },

  [ActionTypes.STATE_AWAITING_DELIVERY_PICK_UP]: (state, action) => {
    // Order Management : placed
    const order = {
      state: 'placed',
      id: 1, // action.data.order.id
      assignedTo: null,
      content: [{'name':'Item 1' ,'quantity': 400, 'amount': 3, 'price': 400}, {'name':'Item 3' ,'quantity': 400, 'amount': 3, 'price': 400}, {'name':'Item 2' ,'quantity': 300, 'amount': 2, 'price': 400}], // action.data.order.content
      orderPlacedTime: '2017-02-12T04:58:00+05:30',  // action.data.order.orderPlacedTime
      cancelledTime: null,
      estimatedTime: '2017-02-12T05:58:00+05:30' ,
      cancelled: false,
      totalValue: 400,
      cancellationCharge: null,
      deliveryCharge: 40,
      feedback: null,
      rating: null,
    }

    // Customer Management : placed
    const customer = {
      state: 'placed',
      id: 3,// action.data.customer.id,
      name: 'Uma Rajesh',// action.data.customer.name,
      address: '169/12, C-2, Satyashreee APartment, Adayar, Chennai - 90', // action.data.customer.address,
      landmark: 'Opposite to Kvb ATM',// action.data.customer.landmark
      phone: 9884840627,// action.data.customer.phone,
      x: 12.7895679,// action.data.customer.gps.x,
      y: 80.2138785// action.data.customer.gps.y
    }

    // Retailer Management : confirmed
    const retailer = {
      state: 'confirmed',
      id: 4,
      name: 'Tasmac Central',
      phone: 83372878332,
      address: 'asdf asdf',
      orderPlacedTime: '2017-02-12T05:01:00+05:30',
      orderAcceptedTime: '2017-02-12T05:01:43+05:30',
      dispatchedTime: null,
      x: 12.7925679,
      y: 80.2238785
    }

    // Deliverer Management : confirmed
    const deliverer = {
      state: 'confirmed',
      deliveredTime: null,
      id: 5,
      name: 'Mamun Khan',
      phone: 2626728940,
      vehicleNo: 'TN012',
      orderPlacedTime: '2017-02-12T05:05:00+05:30',
      orderAcceptedTime: '2017-02-12T05:05:00+05:30',
      x: 12.7925679,
      y: 80.2238785
    }
    return Object.assign({}, state, {
      state,
      order,
      retailer,
      deliverer,
      customer
    })
  },

  [ActionTypes.STATE_ON_ROUTE]: (state, action) => {
    // Order Management : placed
    const order = {
      state: 'placed',
      id: 1, // action.data.order.id
      assignedTo: null,
      content: [{'name':'Item 1' ,'quantity': 400, 'amount': 3, 'price': 400}, {'name':'Item 3' ,'quantity': 400, 'amount': 3, 'price': 400}, {'name':'Item 2' ,'quantity': 300, 'amount': 2, 'price': 400}], // action.data.order.content
      orderPlacedTime: '2017-02-12T04:58:00+05:30',  // action.data.order.orderPlacedTime
      cancelledTime: null,
      estimatedTime: '2017-02-12T05:58:00+05:30' ,
      cancelled: false,
      totalValue: 400,
      cancellationCharge: null,
      deliveryCharge: 40,
      feedback: null,
      rating: null,
    }

    // Customer Management : placed
    const customer = {
      state: 'placed',
      id: 3,// action.data.customer.id,
      name: 'Uma Rajesh',// action.data.customer.name,
      address: '169/12, C-2, Satyashreee APartment, Adayar, Chennai - 90', // action.data.customer.address,
      landmark: 'Opposite to Kvb ATM',// action.data.customer.landmark
      phone: 9884840627,// action.data.customer.phone,
      x: 12.7895679,// action.data.customer.gps.x,
      y: 80.2138785// action.data.customer.gps.y
    }

    // Retailer Management : confirmed
    const retailer = {
      state: 'dispatched',
      id: 4,
      name: 'Tasmac Central',
      address: 'asdf asdf',
      phone: 83372878332,
      orderPlacedTime: '2017-02-12T05:01:00+05:30',
      orderAcceptedTime: '2017-02-12T05:01:43+05:30',
      dispatchedTime: '2017-02-12T05:01:43+05:30',
      x: 12.7925679,
      y: 80.2238785
    }

    // Deliverer Management : collected
    const deliverer = {
      state: 'collected',
      id: 5,
      deliveredTime: null,
      name: 'Mamun Khan',
      phone: 2626728940,
      orderPlacedTime: '2017-02-12T05:05:00+05:30',
      orderAcceptedTime: '2017-02-12T05:05:00+05:30',
      vehicleNo: 'TN012',
      x: 12.7925679,
      y: 80.2238785
    }
    return Object.assign({}, state, {
      state: 'OrderDispatched',
      order: order,
      retailer: retailer,
      deliverer: deliverer,
      customer: customer
    })
  },

  [ActionTypes.STATE_DELIVERED]: (state, action) => {
    // Order Management : completed
    const order = {
      state: 'completed',
      id: 1, // action.data.order.id
      content: [{'name':'Item 1' ,'quantity': 400, 'amount': 3, 'price': 400}, {'name':'Item 3' ,'quantity': 400, 'amount': 3, 'price': 400}, {'name':'Item 2' ,'quantity': 300, 'amount': 2, 'price': 400}], // action.data.order.content
      orderPlacedTime: '2017-02-12T04:58:00+05:30',  // action.data.order.orderPlacedTime
      cancelledTime: null,
      assignedTo: null,
      estimatedTime: '2017-02-12T05:58:00+05:30' ,
      cancelled: false,
      totalValue: 400,
      cancellationCharge: null,
      deliveryCharge: 40,
      feedback: null,
      rating: null,
    }

    // Customer Management : completed
    const customer = {
      state: 'completed',
      id: 3,// action.data.customer.id,
      name: 'Uma Rajesh',// action.data.customer.name,
      address: '169/12, C-2, Satyashreee APartment, Adayar, Chennai - 90', // action.data.customer.address,
      landmark: 'Opposite to Kvb ATM',// action.data.customer.landmark
      phone: 9884840627,// action.data.customer.phone,
      x: 12.7895679,// action.data.customer.gps.x,
      y: 80.2138785// action.data.customer.gps.y
    }

    // Retailer Management : dispatched
    const retailer = {
      state: 'dispatched',
      id: 4,
      name: 'Tasmac Central',
      address: 'asdf asdf',
      phone: 83372878332,
      orderPlacedTime: '2017-02-12T05:01:00+05:30',
      orderAcceptedTime: '2017-02-12T05:01:43+05:30',
      dispatchedTime: '2017-02-12T05:01:43+05:30',
      x: 12.7925679,
      y: 80.2238785
    }

    // Deliverer Management : delivered
    const deliverer = {
      state: 'delivered',
      id: 5,
      name: 'Mamun Khan',
      phone: 2626728940,
      deliveredTime: null,
      vehicleNo: 'TN012',
      orderPlacedTime: '2017-02-12T05:05:00+05:30',
      orderAcceptedTime: '2017-02-12T05:05:00+05:30',
      x: 12.7925679,
      y: 80.2238785
    }
    return Object.assign({}, state, {
      state: 'OrderDelivered',
      order: order,
      retailer: retailer,
      deliverer: deliverer,
      customer: customer
    })
  },

  [ActionTypes.STATE_CANCELLED]: (state, action) => {
    // Order Management : cancelled
    const order = {
      state: 'cancelled',
      id: 1, // action.data.order.id
      content: [{'name':'Item 1' ,'quantity': 400, 'amount': 3, 'price': 400}, {'name':'Item 3' ,'quantity': 400, 'amount': 3, 'price': 400}, {'name':'Item 2' ,'quantity': 300, 'amount': 2, 'price': 400}], // action.data.order.content
      orderPlacedTime: '2017-02-12T04:58:00+05:30',  // action.data.order.orderPlacedTime
      cancelledTime: '2017-02-12T05:58:00+05:30',
      assignedTo: null,
      estimatedTime: '2017-02-12T05:58:00+05:30' ,
      cancelled: true,
      totalValue: 400,
      cancellationCharge: 50,
      deliveryCharge: 40,
      feedback: null,
      rating: null,
    }

    // Customer Management : completed
    const customer = {
      state: 'cancelled',
      id: 3,// action.data.customer.id,
      name: 'Uma Rajesh',// action.data.customer.name,
      address: '169/12, C-2, Satyashreee APartment, Adayar, Chennai - 90', // action.data.customer.address,
      landmark: 'Opposite to Kvb ATM',// action.data.customer.landmark
      phone: 9884840627,// action.data.customer.phone,
      x: 12.7895679,// action.data.customer.gps.x,
      y: 80.2138785// action.data.customer.gps.y
    }

    // Retailer Management : dispatched
    const retailer = {
      state: 'rejected',
      id: 4,
      name: 'Tasmac Central',
      address: 'asdf asdf',
      phone: 83372878332,
      orderPlacedTime: '2017-02-12T05:01:00+05:30',
      orderAcceptedTime: '2017-02-12T05:01:43+05:30',
      dispatchedTime: '2017-02-12T05:01:43+05:30',
      x: 12.7925679,
      y: 80.2238785
    }

    // Deliverer Management : delivered
    const deliverer = {
      state: 'rejected',
      id: 5,
      name: 'Mamun Khan',
      phone: 2626728940,
      deliveredTime: null,
      vehicleNo: 'TN012',
      orderPlacedTime: '2017-02-12T05:05:00+05:30',
      orderAcceptedTime: '2017-02-12T05:05:00+05:30',
      x: 12.7925679,
      y: 80.2238785
    }
    return Object.assign({
      state: 'OrderCancelled',
      order: order,
      retailer: retailer,
      deliverer: deliverer,
      customer: customer
    })
  },

  [ActionTypes.STATE_RETURNING]: (state, action) => {
    const order = {
      state: 'cancelled',
      id: 1, // action.data.order.id
      content: [{'name':'Item 1' ,'quantity': 400, 'amount': 3, 'price': 400}, {'name':'Item 3' ,'quantity': 400, 'amount': 3, 'price': 400}, {'name':'Item 2' ,'quantity': 300, 'amount': 2, 'price': 400}], // action.data.order.content
      orderPlacedTime: '2017-02-12T04:58:00+05:30',  // action.data.order.orderPlacedTime
      cancelledTime: '2017-02-12T05:58:00+05:30',
      assignedTo: null,
      estimatedTime: '2017-02-12T05:58:00+05:30' ,
      cancelled: true,
      totalValue: 400,
      cancellationCharge: 50,
      deliveryCharge: 40,
      feedback: null,
      rating: null,
    }

    const customer = {
      state: 'cancelled',
      id: 3,// action.data.customer.id,
      name: 'Uma Rajesh',// action.data.customer.name,
      address: '169/12, C-2, Satyashreee APartment, Adayar, Chennai - 90', // action.data.customer.address,
      landmark: 'Opposite to Kvb ATM',// action.data.customer.landmark
      phone: 9884840627,// action.data.customer.phone,
      x: 12.7895679,// action.data.customer.gps.x,
      y: 80.2138785// action.data.customer.gps.y
    }

    const retailer = {
      state: 'awaiting_return',
      id: 4,
      name: 'Tasmac Central',
      address: 'asdf asdf',
      phone: 83372878332,
      orderPlacedTime: '2017-02-12T05:01:00+05:30',
      orderAcceptedTime: '2017-02-12T05:01:43+05:30',
      dispatchedTime: '2017-02-12T05:01:43+05:30',
      x: 12.7925679,
      y: 80.2238785
    }

    const deliverer = {
      state: 'returning',
      id: 5,
      name: 'Mamun Khan',
      phone: 2626728940,
      deliveredTime: null,
      vehicleNo: 'TN012',
      orderPlacedTime: '2017-02-12T05:05:00+05:30',
      orderAcceptedTime: '2017-02-12T05:05:00+05:30',
      x: 12.7925679,
      y: 80.2238785
    }
    return Object.assign({}, state, {
      state: 'OrderCancelled',
      order: order,
      retailer: retailer,
      deliverer: deliverer,
      customer: customer
    });
  }
};

export default function reducer(state = CompleteOrderState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
