function isString(x: unknown): x is string {
	return typeof x === 'string';
}

function logId(id: number | string) {
	if (isString(id)) {
		console.log(id.toUpperCase());
	} else {
		console.log(id);
	}
}

interface Admin {
	name: string;
	role: number;
}

interface User {
	name: string;
	age: number;
}

function isAdmin(user: User | Admin): user is Admin {
	return 'role' in user;
}

interface IPayment {
	sum: number;

	from: number;

	to: number;
}

enum PaymentStatus {
	Success = 'success',
	Failed = 'failed',
}

type IPaymentRequest = IPayment;

interface IDataSuccess extends IPayment {
	databaseId: number;
}

interface IDataFailed {
	errorMessage: string;
	errorCode: number;
}

interface IResponseSuccess {
	status: PaymentStatus.Success;
	data: IDataSuccess;
}

interface IResponseFailed {
	status: PaymentStatus.Failed;
	data: IDataFailed;
}

type f = (res: IResponseSuccess | IResponseFailed) => number;

function isResponseSuccess(data: IResponseSuccess | IResponseFailed): data is IResponseSuccess {
	return data.status === PaymentStatus.Success;
}
