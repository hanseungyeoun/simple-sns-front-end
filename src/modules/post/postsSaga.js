import { call, takeLatest, put, all, fork, select, delay } from "redux-saga/effects";
import { postsAction } from './postsSlice';
import * as postsApi from '../../api/posts';

function* getPosts(action) {
  // write here
  const { getPostsSuccess, getPostsError } = postsAction;
  try {
    const payload = yield call(postsApi.getPosts, action.payload)
    yield put(getPostsSuccess({ data: payload.data.data }))
  } catch (error) {
    yield put(getPostsError({ error }));
  }
}


function* sarchPosts(action) {
  // write here
  const { searchPostsSuccess, searchPostsError } = postsAction;
  try {
    const payload = yield call(postsApi.searchPosts, action.payload)
    yield put(searchPostsSuccess({ data: payload.data.data }))
  } catch (error) {
    yield put(searchPostsError({ error }));
  }
}

function* getMyPosts(action) {
  // write here
  const { getMyPostsSuccess, getMyPostsError } = postsAction;
  try {
    const payload = yield call(postsApi.myPosts, action.payload)
    yield put(getMyPostsSuccess({ data: payload.data.data }))
  } catch (error) {
    yield put(getMyPostsError({ error }));
  }
}

function* watchGetPosts() {
  yield takeLatest(postsAction.getPosts, getPosts);
}

function* watchSarchPosts() {
  yield takeLatest(postsAction.searchPosts, sarchPosts);
}

function* watchGetMyPosts() {
  yield takeLatest(postsAction.getMyPosts, getMyPosts);
}

export function* postsSaga() {
  yield all([
    fork(watchGetPosts),
    fork(watchSarchPosts),
    fork(watchGetMyPosts),
  ])
} 