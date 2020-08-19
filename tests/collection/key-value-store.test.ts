import { KeyValueStore } from '../../src/collection';

describe('KeyValueStore.get', () => {
	it('should return valid result with correct value if in the store', () => {
		let store = new KeyValueStore<string, string>();
		store.set('myKey', 'myValue');

		let result = store.get('myKey');

		expect(result.isValid).toBe(true);
		expect(result.value).toBe('myValue');
	});

	it('should return invalid result with not found error if not in the store', () => {
		let store = new KeyValueStore<string, string>();

		let result = store.get('something');

		expect(result.isValid).toBe(false);
		expect(result.errors[0].errorCode).toBe(404);
	});
});

describe('KeyValueStore.set', () => {
	it('should add new value to store', () => {
		let store = new KeyValueStore<string, string>();

		store.set('myKey', 'myValue');

		expect(store.get('myKey').value).toBe('myValue');
	});

	it('should replace existing value if already in store', () => {
		let store = new KeyValueStore<string, string>();

		store.set('myKey', 'myValue');
		store.set('myKey', 'myNewValue');

		expect(store.get('myKey').value).toBe('myNewValue');
	});
});


