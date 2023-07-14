{
	const user = {
		name: 'John',
		age: 33,
	};

	type keyOfUser = keyof typeof user;
}

{
	interface Role {
		name: string;
	}

	interface User {
		name: string;
		roles: Role[];
	}

	const roleName = 'roles';

	type RolesType = User['roles'];
	type RolesType2 = User[typeof roleName];

	type RoleType = User['roles'][number];

	const roles = ['admin', 'user', 'guest'] as const;
	type RoleTypes = typeof roles[number];
}
