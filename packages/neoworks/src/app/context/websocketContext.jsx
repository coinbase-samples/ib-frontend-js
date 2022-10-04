import React, { useState, useEffect, useContext, createContext } from 'react';

import useWebSocket, { ReadyState } from 'react-use-websocket';
import { AuthContext } from './authContext';

const wsUrl = 'wss://api-dev.neoworks.xyz/ws?alias=';

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

  const { sendMessage, lastMessage, readyState } = useWebSocket(websocketUrl);
  const { sessionInfo } = useContext(AuthContext);
  console.log(!lastMessage?.data);
  useEffect(() => {
    // console.log('hit use effect', lastMessage);
    if (!lastMessage?.data) return;
    const rawMessage = JSON.parse(lastMessage?.data);
    // console.log('lastMessage', lastMessage, 'rawMessage', rawMessage);

    if (rawMessage?.type === 'assets') {
      const newAssets = JSON.parse(rawMessage.body);
      // console.log('updated assets', newAssets);
      setAssetFeed(newAssets);
    }
    if (rawMessage?.type === 'orders') {
      const newOrders = JSON.parse(rawMessage.body);
      // console.log('updated orders', newOrders);
      setOrderFeed(newOrders);
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
