interface IMediator {
	notify(sender: string, event: string): void;
}

abstract class Mediated {
	protected mediator: IMediator;

	setMediator(mediator: IMediator) {
		this.mediator = mediator;
	}
}

class Notifier {
	send() {
		console.log('Notifier');
	}
}

class Logger {
	log() {
		console.log('Logger');
	}
}

class EventHandler extends Mediated {
	handleEvent() {
		this.mediator.notify('EventHandler', 'event');
	}
}

class NotifierMediator implements IMediator {
	constructor(private notifier: Notifier, private logger: Logger) {}

	notify(sender: string, event: string): void {
		console.log(`Отправляю: ${sender} - ${event}`);

		if (event === 'event') {
			this.notifier.send();
			this.logger.log();
		} else {
			throw new Error('Неизвестное событие');
		}
	}
}

const handler = new EventHandler();
const mediator = new NotifierMediator(new Notifier(), new Logger());

handler.setMediator(mediator);
handler.handleEvent();
