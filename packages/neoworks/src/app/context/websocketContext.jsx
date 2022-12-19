import React, { useState, useEffect, useContext, createContext } from 'react';

import useWebSocket, { ReadyState } from 'react-use-websocket';
import { AuthContext } from './authContext';
import { webSocketHost } from '../../constants';

const wsUrl = webSocketHost;

const defaultState = {
  assetFeed: [],
  orderFeed: [],
};

export const WebsocketContext = createContext(defaultState);

const WebsocketProvider = ({ children }) => {
  const [websocketUrl, setWebsocketUrl] = useState(wsUrl);
  const [assetFeed, setAssetFeed] = useState([
    { ticker: 'BTC_USD', price: '22888.11' },
  ]);
  const [orderFeed, setOrderFeed] = useState([
    { orderId: '1', productId: 'BTC_USD' },
  ]);

  const { lastMessage, readyState } = useWebSocket(websocketUrl);
  const { sessionInfo } = useContext(AuthContext);
  useEffect(() => {
    if (!lastMessage?.data) return;
    const rawMessage = JSON.parse(lastMessage?.data);

    if (rawMessage?.type === 'assets') {
      const newAssets = JSON.parse(rawMessage.body);
      setAssetFeed(newAssets);
    }
    if (rawMessage?.type === 'order') {
      const newOrders = JSON.parse(rawMessage?.body);
      setOrderFeed(newOrders);
    }
  }, [lastMessage]);

  useEffect(() => {
    if (sessionInfo?.sub && websocketUrl !== wsUrl + sessionInfo.sub) {
      setWebsocketUrl(wsUrl + sessionInfo.sub);
    }
  }, [sessionInfo]);

  const state = {
    connected: readyState,
    assetFeed,
    orderFeed,
  };

  return (
    <WebsocketContext.Provider value={state}>
      {children}
    </WebsocketContext.Provider>
  );
};

export default WebsocketProvider;
