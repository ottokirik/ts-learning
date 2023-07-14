type Modifier = 'create' | 'update' | 'read';

type UserRole = {
	customers?: Modifier;
	projects?: Modifier;
	admins?: Modifier;
};

// -? все свойства обязательны
type ModifierToAccess<T> = {
	+readonly [Property in keyof T as `canAccess${string & Property}`]-?: boolean;
};

type UserAccess = ModifierToAccess<UserRole>;
