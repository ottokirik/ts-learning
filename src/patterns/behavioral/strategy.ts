{
	interface IUser {
		jwtToken: string;
		gitHubToken: string;
	}

	interface IAuthStrategy {
		authenticate(user: IUser): boolean;
	}

	class Auth {
		constructor(private authStrategy: IAuthStrategy) {}

		setStrategy(authStrategy: IAuthStrategy) {
			this.authStrategy = authStrategy;
		}

		authUser(user: IUser): boolean {
			return this.authStrategy.authenticate(user);
		}
	}

	class JWTStrategy implements IAuthStrategy {
		authenticate(user: IUser): boolean {
			if (user.jwtToken) {
				return true;
			}

			return false;
		}
	}

	class GitHubStrategy implements IAuthStrategy {
		authenticate(user: IUser): boolean {
			if (user.gitHubToken) {
				return true;
			}

			return false;
		}
	}

	class User implements IUser {
		jwtToken: string;
		gitHubToken: string;
	}

	const user = new User();
	user.jwtToken = 'token';

	const auth = new Auth(new JWTStrategy());

	console.log(auth.authUser(user));

	auth.setStrategy(new GitHubStrategy());

	console.log(auth.authUser(user));
}
