import { useContext, useState, createContext } from 'react';
import { AuthContext } from '../context/authContext';
import {
  //this is your imports for services
  fetchOrderDetails,
  fetchOrdersList,
  createOrder,
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
  const [newOrderLoading, setNewOrderLoading] = useState(false);

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
    const updateOrderDetail = orders?.find((o) => o.orderId === orderId);
    setOrderDetail(updateOrderDetail);
    setFetchingOrderDetail(false);
    setOrderLoading(false);
  };

  const fetchOrders = async () => {
    if (ordersLoading) {
      return;
    }
    setOrdersLoading(true);
    // const result = orders;
    const result = await fetchOrdersList(sessionInfo.accessToken);
    setOrders(result);
    setOrdersLoading(false);
  };

  const currentOrder = async (body) => {
    try {
      setNewOrderLoading(true);
      const result = await createOrder(sessionInfo.accessToken, body);
      setOrders([...orders, result]);

      // setLastOrder(result);
      setOrderDetail(result);
      setNewOrderLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const state = {
    orderDetail,
    orderLoading,
    fetchingOrderDetail,
    fetchOrderById,
    fetchOrders,
    orders,
    ordersLoading,
    currentOrder,
    newOrderLoading,
  };

  return (
    <OrderContext.Provider value={state}>{children}</OrderContext.Provider>
  );
};

export default OrderProvider;
