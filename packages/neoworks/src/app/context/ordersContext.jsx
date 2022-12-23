import { useContext, useState, createContext } from 'react';
import { AuthContext } from '../context/authContext';
import {
  fetchOrderDetails,
  fetchOrdersList,
  createOrder,
  cancelOrder,
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
  const [cancelOrderLoading, setCancelOrderLoading] = useState(false);
  const [orderFail, setOrderFail] = useState(false);
  const [sorting, setSorting] = useState(false);
  const fetchOrderById = async (orderId) => {
    if (!orderLoading && fetchingOrderDetail) {
      setOrderLoading(true);
      const result = await fetchOrderDetails(sessionInfo.accessToken, orderId);
      setOrderDetail(result);

      setFetchingOrderDetail(false);
      setOrderLoading(false);
    } else {
      setOrderLoading(true);
      const updateOrderDetail = orders?.find((o) => o.orderId === orderId);
      setOrderDetail(updateOrderDetail);
      setFetchingOrderDetail(false);
      setOrderLoading(false);
    }
  };

  const fetchOrders = async (token) => {
    if (ordersLoading) {
      return;
    }

    setOrdersLoading(true);
    const result = await fetchOrdersList(token);
    if (!result.length) {
      setOrders([]);
      setOrdersLoading(false);
    } else {
      const fetchedOrders = result.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setOrders(fetchedOrders);
      setOrdersLoading(false);
    }
  };
  const sortOrders = async (event) => {
    let sortedOrders;
    if (ordersLoading) {
      return;
    }
    setOrdersLoading(true);
    setSorting(true);
    const sortedType = event.detail.sortingColumn.sortingField;
    if (sorting) {
      sortedOrders = orders.sort(
        (a, b) => sortedType && new Date(b.createdAt) - new Date(a.createdAt)
      );
      setSorting(false);
    } else {
      sortedOrders = orders.sort(
        (a, b) => sortedType && new Date(a.createdAt) - new Date(b.createdAt)
      );
      setSorting(true);
    }
    setOrders(sortedOrders);
    setOrdersLoading(false);
  };

  const currentOrder = async (body) => {
    try {
      setNewOrderLoading(true);
      const result = await createOrder(sessionInfo.accessToken, body);
      if (result.httpStatus > '201') {
        setOrderDetail({
          httpStatus: result.httpStatus,
          response: result.response,
        });
        setNewOrderLoading(false);
        setOrderFail(true);
      } else {
        const executedOrder = {
          httpStatus: result.httpStatus,
          orderId: result.response.orderId,
          ownerId: result.response.ownerId,
          productId: result.response.productId,
          side: result.response.side.slice(11),
          type: result.response.type.slice(11),
          quantity: result.response.quantity,
          limitPrice: result.response.limitPrice,
          timeInForce: result.response.timeInForce.slice(20),
          status: result.response.status,
          createdAt: result.response.createdAt,
          updatedAt: result.response.updatedAt,
          filledQuantity: result.response.filledQuantity,
          filledValue: result.response.filledValue,
          averageFilledPrice: result.response.averageFilledPrice,
          commission: result.response.commission,
          exchangeFee: result.response.exchangeFee,
          cancelReason: result.response.cancelReason,
          failureReason: result.response.failureReason,
        };

        setOrders([...orders, executedOrder]);

        setOrderDetail(executedOrder);
        setNewOrderLoading(false);
      }
    } catch (e) {
      return e;
    }
  };

  const placeCancelOrder = async (orderId) => {
    try {
      setCancelOrderLoading(true);
      const result = await cancelOrder(sessionInfo.accessToken, orderId);
      setOrders([...orders, result]);

      setOrderDetail(result);
      setCancelOrderLoading(false);
    } catch (e) {
      return e;
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
    sortOrders,
    placeCancelOrder,
    cancelOrderLoading,
    orderFail,
  };

  return (
    <OrderContext.Provider value={state}>{children}</OrderContext.Provider>
  );
};

export default OrderProvider;
