import { ValidResult } from '../../src';
import { AResult } from '../_helpers/AResult';
import { AnError } from '../_helpers/AnError';
import { MyCustomResult } from '../_helpers/MyCustomResult';
import { ok, okAction } from '../../src/result';
import { asyncHelper } from '../_helpers/asyncHelper';

describe('Result.succeededAction (without value)', () => {
	// ARRANGE + ACT
	const basicValidResult = okAction();

	it('should be a valid result', () => {
		// ASSERT
		expect(basicValidResult.isValid).toBe(true);
		expect(basicValidResult).toBeInstanceOf(ValidResult);
	});

	it('should have an initialized list of errors', () => {
		// ASSERT
		expect(basicValidResult.errors).toStrictEqual([]);
	});

	it('should have an initialized true value', () => {
		// ASSERT
		expect(basicValidResult.value).toBeDefined();
		expect(basicValidResult.value).toStrictEqual(true);
	});
});

describe('Result.succeeded (with value)', () => {
	// ARRANGE
	let aResult = new AResult();

	// ACT
	const validResult = ok(aResult);

	// ASSERT
	it('should have a value', () => {
		expect(validResult.value).toBeTruthy();
		expect(validResult.value).toBeDefined();
	});

	it('should have a value of type T', () => {
		expect(validResult.value).toBeInstanceOf(AResult);
	});
});

describe('Handling valid results', () => {
	describe('ifSuccess', () => {
		// ARRANGE
		const okResult = ok(1);
		const onSuccess = jest.fn(result => {
			result;
		});

		// ACT
		let okResultChainedResult = okResult.ifSuccess(onSuccess);

		// ASSERT
		it('calls callback function with result value', () => {
			expect(onSuccess).toHaveBeenCalledTimes(1);
			expect(onSuccess).toHaveBeenCalledWith(okResult.value);
		});

		it('should return the valid result', () => {
			expect(okResultChainedResult).toBeInstanceOf(ValidResult);
			expect(okResultChainedResult.isValid).toBe(true);
			expect(okResultChainedResult.value).toBe(1);
		});

		it('support async function callbacks', async () => {
			// ARRANGE
			const asyncFunction = new asyncHelper().asyncFunction;
			// ACT
			let result = okResult.ifSuccess(asyncFunction);

			// ASSERT
			expect(asyncFunction).toBeCalledTimes(1);
			expect(asyncFunction).toBeCalledWith(okResult.value);
			expect(result.isValid).toBe(true);
			expect(result.value).toEqual(1);
			expect(result).toBeInstanceOf(ValidResult);
		});
	});

	describe('ifSuccessAsync', () => {
		// ARRANGE
		const okResult = ok(1);

		it('calls async callback function with result value', async () => {
			// ARRANGE
			const asyncFunction = new asyncHelper().asyncFunction;

			// ACT
			await okResult.ifSuccessAsync(asyncFunction);

			// ASSERT
			expect(asyncFunction).toBeCalledTimes(1);
			expect(asyncFunction).toBeCalledWith(okResult.value);
		});

		it('returns promise which resolves to correct valid result', async () => {
			// ARRANGE
			const asyncFunction = new asyncHelper().asyncFunction;

			// ACT
			const promise = okResult.ifSuccessAsync(asyncFunction);
			const resolvedResult = await promise;

			// ASSERT
			expect(promise).toBeInstanceOf(Promise);
			expect(resolvedResult.isValid).toBe(true);
			expect(resolvedResult.value).toEqual(1);
			expect(resolvedResult).toBeInstanceOf(ValidResult);
		});
	});

	describe('map', () => {
		const okResult = ok(1);

		it('maps value to target type using callback function', () => {
			let target = okResult.map<AResult>(resultValue => {
				let targetValue = new AResult();
				targetValue.value = resultValue.toString();
				return targetValue;
			});

			expect(target).toBeInstanceOf(ValidResult);
			expect(target.value).toBeInstanceOf(AResult);
			expect(target.value.value).toBe('1');
		});
	});

	describe('mapAsync', () => {
		// ARRANGE
		const okResult = ok(1);
		const asyncFunction = jest.fn(async (result: number) => {
			return Promise.resolve(result.toString());
		});

		it('mapAsync call and resolves async mapping function with value', async () => {
			// ACT
			await okResult.mapAsync(asyncFunction);

			// ASSERT
			expect(asyncFunction).toBeCalledTimes(1);
			expect(asyncFunction).toBeCalledWith(okResult.value);
		});

		it('returns promise which resolves to correct valid result', async () => {
			// ACT
			const promise = okResult.mapAsync(asyncFunction);
			const resolvedResult = await promise;

			// ASSERT
			expect(promise).toBeInstanceOf(Promise);
			expect(resolvedResult.isValid).toBe(true);
			expect(resolvedResult).toBeInstanceOf(ValidResult);
			expect(resolvedResult.value).toEqual('1');
		});
	});

	describe('ifError', () => {
		// ARRANGE
		const ifErrorFunc = jest.fn(
				(_errors) => 'called error function');

		// ACT
		const result = ok(1).ifError(
				ifErrorFunc
		);

		// ASSERT
		it('should return correct valid result', () => {
			expect(result.isValid).toBe(true);
			expect(result.value).toBe(1);
			expect(result).toBeInstanceOf(ValidResult);
		});

		it('should skip supplied callback', () => {
			expect(ifErrorFunc).not.toHaveBeenCalled();
		});
	});

	describe('ifErrorAsync', () => {
		// ARRANGE
		const okResult = ok(1);
		const ifErrorFuncAsync = jest.fn(
				async (_errors) => {
					return Promise.reject('rejected');
				});

		it('should return correct valid result', async () => {
			const promise = okResult.ifErrorAsync(
					ifErrorFuncAsync
			);
			const resolvedResult = await promise;

			// ASSERT
			expect(resolvedResult.isValid).toBe(true);
			expect(resolvedResult.value).toBe(1);
			expect(resolvedResult).toBeInstanceOf(ValidResult);
		});

		it('should skip supplied callback', async () => {
			// ACT
			await okResult.ifErrorAsync(
					ifErrorFuncAsync
			);

			// ASSERT
			expect(ifErrorFuncAsync).not.toHaveBeenCalled();
		});
	});

});

describe('New valid result (subclassed)', () => {
	it('should not be able to be created with errors', () => {
		// ARRANGE + ACT + ASSERT
		expect(() => {
			new MyCustomResult(
					true,
					new AResult(),
					[new AnError()]
			);
		}).toThrow();
	});
});


