---

# IB Frontend Explorer

This application provides sample code that showcases a working Frontend on top of our IB reference implementation. The example UI interacts with both the REST and WebSocket endpoints.

The application was built using [React](https://reactjs.org/), [Cloudscape Design System](https://cloudscape.design/), and [NextJS](https://nextjs.org/).

Requires [Node.js](https://nodejs.org) 16.x+

## Clone the repo

```bash
git clone git@github.com:coinbase-samples/ib-frontend-js.git
```

## Getting started

Init via npm:

```bash
cd ib-frontend-js
npm install
```

## Access credentials

Navigate to the Prime Settings page and pull the API credentials:
```bash
https://prime.coinbase.com/portfolio/{your_portfolio_id}/settings/address-book
```

## Set environment variables

Add the following environment variables to a .env file in base of the repository:

```bash
NX_USERPOOL_ID=us-east-1_...QR
NX_CLIENT_ID=9...45c
NX_API_URL=http://localhost:8443
NX_WS_URL=ws://localhost:8443/ws?alias=
```

Your values will be pulled into constants.js

Validate the values contained in the .env file:

```bash
 source .env
 echo $NX_CLIENT_ID
```


## Run the application

```bash
npm run run:web
```

Navigate to [localhost:{{yourPort}}](http://localhost:{{yourPort}}). You should see the app running.


## Generate a build

```bash
npm run build
```
