import { combineReducers, createStore, applyMiddleware } from "redux";
import { all } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer as oidcReducer } from "redux-oidc";
import kanbanReducer from "store/kanban/reducer";
import kanbanSaga from "./kanban/saga";

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
