1. POST /deliveryStatus/liveOrderList

Request:
=======

{
   offset: INT,
   limit: INT,
   support_id: INT
}

{
  count: INT,
  orders: [{
    order_id: INT,
    consumer_name: STRING,
    status: STRING,
    rank: INT (
      <100: retailer_not_confirmed,
      100><200: retailer_has_been_confirmed,
      200><300: delivery_guy_not_confirmed,
      400: Coool
    )
  }]
}


2. POST /deliveryStatus/unAssignedOrderList

Request:
=======
{
  offset: INT,
  limit: INT
}

3. GET /deliveryStatus/orderStatus/id


{
  order_status: {
    order_id,
    retailer_name,
    retailer_id,
    retailer_phone,
    retailer_gps,
    retailer_address,
    dp_id,
    dp_name,
    dp_contact_number,
    dp_is_freelancer,
    consumer_id,
    consumer_name,
    consumer_gps,
    consumer_adddress,
    consumer_landmark,
    delivery_fee,
    cancellation_fee,
    is_age_verified,
    status,
    rank,
    retailer_notified_time,
    retailer_confirmed_time,
    dp_notified_time,
    dp_confirmed_time,
    dp_picked_up_time,
    dp_delivered_time,
    dp_reached_to_consumer_time,
    returned_time
  }
}
