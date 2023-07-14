{
	interface IUserService {
		usersCount: number;
		getUsersCount(): number;
	}

	class UserService implements IUserService {
		@Max(100)
		usersCount = 10;

		@Catch()
		getUsersCount(): number {
			return this.usersCount;
		}
	}

	function Catch({ rethrow }: { rethrow: boolean } = { rethrow: true }) {
		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		return (target: Object, _: string, descriptor: TypedPropertyDescriptor<(...args: any[]) => any>) => {
			const method = descriptor.value;
			// rome-ignore lint/suspicious/noExplicitAny: <explanation>
			descriptor.value = (...args: any[]) => {
				try {
					return method?.apply(target, args);
				} catch (error) {
					if (error instanceof Error) {
						console.log(error.message);
						if (rethrow) {
							throw error;
						}
					}
				}
			};
		};
	}

	function Max(max: number) {
		return (target: Object, propertyKey: string | symbol) => {
			let value: number;

			const setter = (newValue: number) => {
				if (newValue > max) {
					throw new Error(`Max value: ${max}`);
				}

				value = newValue;
			};

			const getter = () => value;

			Object.defineProperty(target, propertyKey, {
				get: getter,
				set: setter,
			});
		};
	}

	const userService = new UserService();
	console.log(userService.getUsersCount());
	userService.usersCount = 101;
}
