type ErrorData = {
	errorCode: string | number;
	payload?: Record<string, string | number | boolean>;
};

const errorData = {
	errorCode: 'TIMEOUT_ERROR',
	payload: {
		userId: 1,
	},
} satisfies ErrorData;
