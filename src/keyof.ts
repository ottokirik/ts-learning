{
	interface IUser {
		name: string;
		age: number;
	}

	const getValue =
		<T, K extends keyof T>(obj: T) =>
		(key: K) =>
			obj[key];

	const user: IUser = {
		name: 'John',
		age: 33,
	};

	const userLense = getValue(user);

	console.log(userLense('name'));
}
