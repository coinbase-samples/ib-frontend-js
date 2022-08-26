import React, { useContext, useState, createContext } from 'react';
import { AuthContext } from '../context/authContext';

import {
  //this is your imports for services
  fetchOrderDetails,
  fetchOrdersList,
} from '../services/orders';

const defaultState = {};

export const OrderContext = createContext(defaultState);

const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [orderLoading, setOrderLoading] = useState(true);
  const [fetchingOrderDetail, setFetchingOrderDetail] = useState(false);

  const [orderDetail, setOrderDetail] = useState({});
  const [ordersLoading, setOrdersLoading] = useState(false);
  const { sessionInfo } = useContext(AuthContext);

  const fetchOrderById = async (orderId) => {
    console.log(orderLoading, fetchingOrderDetail);
    if (orderLoading && fetchingOrderDetail) {
      return;
    }
    setFetchingOrderDetail(true);
    const result = await fetchOrderDetails(sessionInfo.accessToken, orderId);
    setOrderDetail(result);
    console.log(orderDetail);

    setOrderLoading(false);
    setFetchingOrderDetail(false);
  };

  const fetchOrders = async () => {
    if (ordersLoading) {
      return;
    }

    setOrdersLoading(true);
    const result = await fetchOrdersList();
    setOrders(result);
    setOrdersLoading(false);
  };

  const state = {
    orderDetail,
    orderLoading,
    fetchingOrderDetail,
    fetchOrderById,
    fetchOrders,
    orders,
    ordersLoading,
  };

  return (
    <OrderContext.Provider value={state}>{children}</OrderContext.Provider>
  );
};

export default OrderProvider;
