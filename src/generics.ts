interface ISortableById {
	id: number;
}

type Direction = 'asc' | 'desc';

function sortById<T extends ISortableById>(arr: T[], direction: Direction = 'asc'): T[] {
	const d = direction === 'asc' ? 1 : -1;
	return arr.sort((a, b) => (a.id - b.id) * d);
}

const data = [
	{ id: 2, name: 'Петя' },
	{ id: 1, name: 'Вася' },
	{ id: 3, name: 'Надя' },
];

console.log(sortById(data, 'asc'));
console.log(sortById(data, 'desc'));
