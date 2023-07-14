type Optional<T> = T | undefined;

class Task {
	constructor(private _priority: number) {}
	get priority() {
		return this._priority;
	}
}

class TasksList {
	constructor(private _tasks: Task[] = []) {}

	sortByPriority() {
		this._tasks.sort((a, b) => a.priority - b.priority);
	}

	add(task: Task) {
		this._tasks.push(task);
	}

	get tasks() {
		return this._tasks;
	}

	count() {
		return this._tasks.length;
	}

	getIterator(): IIterator<Task> {
		return new PriorityTaskIterator(this);
	}
}

interface IIterator<T> {
	current(): Optional<T>;
	next(): Optional<T>;
	prev(): Optional<T>;
	index(): number;
}

// Замечание: изменяет изначальную структуру данных
class PriorityTaskIterator implements IIterator<Task> {
	private position = 0;
	private _tasksList: TasksList;

	constructor(tasksList: TasksList) {
		tasksList.sortByPriority();
		this._tasksList = tasksList;
	}

	current(): Optional<Task> {
		return this._tasksList.tasks[this.position];
	}

	next(): Optional<Task> {
		this.position += 1;
		return this.current();
	}

	prev(): Optional<Task> {
		this.position -= 1;
		return this.current();
	}

	index(): number {
		return this.position;
	}
}

const tasksList = new TasksList();
tasksList.add(new Task(9));
tasksList.add(new Task(1));
tasksList.add(new Task(6));
tasksList.add(new Task(2));

const iterator = tasksList.getIterator();

console.log(iterator.current());
iterator.next();
console.log(iterator.current());
