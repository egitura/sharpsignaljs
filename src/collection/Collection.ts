/* TODO: Complete Collection<T> + Add Tests */
export class Collection<T> {
	private readonly _items: Array<T> = [];

	public constructor() {}

	get items(): T[] {
		return this._items;
	}

	public push(item: T) {
		this._items.push(item)
	}

	public pop() {
		this._items.pop();
	}
}
