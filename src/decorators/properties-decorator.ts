import 'reflect-metadata';

{
	const POSITIVE_METADATA_KEY = Symbol('positive');

	interface IUserService {
		getUsersCount(): number;
	}

	class UserService implements IUserService {
		private _usersCount = 10;

		getUsersCount(): number {
			return this._usersCount;
		}

		@Validate()
		setUsersCount(@Positive() count: number) {
			this._usersCount = count;
		}
	}

	function Positive() {
		return (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
			const existParams: number[] = Reflect.getOwnMetadata(POSITIVE_METADATA_KEY, target, propertyKey) || [];
			existParams.push(parameterIndex);
			Reflect.defineMetadata(POSITIVE_METADATA_KEY, existParams, target, propertyKey);
		};
	}

	function Validate() {
		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<(...args: any[]) => any>) => {
			const method = descriptor.value;

			// rome-ignore lint/suspicious/noExplicitAny: <explanation>
			descriptor.value = function (...args: any) {
				const positiveParams: number[] = Reflect.getOwnMetadata(POSITIVE_METADATA_KEY, target, propertyKey);

				if (positiveParams) {
					positiveParams.forEach((index) => {
						if (args[index] < 0) {
							throw new Error('Negative value');
						}
					});
				}

				return method?.apply(this, args);
			};
		};
	}

	const userService = new UserService();
	userService.setUsersCount(20);
	console.log(userService.getUsersCount());
	userService.setUsersCount(-20);
}
