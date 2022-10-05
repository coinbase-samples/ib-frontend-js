import { Api } from '../clients/orderApi'
import { makeCall } from './ampClient';
import { baseUrl } from '../../constants';

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
export async function fetchOrdersList(token) {

  const api = new Api({
    baseUrl,
    baseApiParams: {
      headers: { Authorization: 'Bearer ' + token },
    },
  });
  // const url = `${baseUrl}/v1/orders`;

  try {
    // const fetchOrders = await makeCall(token, 'GET', url, '');
    // const fetchOrdersResponse = await fetchOrders.json();
   const fetchOrdersClient = await api.v1.orderServiceListOrders()
    return fetchOrdersClient.data.data
  } catch (e) {
    return e;
  }
}
 


export async function fetchOrderDetails(token, orderId) {
  await sleep(1000);
  const url = `${baseUrl}/v1/order/${orderId}`;

  try {
    const fetchOrderById = await makeCall(token, 'GET', url, '');

    const OrderByIdResponse = await fetchOrderById.json();
    return OrderByIdResponse;
  } catch (e) {
    return e;
  }
} 
    

  

  export async function createOrder(token, body) {
    let orderType;
    let payload = JSON.stringify({
      "productId": body.productId,
      "side": body.side,
      "quantity": body.quantity,
      "type": "ORDER_TYPE_" + body.orderType,
      "timeInForce": "ORDER_TIME_IN_FORCE_GOOD_UNTIL_CANCELLED"
  });
    await sleep(1000);
        const url = `${baseUrl}/v1/order`;
    
    if(body?.orderType === 'LIMIT'){
      payload = JSON.stringify({
        "productId": body.productId,
        "side": body.side,
        "limitPrice": body.limitPrice,
        "quantity": body.quantity,
        "type": "ORDER_TYPE_" + body.orderType,
        "timeInForce": "ORDER_TIME_IN_FORCE_GOOD_UNTIL_CANCELLED"
    });
    }

    
    try {
      const placeNewOrder = await makeCall(token, 'POST', url, payload);

      const createOrderResponse = await placeNewOrder.json();
      return createOrderResponse;
    } catch (e) {
      return e;
    }
  }


  export async function cancelOrder(token, orderId) {
    await sleep(1000);
      const url = `${baseUrl}/v1/order/${orderId}`;
    

  const payload = JSON.stringify({
    "status":"ORDER_STATUS_CANCELLED",
    
});


    try {
      const placeCancelOrder = await makeCall(token, 'PUT', url, payload);

      const cancelOrderResponse = await placeCancelOrder.json();
      return cancelOrderResponse
    } catch (e) {
      return e;
    }
  }
