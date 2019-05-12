// all paths start from src/ unless using relative paths
// libs
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from "redux-thunk";
import createHistory from "history/createBrowserHistory";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter, routerMiddleware } from "react-router-redux";

// components
import ConnectedNavigation from "components/navigation/ConnectedNavigation";

// features
import ConnectedLog from "features/stats/ConnectedStats";

// reducers
import reducers from "dux/reducers";

// pages
import Monitor from "pages/monitor/Monitor";

// css
import "index.css";

// html
import "index.html";

// Create a history of your choosing (we"re using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = [
  ReduxThunk,
  routerMiddleware( history ),
];

// the store
// const store = createStore( reducers, applyMiddleware( ...middleware ) );
const store = createStore( reducers, composeWithDevTools(
  applyMiddleware( ...middleware ),
  // other store enhancers if any
) );

let StatsOn = false;

const togglePanel = function(){
  console.log( "toggling panel");
  StatsOn = !StatsOn;  
}


// the app
render(
  <Provider store={ store }>
    <ConnectedRouter history={ history }>
      <div className="intel-demo-container">
        <Route component={ ConnectedNavigation } />
        <ConnectedLog />
        <Route exact path="/" component={ Monitor } />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById( "app" ),
);
