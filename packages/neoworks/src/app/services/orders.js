import { Api } from '../clients/orderApi';
import { makeCall } from './ampClient';
import { baseUrl } from '../../constants';

export async function fetchOrdersList(token) {
  const api = new Api({
    baseUrl,
    baseApiParams: {
      headers: { Authorization: 'Bearer ' + token },
    },
  });

  try {
    const fetchOrdersClient = await api.v1.orderServiceListOrders();

    const rename = fetchOrdersClient.data.data.map((o) => {
      o.side = o.side.slice(11);
      o.status = o.status.slice(13);
      o.timeInForce = o.timeInForce.slice(20);

      return o;
    });

    return rename;
  } catch (e) {
    return e;
  }
}

export async function fetchOrderDetails(token, orderId) {
  const url = `${baseUrl}/v1/order/${orderId}`;

  try {
    const fetchOrderById = await makeCall(token, 'GET', url, '');

    const OrderByIdResponse = await fetchOrderById.json();

    const resp = {
      orderId: OrderByIdResponse.orderId,
      ownerId: OrderByIdResponse.ownerId,
      productId: OrderByIdResponse.productId,
      side: OrderByIdResponse.side.slice(11),
      type: OrderByIdResponse.type.slice(11),
      quantity: OrderByIdResponse.quantity,
      limitPrice: OrderByIdResponse.limitPrice,
      timeInForce: OrderByIdResponse.timeInForce.slice(20),
      status: OrderByIdResponse.status.slice(13),
      createdAt: OrderByIdResponse.createdAt,
      updatedAt: OrderByIdResponse.updatedAt,
      filledQuantity: OrderByIdResponse.filledQuantity,
      filledValue: OrderByIdResponse.filledValue,
      averageFilledPrice: OrderByIdResponse.averageFilledPrice,
      commission: OrderByIdResponse.commission,
      exchangeFee: OrderByIdResponse.exchangeFee,
      cancelReason: OrderByIdResponse.cancelReason,
      failureReason: OrderByIdResponse.failureReason,
    };

    return resp;
  } catch (e) {
    return e;
  }
}

export async function createOrder(token, body) {
  let payload = JSON.stringify({
    productId: body.productId,
    side: body.side,
    quantity: body.quantity,
    type: 'ORDER_TYPE_' + body.orderType,
    timeInForce: 'ORDER_TIME_IN_FORCE_' + body.timeInForceType,
  });
  const url = `${baseUrl}/v1/order`;

  if (body?.orderType === 'LIMIT') {
    payload = JSON.stringify({
      productId: body.productId,
      side: body.side,
      limitPrice: body.limitPrice,
      quantity: body.quantity,
      type: 'ORDER_TYPE_' + body.orderType,
      timeInForce: 'ORDER_TIME_IN_FORCE_' + body.timeInForceType,
      expiry_time: body.expiry_time,
    });
  }

  try {
    const placeNewOrder = await makeCall(token, 'POST', url, payload);

    const createOrderResponse = await placeNewOrder.orderResponse.json();
    return {
      httpStatus: placeNewOrder?.httpStatus,
      orderResponse: createOrderResponse,
    };
  } catch (e) {
    return e;
  }
}

export async function cancelOrder(token, orderId) {
  const url = `${baseUrl}/v1/order/${orderId}`;

  const payload = JSON.stringify({
    status: 'ORDER_STATUS_CANCELLED',
  });

  try {
    const placeCancelOrder = await makeCall(token, 'PUT', url, payload);

    const cancelOrderResponse = await placeCancelOrder.json();
    return cancelOrderResponse;
  } catch (e) {
    return e;
  }
}
