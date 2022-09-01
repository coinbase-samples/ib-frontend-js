import { makeCall } from "./ampClient";

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms)); 
  }
//   export async function fetchOrdersList() {
//     await sleep(1000);
  
//     return {
//     "orders":[
//       {
//         clientOrderId:"abc-2022-08-25T19:19:43-04:00",
//         ownerId:"4f5a6336-8101-4634-a458-73b7f6fcf49f",
//         productId:"ETH",
//         side:"buy",
//         type:"market",
//         quantity:0.1234,
//         limitPrice:22000,
//         timeInForce:"",
//         status:"pending",
//         createdAt:"2022-08-25T19:19:43.11668-04:00",
//         updatedAt:"2022-08-25T19:19:43.11668-04:00",
//         filledQuantity:0,
//         filledValue:0,
//         averageFilledPrice:0,
//         commission:0,
//         exchangeFee:0
//       },
//        { 
//       clientOrderId:"abc-2022-08-29T18:32:30-04:00",
//       ownerId:"4f5a6336-8101-4634-a458-73b7f6fcf49f",
//       productId:"SOL",
//       side:"buy",
//       type:"market",
//       quantity:0.1234,
//       limitPrice:22000,
//       timeInForce:"",
//       status:"pending",
//       createdAt:"2022-08-25T19:19:43.11668-04:00",
//       updatedAt:"2022-08-25T19:19:43.11668-04:00",
//       filledQuantity:0,
//       filledValue:0,
//       averageFilledPrice:0,
//       commission:0,
//       exchangeFee:0
//     },
// {
//     clientOrderId:"abc-2022-08-29T18:41:05-04:00",
//     ownerId:"4f5a6336-8101-4634-a458-73b7f6fcf49f",
//     productId:"BTC",
//     side:"buy",
//     type:"market",
//     quantity:0.1234,
//     limitPrice:22000,
//     timeInForce:"",
//     status:"pending",
//     createdAt:"2022-08-25T19:19:43.11668-04:00",
//     updatedAt:"2022-08-25T19:19:43.11668-04:00",
//     filledQuantity:0,
//     filledValue:0,
//     averageFilledPrice:0,
//     commission:0,
//     exchangeFee:0
//   }
// ]
// }  }    

      
    

  export async function fetchOrderDetails(token, orderId) {
    await sleep(1000);
        const url = `http://localhost:8443/v1/order/${orderId}`;

    try {
      const fetchOrderById = await makeCall(token, 'GET', url, '');

      const OrderByIdResponse = await fetchOrderById.json();
      console.log(OrderByIdResponse)
      return OrderByIdResponse;
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
      console.log(createOrderResponse)
      return createOrderResponse;
    } catch (e) {
      return e;
    }
  }


  