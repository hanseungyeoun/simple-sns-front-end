import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all, call } from "redux-saga/effects";
import { usersReducer, USERS } from "./users/usersSlice";
import { usersSaga } from "./users/usersSaga";
import { postsReducer, POSTS } from './post/postsSlice';
import { postsSaga } from './post/postsSaga';
import logger from "redux-logger";


export const rootReducer = combineReducers({
  [USERS]: usersReducer,
  [POSTS]: postsReducer
});

const sagaMiddleware = createSagaMiddleware(
  // { context: { history: null } }
);

function* rootSaga() {
  yield all([
    call(usersSaga),
    call(postsSaga),
  ]);
}

export default function createStore() {
  const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(sagaMiddleware).concat(logger),
  });

  sagaMiddleware.run(rootSaga);

  return store;
}


