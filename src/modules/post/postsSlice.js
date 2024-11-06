// write here
import { createSlice } from "@reduxjs/toolkit";
import { reducerUtils } from '../../util/async.utill';

const initialState = {
  posts: reducerUtils.initial(),
  searchPosts: reducerUtils.initial(),
  myPosts: reducerUtils.initial(),
}

const name = 'posts';

const slice = createSlice({
  name,
  initialState,
  reducers: {
    getPosts(state) {
      state.posts = reducerUtils.loading();
    },
    getPostsSuccess(state, { payload }) {
      state.posts = reducerUtils.success(payload.data);
    },
    getPostsError(state, { payload }) {
      state.posts = reducerUtils.error(payload.error);
    },
    searchPosts(state) {
      state.searchPosts = reducerUtils.loading();
    },
    searchPostsSuccess(state, { payload }) {
      state.searchPosts = reducerUtils.success(payload.data);
    },
    searchPostsError(state, { payload }) {
      state.searchPosts = reducerUtils.error(payload.error);
    },
    getMyPosts(state) {
      state.searchPosts = reducerUtils.loading();
    },
    getMyPostsSuccess(state, { payload }) {
      state.myPosts = reducerUtils.success(payload.data);
    },
    getMyPostsError(state, { payload }) {
      state.myPosts = reducerUtils.error(payload.error);
    },
    togleLike(state, { payload }) {
      const post = state.posts.data.content.find(post => post.id === payload);
      post.isLike = !post.isLike
    },
    addComment(state, { payload }) {
      const post = state.posts.data.content.find(post => post.id === payload.id);
      if (!post.comments) {
        post.comments = [];
      }

      post.comments.push(payload);
    }
  }
})

export const postsReducer = slice.reducer;
export const postsAction = slice.actions;
export const POSTS = slice.name