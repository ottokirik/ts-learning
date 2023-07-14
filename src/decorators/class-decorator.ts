interface IUserService {
	usersCount: number;
	getUsersCount(): number;
}

@CreatedAt
@SetUsersCount(100)
class UserService implements IUserService {
	usersCount: number;
	getUsersCount(): number {
		return this.usersCount;
	}
}

function NullUsers(target: Function) {
	target.prototype.usersCount = 0;
}

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
function NullUsersAdvanced<T extends new (...args: any[]) => {}>(Class: T) {
	return class extends Class {
		usersCount = 0;
	};
}

function SetUsersCount(count: number) {
	return (target: Function) => {
		target.prototype.usersCount = count;
	};
}

function CreatedAt(target: Function) {
	target.prototype.createdAt = new Date();
}

type CreatedAt = {
	createdAt: Date;
};

const userService = new UserService() as IUserService & CreatedAt;

console.log(userService.createdAt);
