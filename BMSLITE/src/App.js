import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import allReducers from './reducers/index';
import rootSaga from './sagas/Sagas';
import Router from './Routers';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(allReducers, {}, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
export default class App extends Component {
  componentWillMount() {

  }
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}