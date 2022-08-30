import React, { useContext, useState, createContext } from 'react';
import { AuthContext } from '../context/authContext';
import _ from 'lodash';

import {
  //this is your imports for services
  fetchOrderDetails,
  fetchOrdersList,
} from '../services/orders';

const defaultState = {};

export const OrderContext = createContext(defaultState);

const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  const [fetchingOrderDetail, setFetchingOrderDetail] = useState(true);
  const [orderDetail, setOrderDetail] = useState({});
  const { sessionInfo } = useContext(AuthContext);
  const [orderLoading, setOrderLoading] = useState(false);

  const fetchOrderById = async (orderId) => {
    console.log('are we fetching order detail? ' + fetchingOrderDetail);
    console.log('is orderDetail loading? ' + orderLoading);

    console.log('are orders loading? ' + ordersLoading);

    if (!orderLoading && fetchingOrderDetail) {
      console.log('api hit');
      setOrderLoading(true);
      const result = await fetchOrderDetails(sessionInfo.accessToken, orderId);
      setOrderDetail(result);
      setFetchingOrderDetail(false);
      setOrderLoading(false);
    }
    setOrderLoading(true);
    const updateOrderDetail = orders?.orders?.find(
      (o) => o.clientOrderId === orderId
    );
    setOrderDetail(updateOrderDetail);
    setFetchingOrderDetail(false);
    setOrderLoading(false);
  };

  const fetchOrders = async () => {
    if (ordersLoading) {
      return;
    }

    setOrdersLoading(true);
    const result = await fetchOrdersList();
    console.log(ordersLoading);
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
