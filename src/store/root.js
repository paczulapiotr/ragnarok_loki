import { combineReducers, createStore, applyMiddleware } from 'redux';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as oidcReducer } from 'redux-oidc';

function* rootSaga() {
  yield all([
    // commonSaga(),
  ]);
}

const rootCommon = {
  oidc: oidcReducer,
};

const rootReducer = combineReducers({
  ...rootCommon,
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware),
  ),
);
sagaMiddleware.run(rootSaga);

export default store;
