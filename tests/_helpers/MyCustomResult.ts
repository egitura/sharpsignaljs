import { ResultBase } from '../../src';

export class MyCustomResult<TResult, TError> extends ResultBase<TResult, TError> {
	public constructor(isValid: boolean, value: TResult, errors: TError[] = []) {
		super(isValid, errors, value);
	}
}
