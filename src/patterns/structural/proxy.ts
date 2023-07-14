interface IPaymentAPI {
	getPaymentDetails(id: number): IPaymentDetails | undefined;
}

interface IPaymentDetails {
	id: number;
	sum: number;
	status: string;
}

class PaymentAPI implements IPaymentAPI {
	getPaymentDetails(id: number) {
		const result = { id, sum: 100, status: 'success' };
		console.log(JSON.stringify(result, null, 2));

		return result;
	}
}

class PaymentAccessProxy implements IPaymentAPI {
	constructor(private api: IPaymentAPI, private userId: number) {}

	getPaymentDetails(id: number) {
		if (this.userId !== 10) return;
		return this.api.getPaymentDetails(id);
	}
}

const successProxy = new PaymentAccessProxy(new PaymentAPI(), 10);
console.log(successProxy.getPaymentDetails(1));

const errorProxy = new PaymentAccessProxy(new PaymentAPI(), 11);
console.log(errorProxy.getPaymentDetails(1));
