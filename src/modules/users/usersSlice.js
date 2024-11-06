import { createSlice } from '@reduxjs/toolkit';
import { reducerUtils } from '../../util/async.utill';
import localStore from '../../util/localStore'
import { getUserDetails } from '../../api/users';

const initialState = {
	isLogin: !!localStore.getToken(),
	accessToken: localStore.getToken(),
	user: reducerUtils.initial(localStore.getUser()),
	userDatails: reducerUtils.initial()
};

const name = 'users';

const slice = createSlice({
	name,
	initialState,
	reducers: {
		login(state, { payload }) {
			state.user = reducerUtils.loading(state.user)
		},
		loginSuccess(state, { payload }) {
			console.log("payload :", payload.data)
			console.log("accessToken :", payload.data.accessToken)

			localStore.saveUser(payload.data)
			localStore.saveToken(payload.data.accessToken)
			state.user = reducerUtils.success(payload);
		},
		loginError(state, { payload }) {
			state.user = reducerUtils.error(payload)
		},
		setIsLogin(state, { payload }) {
			state.isLogin = payload
		},
		getUserDetails(state) {
			state.userDatails = reducerUtils.initial();
		},
		getUserDetailsSuccess(state, { payload }) {
			state.userDatails = reducerUtils.success(payload.data);
		},
		getUserDetailsError(state, { payload }) {
			state.user = reducerUtils.error(payload)
		},
		logout(state) {
			localStore.destroyToken();
			localStore.destroyUser();
			state.isLogin = false;
			state.user = reducerUtils.initial();
			state.accessToken = null;
		}
	}
});

export const usersReducer = slice.reducer;
export const usersAction = slice.actions;
export const USERS = slice.name;