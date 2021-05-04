import * as R from 'ramda';
import initialState from './initialState';
import { handleActions } from 'redux-actions';
import {
	uploadFile,
	postFile,
	resetState,
	postFileArticles,
	resetSearch,
} from '../actions';

const fileUploadHandler = [
	uploadFile,
	(state, action) => {
		const { payload } = action;

		const file = R.prop('file', payload);

		return {
			...state,
			isLoading: false,
			current_file: file,
		};
	},
];

const resetStateHandler = [
	resetState,
	(state, action) => {
		return { initialState };
	},
];

const resetSearchHandler = [
	resetSearch,
	(state, action) => {
		return {
			...state,
			current_file: '',
		};
	},
];

const filePostHandler = [
	postFile,
	(state, action) => {
		const { ready, error, payload } = action;

		if (!ready) {
			return {
				...state,
				isLoading: true,
			};
		}

		if (error) {
			return {
				...state,
				hasError: true,
				isLoading: false,
			};
		}

		const response = R.path(['data', 'message'], payload);

		return {
			...state,
			isLoading: false,
			recommendations: response,
		};
	},
];

const filePostArticleHandler = [
	postFileArticles,
	(state, action) => {
		const { ready, error, payload } = action;

		if (!ready) {
			return {
				...state,
				isLoading: true,
			};
		}

		if (error) {
			return {
				...state,
				hasError: true,
				isLoading: false,
			};
		}

		const response = R.path(['data', 'message'], payload);

		return {
			...state,
			isLoading: false,
			articles: response,
		};
	},
];

const reducer = handleActions(
	new Map([
		fileUploadHandler,
		filePostHandler,
		resetStateHandler,
		filePostArticleHandler,
		resetSearchHandler,
	]),
	R.clone(initialState)
);

export default reducer;
