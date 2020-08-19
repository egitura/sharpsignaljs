import { isValidTestResult, TestResultFactory } from '../../src/_experimental/TestResult';
import { AResult } from '../_helpers/AResult';

class SomeValue {
	public value: string = 'some value';
}

class SomeError {
	public error: string = 'some error';
}

test('TestResult tryout', () => {
	let someValue = new SomeValue();
	let result = TestResultFactory.succeeded(someValue);
	//let result = TestResultFactory.succeeded<SomeValue>(someValue);
	//let result = TestResultFactory.succeeded<SomeValue, SomeError>(someValue);
	/*console.log(result);
	console.log(typeof result);*/
	let someError = new SomeError();
	let failedResult = TestResultFactory.failed<SomeError>([someError]);
	/*console.log(failedResult);
	console.log(typeof failedResult);*/
	/*if (failedResult.isValid) {
		console.log('always invalid');
	}*/
	expect(result).toStrictEqual({ isValid: true, value: new SomeValue() });
	expect(failedResult).toStrictEqual({ isValid: false, errors: [new SomeError()] });
});


describe('Result.succeeded', () => {
	// ARRANGE + ACT
	const basicValidResult = TestResultFactory.succeeded<SomeValue>();
	//const basicValidResult = TestResultFactory.succeeded<SomeValue, SomeError>();

	it('should be a valid result', () => {
		// ASSERT
		expect(basicValidResult.isValid).toBe(true);
		//expect(basicValidResult).toBeInstanceOf(ValidResult);
		/*if (typeof basicValidResult === ValidTestResult) {}*/
		//expect(basicValidResult).toBeInstanceOf(ValidTestResult<SomeValue>);
		expect(isValidTestResult(basicValidResult)).toBe(true);
	});

	describe('Result.succeeded with no data', () => {
		it('should have an initialized empty value', () => {
			expect(basicValidResult.value).toBeDefined();
		});
	});

	describe('Result.succeeded with a value', () => {
		let aResult = new AResult();
		const validResult = TestResultFactory.succeeded(aResult);

		it('should have a value', () => {
			expect(validResult.value).toBeTruthy();
			expect(validResult.value).toBeDefined();
		});

		it('should have a value of type T', () => {
			expect(validResult.value).toBeInstanceOf(AResult);
		});
	});
});
