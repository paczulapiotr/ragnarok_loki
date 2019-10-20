import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer as oidcReducer } from "redux-oidc";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import kanbanReducer from "store/kanban/reducer.ts";
import kanbanSaga from "store/kanban/saga.ts";

function* rootSaga() {
  yield all([kanbanSaga()]);
}

const rootCommon = {
  oidc: oidcReducer
};

const rootReducer = combineReducers({
  ...rootCommon,
  kanban: kanbanReducer
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

export default store;
