interface IProvider {
	sendMessage(message: string): void;
	connect(config: string): void;
	disconnect(): void;
}

class TelegramProvider implements IProvider {
	sendMessage(message: string): void {
		throw new Error('Method not implemented.');
	}
	connect(config: string): void {
		throw new Error('Method not implemented.');
	}
	disconnect(): void {
		throw new Error('Method not implemented.');
	}
}

class WhatsappProvider implements IProvider {
	sendMessage(message: string): void {
		throw new Error('Method not implemented.');
	}
	connect(config: string): void {
		throw new Error('Method not implemented.');
	}
	disconnect(): void {
		throw new Error('Method not implemented.');
	}
}

class NotificationSender {
	constructor(private provider: IProvider) {}

	send() {
		this.provider.connect('connect');
		this.provider.sendMessage('message');
		this.provider.disconnect();
	}
}
