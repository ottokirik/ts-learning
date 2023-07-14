// rome-ignore lint/suspicious/noExplicitAny: <explanation>
type GConstructor<T = {}> = new (...args: Array<any>) => T;

class List {
	constructor(public items: string[]) {}
}

type ListType = GConstructor<List>;

function ExtendedList<TBase extends ListType>(Base: TBase) {
	return class ExtendedList extends Base {
		first() {
			return this.items[0];
		}
	};
}
