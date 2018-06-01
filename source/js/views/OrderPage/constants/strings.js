/* Place all your constant strings or JSON here */

export const filterOptions = [
  // { value: 'finding retailer', label: 'Finding Retailer'},
  { value: 'awaiting_retailer_confirmation', label: 'Awaiting retailer confirmation'},
  // { value: 'finding delievery boy', label: 'Finding delievery boy'},
  { value: 'awaiting_dp_confirmation', label: 'Awaiting deliverer confirmation'},
  { value: 'dp_confirmed', label: 'En-route to customers' },
  { value: 'arrived_at_consumer_address', label: 'Arrived at consumer location' }
  // { value: 'cancelled products by delivery person', label: 'Cancelled products by delivery person'},
  // { value: 'cancelled products by customer', label: 'Cancelled products by customer'},
  // { value: 'successful deliveries', label: 'Successful deliveries'}
]

export const dateOptions = [
  { value: 'today', label: 'Today' },
  { value: 'tomorrow', label: 'Tomorrow' },
  { value: 'custom', label: 'Custom date' }
]

export const menuItems = [
  { value: 'live', label: 'In-progress orders' },
  { value: 'assigned', label: 'Assigned orders'},
  { value: 'unassigned', label: 'Unassigned orders'},
  { value: 'history', label: 'Order history' },
  { value: 'busy-delivery-agents', label: 'Busy delivery agents'},
  { value: 'need-to-be-cancelled', label: 'Need to be cancelled'},
  { value: 'attempted', label: 'Attempted orders'},
  { value: 'returning', label: 'Returning orders'},
  { value: 'all', label: 'All orders'}
]

export const menuItemsMap = {}

menuItems.reduce((menuItemsMap, item) => {
  menuItemsMap[item.value] = item.label
  return menuItemsMap
}, menuItemsMap)
