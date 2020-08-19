import { err, InvalidResult } from '../../src/result';
import { asyncHelper } from '../_helpers/asyncHelper';
import { AnError, AnotherError } from '../_helpers/AnError';

describe('Result.failed (with no errors)', () => {
	// ARRANGE + ACT
	const basicInvalidResult = err();

	// ASSERT
	it('should be an invalid result', () => {
		expect(basicInvalidResult.isValid).toBe(false);
		expect(basicInvalidResult).toBeInstanceOf(InvalidResult);
	});

	it('should have an initialized list of errors', () => {
		expect(basicInvalidResult.errors).toStrictEqual([]);
	});

	it('should have an initialized false value', () => {
		expect(basicInvalidResult.value).toBeDefined();
		expect(basicInvalidResult.value).toBe(false);
	});
});

describe('Result.failed with', () => {
	// ARRANGE
	let anError = new AnError();

	describe('one error', () => {
		// ACT
		const invalidResult = err([anError]);

		// ASSERT
		it('should have an error', () => {
			expect(invalidResult.errors).toBeTruthy();
			expect(invalidResult.errors).toBeDefined();
			expect(invalidResult.errors).toContain(anError);
		});
	});

	describe('multiple errors', () => {
		// ARRANGE
		let anotherError = new AnotherError();
		let errors = [anError, anotherError];

		// ACT
		const anotherInvalidResult = err(errors);
		const short = err(errors);

		// ASSERT
		it('should match the shorter err function variant', () => {
			expect(anotherInvalidResult).toEqual(short);
		});

		it('should contain a list of errors containing the error of type T', () => {
			expect(short).toBeInstanceOf(InvalidResult);
			expect(anotherInvalidResult.errors[0]).toBeInstanceOf(AnError);
			expect(anotherInvalidResult.errors[1]).toBeInstanceOf(AnotherError);
		});

		it('should contain all the passed in errors', () => {
			expect(anotherInvalidResult.errors.length).toBe(errors.length);
		});
	});
});

describe('Handling invalid results', () => {
	describe('ifError', () => {
		// ARRANGE
		const invalid = err(['an error']);
		const onError = jest.fn(errors => {
			errors;
		});

		// ACT
		let invalidChainedResult = invalid.ifError(onError);

		// ASSERT
		it('calls callback function with errors param', () => {
			expect(onError).toHaveBeenCalledTimes(1);
			expect(onError).toHaveBeenCalledWith(invalid.errors);
		});

		it('returns correct invalid result', () => {
			expect(invalidChainedResult.isValid).toBe(false);
			expect(invalidChainedResult.value).toBe(false);
			expect(invalidChainedResult).toBeInstanceOf(InvalidResult);
			expect(invalidChainedResult.errors).toEqual(['an error']);
		});
	});

	describe('ifErrorAsync', () => {
		// ARRANGE
		const invalid = err(['an error']);

		const onErrorAsync = new asyncHelper().asyncErrorHandleFunction;

		it('calls async callback function with errors', async () => {
			// ACT
			await invalid.ifErrorAsync(onErrorAsync);

			// ASSERT
			expect(onErrorAsync).toHaveBeenCalledTimes(1);
			expect(onErrorAsync).toHaveBeenCalledWith(invalid.errors);
		});

		it('returns promise which resolves to correct invalid result', async () => {
			// ACT
			const promise = invalid.ifErrorAsync(onErrorAsync);
			const invalidChainedResult = await promise;

			// ASSERT
			expect(invalidChainedResult.isValid).toBe(false);
			expect(invalidChainedResult.value).toBe(false);
			expect(invalidChainedResult).toBeInstanceOf(InvalidResult);
			expect(invalidChainedResult.errors).toEqual(['an error']);
		});
	});

	describe('ifSuccess', () => {
		// ARRANGE
		const invalid = err(['an error']);
		const onSuccess = jest.fn(value => {
			value;
		});

		// ACT
		let invalidChainedResult = invalid.ifSuccess(onSuccess);

		it('skips success callback', () => {
			expect(onSuccess).not.toHaveBeenCalled();
		});

		it('returns correct invalid result', () => {
			expect(invalidChainedResult.isValid).toBe(false);
			expect(invalidChainedResult.value).toBe(false);
			expect(invalidChainedResult).toBeInstanceOf(InvalidResult);
			expect(invalidChainedResult.errors).toEqual(['an error']);
		});
	});

	describe('ifSuccessAsync', () => {
		// ARRANGE
		const invalid = err(['an error']);
		const asyncFunction = jest.fn(async (result: number) => {
			let promise = new Promise<string>(() => {
				return result;
			});
			await promise;
		});

		it('skips success callback', async () => {
			// ACT
			await invalid.ifSuccessAsync(asyncFunction);

			// ASSERT
			expect(asyncFunction).not.toHaveBeenCalled();
		});

		it('returns correct invalid result', async () => {
			let invalidChainedResult = await invalid.ifSuccessAsync(asyncFunction);

			expect(invalidChainedResult.isValid).toBe(false);
			expect(invalidChainedResult.value).toBe(false);
			expect(invalidChainedResult).toBeInstanceOf(InvalidResult);
			expect(invalidChainedResult.errors).toEqual(['an error']);
		});
	});

	describe('map', () => {
		// ARRANGE
		const invalid = err([1]);
		const mapFn = jest.fn(number => number.toString());

		// ACT
		const mapped = invalid.map<string>(mapFn);

		// ASSERT
		it('should skip mapping callback', () => {
			expect(mapFn).toHaveBeenCalledTimes(0);
		});

		it('should return correct valid result', () => {
			expect(mapped.isValid).toBe(false);
			expect(mapped.errors).toEqual([1]);
			expect(mapped).toBeInstanceOf(InvalidResult);
		});
	});

	describe('mapAsync', () => {
		// ARRANGE
		const invalid = err([1]);
		const asyncFunction = jest.fn(async (result: number) => {
			return Promise.resolve(result.toString());
		});

		it('should skip mapping callback', async () => {
			// ACT
			await invalid.mapAsync(asyncFunction);

			// ASSERT
			expect(asyncFunction).not.toBeCalled();
		});

		it('returns promise which resolves to correct invalid result', async () => {
			// ACT
			const promise = invalid.mapAsync(asyncFunction);
			const resolvedResult = await promise;

			// ASSERT
			expect(promise).toBeInstanceOf(Promise);
			expect(resolvedResult.isValid).toBe(false);
			expect(resolvedResult).toBeInstanceOf(InvalidResult);
			expect(resolvedResult.errors).toEqual([1]);
		});
	});
});
