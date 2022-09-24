import { makeCall } from './ampClient';
import { baseUrl } from '../../constants';

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
export async function fetchOrdersList(token) {
  await sleep(1000);
  const url = `http://${baseUrl}/v1/orders`;

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
  const url = `http://${baseUrl}/v1/order/${orderId}`;

  try {
    const fetchOrderById = await makeCall(token, 'GET', url, '');

    const OrderByIdResponse = await fetchOrderById.json();
    console.log(OrderByIdResponse);
    return OrderByIdResponse;
  } catch (e) {
    return e;
  }
}

export async function createOrder(token, body) {
  await sleep(1000);
  const url = `http://${baseUrl}/v1/order`;

  const payload = JSON.stringify({
    productId: body.productId,
    side: body.side,
    quantity: parseFloat(body.quantity),
    limitPrice: parseFloat(body.quantity),
    type: 'ORDER_TYPE_LIMIT',
    timeInForce: 'ORDER_TIME_IN_FORCE_GOOD_UNTIL_CANCELLED',
  });

  try {
    const placeNewOrder = await makeCall(token, 'POST', url, payload);

    const createOrderResponse = await placeNewOrder.json();
    return createOrderResponse;
  } catch (e) {
    return e;
  }
}
