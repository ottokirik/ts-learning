{
	interface IUser {
		name: string;
	}

	interface IUserService {
		save(user: IUser): void;
		delete(user: IUser): void;
	}

	interface IController {
		run(): void;
	}

	interface ICommandHistory {
		commands: Command[];
		add(command: Command): void;
		remove(command: Command): void;
	}

	class User implements IUser {
		constructor(private userName: string) {}

		get name(): string {
			return this.userName;
		}
	}

	class UserService implements IUserService {
		save(user: IUser) {
			console.log(`UserService: ${user.name} сохранен`);
		}

		delete(user: IUser) {
			console.log(`UserService: ${user.name} удален`);
		}
	}

	class Controller implements IController {
		constructor(private receiver: IUserService, private history: ICommandHistory) {}
		run(): void {
			const addUserCommand = new AddUserCommand(new User('John'), this.receiver, this.history);
			const addUserTwoCommand = new AddUserCommand(new User('Jack'), this.receiver, this.history);
			addUserTwoCommand.execute();
			addUserCommand.execute();
			console.log(this.history);
			addUserCommand.undo();
			console.log(this.history);
		}
	}

	abstract class Command {
		private static currentId = 0;
		private commandId: number;

		constructor(protected _history: ICommandHistory) {
			this.commandId = Command.currentId;
			Command.currentId += 1;
		}

		abstract execute(): void;

		get id(): number {
			return this.commandId;
		}

		get history(): ICommandHistory {
			return this._history;
		}
	}

	class CommandHistory implements ICommandHistory {
		commands: Command[] = [];

		add(command: Command): void {
			this.commands.push(command);
		}

		remove(command: Command): void {
			this.commands = this.commands.filter((c) => c.id !== command.id);
		}
	}

	class AddUserCommand extends Command {
		constructor(private user: IUser, private receiver: IUserService, history: ICommandHistory) {
			super(history);
		}
		execute(): void {
			this.receiver.save(this.user);
			this._history.add(this);
		}

		undo() {
			this.receiver.delete(this.user);
			this._history.remove(this);
		}
	}

	const controller = new Controller(new UserService(), new CommandHistory());
	controller.run();
}
