{
	interface User {
		name: string;
		email: string;
		age?: number;
	}

	type RequiredType = Required<User>;
	type ReadonlyType = Readonly<User>;
	type RequiredAndReadonlyType = Required<Readonly<User>>;

	interface PaymentPersistent {
		id: string;
		amount: number;
		from: string;
		to: string;
	}

	type Payment = Omit<PaymentPersistent, 'id'>;
	type PaymentRequisites = Pick<PaymentPersistent, 'from' | 'to'>;

	type ExtractEx = Extract<'from' | 'to' | PaymentPersistent, string>;
	type ExcludeEx = Exclude<'from' | 'to' | PaymentPersistent, string>;
}

{
	class User {
		constructor(public id: number, public name: string) {}
	}

	function getUser(id: number) {
		return new User(id, 'John');
	}

	type GetUserType = ReturnType<typeof getUser>;
	type GetUserParametersType = Parameters<typeof getUser>;
	type GetUserParametersTypeFirst = GetUserParametersType[0];

	type UserConstructorParametersType = ConstructorParameters<typeof User>;

	type A = Awaited<Promise<string>>;
}
