import React, { useState, useEffect, useContext, createContext } from 'react';

import useWebSocket, { ReadyState } from 'react-use-websocket';
import { AuthContext } from './authContext';

const wsUrl = 'ws://localhost:8443/ws?alias=';

const defaultState = {
  assets: [],
  orders: [],
};

export const WebsocketContext = createContext(defaultState);

const WebsocketProvider = ({ children }) => {
  const [websocketUrl, setWebsocketUrl] = useState(wsUrl);
  const [assets, setAssets] = useState([
    { ticker: 'BTC_USD', price: '22888.11' },
  ]);
  const [orders, setOrders] = useState([
    { orderId: '1', productId: 'BTC_USD' },
  ]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(websocketUrl);

  const { sessionInfo } = useContext(AuthContext);

  useEffect(() => {
    if (!lastMessage?.data) return;
    console.log('lastMessage', lastMessage);
    const rawMessage = JSON.parse(lastMessage.data);
    if (rawMessage?.type === 'assets') {
      const newAssets = JSON.parse(rawMessage.body);
      console.log('updated assets', newAssets);
      setAssets(newAssets);
    }
    if (rawMessage?.type === 'orders') {
      const newOrders = JSON.parse(rawMessage.body);
      console.log('updated orders', newOrders);
      setOrders(newOrders);
    }
  }, [lastMessage]);

  useEffect(() => {
    console.log('readystate', readyState);
    if (sessionInfo?.sub && websocketUrl !== wsUrl + sessionInfo.sub) {
      setWebsocketUrl(wsUrl + sessionInfo.sub);
    }
  }, [sessionInfo]);

  const state = {
    connected: readyState,
    assets,
    orders,
  };

  return (
    <WebsocketContext.Provider value={state}>
      {children}
    </WebsocketContext.Provider>
  );
};

export default WebsocketProvider;
