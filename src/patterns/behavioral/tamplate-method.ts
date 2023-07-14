class Form {
	constructor(private _name: string) {}

	get name() {
		return this._name;
	}
}

abstract class SaveForm<T> {
	save(form: Form) {
		const preparedForm = this.fill(form);
		this.log(preparedForm);
		this.send(preparedForm);
	}

	protected log(data: T) {
		console.log(`${this.constructor.name} логирование`, data);
	}

	protected abstract fill(form: Form): T;
	protected abstract send(data: T): void;
}

class FirstAPI extends SaveForm<string> {
	protected fill(form: Form): string {
		return form.name;
	}

	protected send(data: string): void {
		console.log(`${this.constructor.name}`, data);
	}
}

class SecondAPI extends SaveForm<{ fio: string }> {
	protected fill(form: Form): { fio: string } {
		return { fio: form.name };
	}

	protected send(data: { fio: string }): void {
		console.log(`${this.constructor.name}`, data);
	}
}

const form = new Form('John');

const firstAPI = new FirstAPI();
const secondAPI = new SecondAPI();

firstAPI.save(form);
secondAPI.save(form);
