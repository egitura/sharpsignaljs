/*export type TestResult<TResult, TError> =
		| { isValid: true, value: TResult }
		| { isValid: false, errors: Array<TError> }*/
export type ValidTestResult<TResult> =
		{ readonly isValid: true, readonly value: TResult };

export type InvalidTestResult<TError> =
		{ readonly isValid: false, readonly errors: Array<TError> };


export function isValidTestResult<TResult, TError>(
		result: ValidTestResult<TResult> | InvalidTestResult<TError>
): result is ValidTestResult<TResult> {
	return (result as ValidTestResult<TResult>).value !== undefined;
}

export class TestResultFactory {
//public static succeeded<TResult, TError>(value: TResult = {} as TResult): TestResult<TResult, TError> {
	public static succeeded<TResult>(value: TResult = {} as TResult): ValidTestResult<TResult> {
		//public static succeeded<TResult>(value: TResult = {} as TResult) {
		return {
			isValid: true,
			value: value
		};
	}

	//public static failed<TResult, TError>(errors: Array<TError> = []): TestResult<TResult, TError> {
	public static failed<TError>(errors: Array<TError> = []): InvalidTestResult<TError> {
		return {
			isValid: false,
			errors: errors
		};
	}
}
