interface HTTPResponse<T extends 'success' | 'error'> {
	code: number;
	data: T extends 'success' ? string : Error;
}

const success: HTTPResponse<'success'> = {
	code: 200,
	data: 'data',
};

const error: HTTPResponse<'error'> = {
	code: 400,
	data: new Error(''),
};

// ---
{
	class User {
		id: number;
		name: string;
	}

	class UserPersisted extends User {
		dbId: string;
	}

	function getUser(id: number): User;
	function getUser(dbId: string): UserPersisted;
	function getUser(dbIdOrId: number | string): User | UserPersisted {
		if (typeof dbIdOrId === 'number') {
			return new User();
		}
		return new UserPersisted();
	}
}
