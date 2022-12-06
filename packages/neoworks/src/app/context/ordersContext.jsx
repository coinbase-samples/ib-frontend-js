import { useContext, useState, createContext } from 'react';
import { AuthContext } from '../context/authContext';
import {
  //this is your imports for services
  fetchOrderDetails,
  fetchOrdersList,
  createOrder,
  cancelOrder,
} from '../services/orders';
import _ from 'lodash';

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
      const fetchedOrders = _.orderBy(result, ['createdAt'], ['desc']);
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
      sortedOrders = _.orderBy(orders, [sortedType], ['asc']);
      setSorting(false);
    } else {
      sortedOrders = _.orderBy(orders, [sortedType], ['desc']);
      setSorting(true);
    }
    setOrders(sortedOrders);
    setOrdersLoading(false);
  };

  const currentOrder = async (body) => {
    try {
      setNewOrderLoading(true);
      const result = await createOrder(sessionInfo.accessToken, body);
      console.log('!!!', result);
      if (result.httpStatus > '201') {
        console.log('failed');
        setOrderDetail({
          httpStatus: result.httpStatus,
          orderResponse: result.orderResponse,
        });
        setNewOrderLoading(false);
      } else {
        console.log(result);
        const executedOrder = {
          httpStatus: result.httpStatus,
          orderId: result.orderResponse.orderId,
          ownerId: result.orderResponse.ownerId,
          productId: result.orderResponse.productId,
          side: result.orderResponse.side,
          type: result.orderResponse.type,
          quantity: result.orderResponse.quantity,
          limitPrice: result.orderResponse.limitPrice,
          timeInForce: result.orderResponse.timeInForce,
          status: result.orderResponse.status,
          createdAt: result.orderResponse.createdAt,
          updatedAt: result.orderResponse.updatedAt,
          filledQuantity: result.orderResponse.filledQuantity,
          filledValue: result.orderResponse.filledValue,
          averageFilledPrice: result.orderResponse.averageFilledPrice,
          commission: result.orderResponse.commission,
          exchangeFee: result.orderResponse.exchangeFee,
          cancelReason: result.orderResponse.cancelReason,
          failureReason: result.orderResponse.failureReason,
        };

        setOrders([...orders, executedOrder]);

        // setLastOrder(result);
        setOrderDetail(executedOrder);
        setNewOrderLoading(false);
      }
    } catch (e) {
      console.log('error', e);
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
    sortOrders,
    placeCancelOrder,
    cancelOrderLoading,
  };

  return (
    <OrderContext.Provider value={state}>{children}</OrderContext.Provider>
  );
};

export default OrderProvider;
