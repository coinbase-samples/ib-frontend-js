const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms)); 
  }
  export async function fetchOrdersList() {
    await sleep(1000);
    return {
      "orders":[
        {
          order_Id:  "1111212152454545454",
          user_id: "42",
          portfolio_id: "3e1fe27e-26fe-46d8-b118-c752a2ae6b47",
          product_id: "BTC",
          side: "BUY",
          client_order_id: "f69a20b1-4ac4-420e-90b5-814a12565bfa",
          type: "MARKET",
          base_quantity: "50",
          quote_value: "100",
          limit_price: "50.12",
          start_time: "2021-05-31T09:59:59Z",
          expiry_time: "2021-05-31T10:59:59Z",
          status: "OPEN",
          time_in_force: "GOOD_UNTIL_DATE_TIME",
          created_at: "2021-05-31T10:59:59Z",
          filled_quantity: "100",
          filled_value: "100",
          average_filled_price: "50.19",
          commission: "4.99",
          exchange_fee: "2.50"
        },
        {
          order_Id:  "222222221215245454545454545454",
          user_id: "42",
          portfolio_id: "3e1fe27e-26fe-46d8-b118-c752a2ae6b47",
          product_id: "ETH",
          side: "BUY",
          client_order_id: "f69a20b1-4ac4-420e-90b5-814a12565bfa",
          type: "LIMIT",
          base_quantity: "50",
          quote_value: "100",
          limit_price: "50.12",
          start_time: "2021-05-31T09:59:59Z",
          expiry_time: "2021-05-31T10:59:59Z",
          status: "OPEN",
          time_in_force: "GOOD_UNTIL_DATE_TIME",
          created_at: "2021-05-31T10:59:59Z",
          filled_quantity: "1",
          filled_value: "1",
          average_filled_price: "50.19",
          commission: "4.99",
          exchange_fee: "2.50"
        },
        {
          order_Id:  "333332152454545333",
          user_id: "42",
          portfolio_id: "3e1fe27e-26fe-46d8-b118-c752a2ae6b47",
          product_id: "ETH",
          side: "SELL",
          client_order_id: "f69a20b1-4ac4-420e-90b5-814a12565bfa",
          type: "LIMIT",
          base_quantity: "50",
          quote_value: "100",
          limit_price: "50.12",
          start_time: "2021-05-31T09:59:59Z",
          expiry_time: "2021-05-31T10:59:59Z",
          status: "OPEN",
          time_in_force: "GOOD_UNTIL_DATE_TIME",
          created_at: "2021-05-31T10:59:59Z",
          filled_quantity: "1",
          filled_value: "1",
          average_filled_price: "50.19",
          commission: "4.99",
          exchange_fee: "2.50"
        },
        {
          order_Id:  "444422221215245454545454545454",
          user_id: "42",
          portfolio_id: "3e1fe27e-26fe-46d8-b118-c752a2ae6b47",
          product_id: "SOL",
          side: "BUY",
          client_order_id: "f69a20b1-4ac4-420e-90b5-814a12565bfa",
          type: "LIMIT",
          base_quantity: "50",
          quote_value: "100",
          limit_price: "50.12",
          start_time: "2021-05-31T09:59:59Z",
          expiry_time: "2021-05-31T10:59:59Z",
          status: "OPEN",
          time_in_force: "GOOD_UNTIL_DATE_TIME",
          created_at: "2021-05-31T10:59:59Z",
          filled_quantity: "1",
          filled_value: "1",
          average_filled_price: "50.19",
          commission: "4.99",
          exchange_fee: "2.50"
        },
        {
          order_Id:  "55552152454545333",
          user_id: "42",
          portfolio_id: "3e1fe27e-26fe-46d8-b118-c752a2ae6b47",
          product_id: "BTC",
          side: "SELL",
          client_order_id: "f69a20b1-4ac4-420e-90b5-814a12565bfa",
          type: "MARKET",
          base_quantity: "50",
          quote_value: "100",
          limit_price: "50.12",
          start_time: "2021-05-31T09:59:59Z",
          expiry_time: "2021-05-31T10:59:59Z",
          status: "OPEN",
          time_in_force: "GOOD_UNTIL_DATE_TIME",
          created_at: "2021-05-31T10:59:59Z",
          filled_quantity: "1",
          filled_value: "1",
          average_filled_price: "50.19",
          commission: "4.99",
          exchange_fee: "2.50"
        },
      ]
      }}
    

  export async function fetchOrderDetails(orderId) {
    await sleep(1000);
    return {
        "order": {
          orderId,
          user_id: "42",
          portfolio_id: "3e1fe27e-26fe-46d8-b118-c752a2ae6b47",
          product_id: "BTC",
          side: "BUY",
          client_order_id: "f69a20b1-4ac4-420e-90b5-814a12565bfa",
          type: "MARKET",
          base_quantity: "50",
          quote_value: "100",
          limit_price: "50.12",
          start_time: "2021-05-31T09:59:59Z",
          expiry_time: "2021-05-31T10:59:59Z",
          status: "OPEN",
          time_in_force: "GOOD_UNTIL_DATE_TIME",
          created_at: "2021-05-31T10:59:59Z",
          filled_quantity: "100",
          filled_value: "100",
          average_filled_price: "50.19",
          commission: "4.99",
          exchange_fee: "2.50"
        }
      }
  }
  