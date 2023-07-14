class DocumentItem {
	private _text: string;
	private _state: DocumentItemState;

	constructor() {
		this._state = new DraftDocumentItemState(this);
	}

	get state(): DocumentItemStateName {
		return this._state.name;
	}

	set state(state: DocumentItemState) {
		this._state = state;
	}

	publishDoc() {
		this._state.publish();
	}

	unpublishDoc() {
		this._state.unpublish();
	}

	set text(text: string) {
		this._text = text;
	}

	get text(): string {
		return this._text;
	}
}

type DocumentItemStateName = 'draft' | 'published';

abstract class DocumentItemState {
	protected _name: DocumentItemStateName;

	constructor(protected item: DocumentItem) {}

	set name(name: DocumentItemStateName) {
		this._name = name;
	}
	get name() {
		return this._name;
	}

	abstract publish(): void;
	abstract unpublish(): void;
}

class DraftDocumentItemState extends DocumentItemState {
	constructor(protected item: DocumentItem) {
		super(item);
		this.name = 'draft';
	}

	publish(): void {
		this.item.state = new PublishDocumentItemState(this.item);
	}

	unpublish(): void {
		return;
	}
}

class PublishDocumentItemState extends DocumentItemState {
	constructor(protected item: DocumentItem) {
		super(item);
		this.name = 'published';
	}

	publish(): void {
		return;
	}
	unpublish(): void {
		this.item.state = new DraftDocumentItemState(this.item);
	}
}

const documentItem = new DocumentItem();
documentItem.text = 'Dolor cupidatat nostrud dolore enim labore ullamco amet voluptate.';
console.log(documentItem.state);

documentItem.publishDoc();
console.log(documentItem.state);

documentItem.unpublishDoc();
console.log(documentItem.state);
