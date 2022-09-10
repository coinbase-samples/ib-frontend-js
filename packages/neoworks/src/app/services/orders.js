import { makeCall } from "./ampClient";
import _ from 'lodash';

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms)); 
  }
  export async function fetchOrdersList(token) {
    await sleep(1000);
    const url = `http://localhost:8443/v1/orders`;

    try {
      const fetchOrders = await makeCall(token, 'GET', url, '');

      const fetchOrdersResponse = await fetchOrders.json();
      // const trimOrders = fetchOrders.map(side => { side.slice(7)})
      // console.log(trimOrders)
      return fetchOrdersResponse.data;
    } catch (e) {
      return e;
    }
  }
  

      
    

  export async function fetchOrderDetails(token, orderId) {
    await sleep(1000);
        const url = `http://localhost:8443/v1/order/${orderId}`;

    try {
      const fetchOrderById = await makeCall(token, 'GET', url, '');

      const OrderByIdResponse = await fetchOrderById.json();
      const parseDate = Date(OrderByIdResponse.createdAt)
      console.log(parseDate)
      
      const result = {
        orderId: OrderByIdResponse?.orderId,
        ownerId: OrderByIdResponse?.ownerId,
        productId: OrderByIdResponse?.productId,
        side: OrderByIdResponse?.side.slice(11),
        type: OrderByIdResponse.type.slice(11),
        quantity: OrderByIdResponse.quantity,
        limitPrice: OrderByIdResponse.limitPrice,
        timeInForce: OrderByIdResponse.timeInForce,
        status: OrderByIdResponse.status.slice(13),
        // createdAt: OrderByIdResponse.createdAt.slice(0,19),
        createdAt: parseDate.slice(0,25),
        updatedAt: OrderByIdResponse.updatedAt,
        filledQuantity:OrderByIdResponse.filledQuantity,
        filledValue: OrderByIdResponse.filledQuantity,
        averageFilledPrice: OrderByIdResponse.averageFilledPrice,
        commission: OrderByIdResponse.commission,
        exchangeFee:OrderByIdResponse.exchangeFee 
      };

      console.log(result)

      return result
    } catch (e) {
      return e;
    }
  }

  export async function createOrder(token, body) {
    await sleep(1000);
        const url = `http://localhost:8443/v1/order`;


  const payload = JSON.stringify({
    "productId": body.productId,
    "side": body.side,
    "quantity": parseFloat(body.quantity),
    "limitPrice": parseFloat(body.quantity),
    "type":"ORDER_TYPE_LIMIT",
    "timeInForce": "ORDER_TIME_IN_FORCE_GOOD_UNTIL_CANCELLED"
});


    try {
      const placeNewOrder = await makeCall(token, 'POST', url, payload);

      const createOrderResponse = await placeNewOrder.json();
      return createOrderResponse;
    } catch (e) {
      return e;
    }
  }


  