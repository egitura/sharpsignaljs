import { IKeyValueStore, KeyValueStore } from './KeyValueStore';
import { ErrorDto } from '../dtos';
import { Result } from '../index';

export interface IKeyOfValueStore<TKey extends keyof TValue, TValue> {
	set(key: TKey, value: TValue[TKey]): void;

	get(key: TKey): Result<TValue[TKey], ErrorDto>;
}

/**
 * When you need a strongly typed KeyValueStore
 * which does pre-compile time type checking on
 * - the actual keys and...
 * - ...the types of the values belonging to those keys
 *
 * Example below: obviously create a custom KeyOfValueStore to encapsulate the below example
 *
 * @example:
 * export const someKeys = {
 *	keyHoldingString: 'keyHoldingStringValue' as const,
 *	keyHoldingNumber: 'keyHoldingNumberValue' as const
 * };
 * export type SomeValue = {
 *	[someKeys.keyHoldingString]: string,
 *	[someKeys.keyHoldingNumber]: number
 * }
 * export type SomeKey = keyof SomeValue;
 * let store = new KeyOfValueStore<SomeKey, SomeValue>();
 * store.set(someKeys.keyHoldingString, 'myValue');
 * let result = store.get(someKeys.keyHoldingString);
 *
 * result.value contains value if there is one,
 * result.isValid will be false if key was not found
 * result.errors will contain 404 NotFound error if key was not found
 */
export class KeyOfValueStore<TKey extends keyof TValue, TValue>
	implements IKeyOfValueStore<TKey, TValue>,
		IKeyValueStore<TKey, TValue[TKey]> {
	private readonly _kvs: KeyValueStore<TKey, TValue[TKey]>;

	public constructor() {
		this._kvs = new KeyValueStore();
	}

	get(key: TKey): Result<TValue[TKey], ErrorDto> {
		return this._kvs.get(key);
	}

	set(key: TKey, value: TValue[TKey]): void {
		this._kvs.set(key, value);
	}
}

/** using inheritance,
 *  potentially dangerous when changes happen to parent class
 *  to consumers of this class
 *  therefore we use the above composition over inheritance version
 * */
/*export class KeyOfValueStore<TKey extends keyof TValue, TValue>
		extends KeyValueStore<TKey, TValue[TKey]>
		implements
				IKeyOfValueStore<TKey, TValue>,
				IKeyValueStore<TKey, TValue[TKey]> {
}*/
