
import { makeCall } from './ampClient';
import { baseUrl } from '../../constants';


const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
export async function fetchOrdersList(token) {
  const url = `${baseUrl}/v1/orders`;

  try {
    const fetchOrders = await makeCall(token, 'GET', url, '');
    const fetchOrdersResponse = await fetchOrders.json();
    return fetchOrdersResponse.data;
  } catch (e) {
    return e;
  }
}
 


export async function fetchOrderDetails(token, orderId) {
  await sleep(1000);
  const url = `${baseUrl}/v1/orders/${orderId}`;

  try {
    const fetchOrderById = await makeCall(token, 'GET', url, '');

    const OrderByIdResponse = await fetchOrderById.json();
    return OrderByIdResponse;
  } catch (e) {
    return e;
  }
} 
    

  

  export async function createOrder(token, body) {
    await sleep(1000);
        const url = `${baseUrl}/v1/order`;
    

  const payload = JSON.stringify({
    "productId": body.productId,
    "side": body.side,
    "quantity": body.quantity,
    "type": "ORDER_TYPE_" + body.orderType,
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


  export async function cancelOrder(token, body) {
    await sleep(1000);
        //const url = `${baseUrl}/v1/order`;
    

//   const payload = JSON.stringify({
//     "productId": body.productId,
//     "side": body.side,
//     "quantity": body.quantity,
//     "type":"ORDER_TYPE_MARKET",
//     "timeInForce": "ORDER_TIME_IN_FORCE_GOOD_UNTIL_CANCELLED"
// });


    // try {
      // const placeCancelOrder = await makeCall(token, 'POST', url, payload);

      // const cancelOrderResponse = await placeCancelOrder.json();
      return {
        "orderId": "05af41ba-c5d9-419f-b1b6-695e32ca38ae",
        "ownerId": "4f5a6336-8101-4634-a458-73b7f6fcf49f",
        "productId": "BTC_USD",
        "side": "ORDER_SIDE_BUY",
        "type": "ORDER_TYPE_MARKET",
        "quantity": "0.001",
        "limitPrice": "",
        "timeInForce": "ORDER_TIME_IN_FORCE_UNSPECIFIED",
        "status": "ORDER_STATUS_CANCELLED",
        "createdAt": "2022-09-28T20:24:40.701Z",
        "updatedAt": "2022-09-28T20:24:40.701Z",
        "filledQuantity": "",
        "filledValue": "",
        "averageFilledPrice": "",
        "commission": "",
        "exchangeFee": ""
      }
    // } catch (e) {
    //   return e;
    // }
  }
