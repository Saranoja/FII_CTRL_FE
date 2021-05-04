import * as R from 'ramda';

export default function asyncMiddleware() {
	return (next) => (action) => {
		if (!(action.payload instanceof Promise)) {
			return next(action);
		}

		function makeAction(ready, data) {
			const newAction = { ...action, ready, ...data };
			delete newAction.promise;
			return newAction;
		}

		next(makeAction(false));

		return action.payload
			.then((payload) => next(makeAction(true, { payload })))
			.catch((error) => {
				next(
					makeAction(true, {
						error: true,
						payload: {
							message: new Error(error),
							response: R.prop('response', error) || error,
						},
					})
				);
				throw error;
			});
	};
}
