import React, { useState, createContext } from 'react';

import {
  //this is your imports for services
  fetchOrderDetails,
  fetchOrdersList,
} from '../services/orders';

const defaultState = {};

export const OrderContext = createContext(defaultState);

const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderDetail, setOrderDetail] = useState({});
  const [ordersLoading, setOrdersLoading] = useState(false);

  const fetchOrderById = async (orderId) => {
    if (loading) {
      return;
    }
    setLoading(true);
    const result = await fetchOrderDetails(orderId);
    setOrderDetail(result);
    setLoading(false);
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
    loading,
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
