class Notify {
	send() {
		throw new Error('Method not implemented.');
	}
}

class Log {
	log() {
		throw new Error('Method not implemented.');
	}
}

class NotificationFacade {
	private nofify: Notify;
	private log: Log;

	constructor() {
		this.nofify = new Notify();
		this.log = new Log();
	}

	send() {
		this.nofify.send();
		this.log.log();
	}
}
