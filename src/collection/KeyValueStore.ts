import { err, ok, Result } from '../result';
import { ErrorDto, ErrorDtoFactory } from '../dtos/response/ErrorDto';

export interface IKeyValueStore<K, V> {
	set(key: K, value: V): void;

	get(key: K): Result<V, ErrorDto>;
}

export class KeyValuePair<TKey, TValue> {
	key: TKey;
	value: TValue;
	public constructor(key: TKey, value: TValue) {
		this.key = key;
		this.value = value;
	}
}

export class KeyValueStore<TKey, TValue>
		implements IKeyValueStore<TKey, TValue> {
	private readonly _entries: KeyValuePair<TKey, TValue>[] = [];

	get(key: TKey): Result<TValue, ErrorDto> {
		let result = this.getKeyValuePair(key);
		if (!result) {
			return err([ErrorDtoFactory.NotFound()]);
		}
		return ok<TValue, ErrorDto>(result.value);
	}

	set(key: TKey, value: TValue): void {
		let existing = this.getKeyValuePair(key);
		if (existing) {
			existing.value = value;
		} else {
			this._entries.push({ key: key, value: value });
		}
	}

	private getKeyValuePair(key: TKey): KeyValuePair<TKey, TValue> | null {
		let result = this._entries.find(e => e.key === key);
		if (!result) {
			return null;
		}
		return result
	}
}
