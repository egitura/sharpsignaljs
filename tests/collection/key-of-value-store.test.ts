import { KeyOfValueStore } from '../../src';

/**
 * Nothing much test, it only uses the underlying structure at the moment
 * Added functionality is for typechecking only
 * which is validated before compile time... However...
 *
 * We still need to test the get and set methods
 * One could think we would need to check if the underlying store is called by mocking it
 * This would work if the underlying store would be injected on creation of this store
 * However the KeyOfValueStore has a hard dependency on KeyValueStore which is intended in this case
 * as these are just implementation details
 * and the underlying implementation should not matter so to conclude
 * we apply the same tests here as we do on the regular KeyValueStore
 * */

const someKeys = {
	keyHoldingString: 'keyHoldingStringValue' as const,
	keyHoldingNumber: 'keyHoldingNumberValue' as const
};

type SomeValue = {
	[someKeys.keyHoldingString]: string,
	[someKeys.keyHoldingNumber]: number
}

type SomeKey = keyof SomeValue;

describe('KeyOfValueStore.get', () => {
	it('should return valid result with correct value if in the store', () => {
		let store = new KeyOfValueStore<SomeKey, SomeValue>();
		store.set(someKeys.keyHoldingString, 'myValue');
		store.set(someKeys.keyHoldingNumber, 1);

		let someStringResult = store.get(someKeys.keyHoldingString);
		let someNumberResult = store.get(someKeys.keyHoldingNumber);

		expect(someStringResult.value).toBe('myValue');
		expect(someNumberResult.value).toBe(1);
	});

	it('should return invalid result with not found error if not in the store', () => {
		let store = new KeyOfValueStore<SomeKey, SomeValue>();

		let result = store.get(someKeys.keyHoldingString);

		expect(result.isValid).toBe(false);
		expect(result.errors[0].errorCode).toBe(404);
	});
});

describe('KeyOfValueStore.set', () => {
	it('should add new value to store', () => {
		let store = new KeyOfValueStore<SomeKey, SomeValue>();

		store.set(someKeys.keyHoldingString, 'myValue');

		expect(store.get(someKeys.keyHoldingString).value).toBe('myValue');
	});

	it('should replace existing value if already in store', () => {
		let store = new KeyOfValueStore<SomeKey, SomeValue>();

		store.set(someKeys.keyHoldingString, 'myValue');
		store.set(someKeys.keyHoldingString, 'myNewValue');

		expect(store.get(someKeys.keyHoldingString).value).toBe('myNewValue');
	});
});
