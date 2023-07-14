interface IData {
	group: number;
	name: string;
}

type GroupType<T> = Record<string, T[]>;

const groups = [
	{ group: 1, name: 'a' },
	{ group: 1, name: 'b' },
	{ group: 2, name: 'c' },
];

function groupByKey<T extends Record<string, unknown>, K extends keyof T>(array: T[], key: K): GroupType<T> {
	return array.reduce<GroupType<T>>((acc: GroupType<T>, item) => {
		const itemKey = String(item[key]);
		const isKeyExist = acc[itemKey] !== undefined;

		if (isKeyExist) {
			acc[itemKey].push(item);
			return acc;
		}

		acc[itemKey] = [item];
		return acc;
	}, {});
}

console.log(groupByKey(groups, 'group'));
