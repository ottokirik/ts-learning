interface IObserver {
	update(subject: ISubject): void;
}

interface ISubject {
	attach(observer: IObserver): void;
	detach(observer: IObserver): void;
	notify(): void;
	state: Lead;
}

class Lead {
	constructor(private _name: string, private _phone: string) {}

	get name() {
		return this._name;
	}

	get phone() {
		return this._phone;
	}
}

class NewLead implements ISubject {
	private observers: Set<IObserver> = new Set();
	private _state: Lead;

	attach(observer: IObserver): void {
		console.log(`Observer ${observer.constructor.name} добавлен`);
		this.observers.add(observer);
	}

	detach(observer: IObserver): void {
		console.log(`Observer ${observer.constructor.name} удален`);
		this.observers.delete(observer);
	}

	setState(state: Lead): void {
		this._state = state;
		this.notify();
	}

	notify(): void {
		Array.from(this.observers).forEach((observer) => {
			observer.update(this);
		});
	}

	get state(): Lead {
		return this._state;
	}
}

class NotificationService implements IObserver {
	update(subject: ISubject): void {
		console.log(`${this.constructor.name} получил уведомление`);
		console.log(subject.state);
	}
}

class LeadService implements IObserver {
	update(subject: ISubject): void {
		console.log(`${this.constructor.name} получил уведомление`);
		console.log(subject.state);
	}
}

const subject = new NewLead();
const notificationService = new NotificationService();
const leadService = new LeadService();

subject.attach(notificationService);
subject.attach(notificationService);
subject.attach(leadService);

subject.setState(new Lead('John', '123'));
subject.setState(new Lead('Jack', '999'));

subject.detach(notificationService);

subject.setState(new Lead('Max', '781234'));
