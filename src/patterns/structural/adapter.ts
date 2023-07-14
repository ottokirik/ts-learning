class KVDatabase {
	private db = new Map<string, string>();

	save(key: string, value: string) {
		this.db.set(key, value);
	}
}

class PersistentDatabase {
	savePersistent(data: Object) {
		console.log(data);
	}
}

class PersistentDatabaseAdapter extends KVDatabase {
	constructor(private database: PersistentDatabase) {
		super();
	}

	override save(key: string, value: string): void {
		this.database.savePersistent({ key, value });
	}
}

function run(base: KVDatabase) {
	base.save('foo', 'bar');
}

run(new PersistentDatabaseAdapter(new PersistentDatabase()));
