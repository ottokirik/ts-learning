interface IMiddleware<T> {
	next(middleware: IMiddleware<T>): IMiddleware<T>;
	handle(data: T): T;
}

abstract class AbstractMiddleware<T> implements IMiddleware<T> {
	private nextMiddleware: IMiddleware<T>;

	next(middleware: IMiddleware<T>): IMiddleware<T> {
		this.nextMiddleware = middleware;
		return this.nextMiddleware;
	}
	handle(data: T): T {
		if (this.nextMiddleware) {
			return this.nextMiddleware.handle(data);
		}

		return data;
	}
}

class AuthMiddleware extends AbstractMiddleware<string> {
	override handle(data: string) {
		console.log('AuthMiddleware', data);

		if (data === 'auth') {
			return super.handle(data);
		}

		return 'Ошибка авторизации';
	}
}

class ValidateMiddleware extends AbstractMiddleware<string> {
	override handle(data: string) {
		console.log('ValidateMiddleware', data);

		if (data === 'auth') {
			return super.handle(data);
		}

		return 'Ошибка валидации';
	}
}

class Controller extends AbstractMiddleware<string> {
	override handle(data: string) {
		console.log('Controller', data);

		return 'Ура';
	}
}

const authMiddleware = new AuthMiddleware();
const validateMiddleware = new ValidateMiddleware();
const controller = new Controller();

authMiddleware.next(validateMiddleware).next(controller);

console.log(authMiddleware.handle('auth'));
console.log(authMiddleware.handle('not auth'));
