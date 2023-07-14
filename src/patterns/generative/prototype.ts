interface Prototype<T> {
	clone(): T;
}

class UserHistory implements Prototype<UserHistory> {
	constructor(private email: string, private name: string) {}
	clone(): UserHistory {
		return new UserHistory(this.email, this.name);
	}
}
