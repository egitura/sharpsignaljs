export const okAction = (): ValidResult<Boolean, Boolean> =>
		ResultFactory.ok<Boolean, Boolean>(true);
export const ok = <TResult, TError>(value: TResult): ValidResult<TResult, TError> =>
		ResultFactory.ok<TResult, TError>(value);
export const err = <TError>(errors: Array<TError> = []):
		InvalidResult<TError> => ResultFactory.err<TError>(errors);

export class ResultFactory {
	public static ok<SResult, SError>(value: SResult):
			ValidResult<SResult, SError> {
		return new ValidResult<SResult, SError>(value);
	}

	public static err<SError>(errors: SError[] = []):
			InvalidResult<SError> {
		return new InvalidResult<SError>(errors);
	}
}

export type Result<TResult, TError>
		= ValidResult<TResult, TError>
		| InvalidResult<TError>

export interface IResult<TResult, TError> {
	isValid: boolean;
	value: TResult;
	errors: TError[];
}

export abstract class ResultBase<TResult, TError>
		implements IResult<TResult, TError> {
	public readonly isValid: boolean;
	private readonly _value: TResult;
	private readonly _errors: TError[];

	protected constructor(
			isValid: boolean,
			errors: TError[] = [],
			value: TResult) {
		if (isValid && errors && errors.length > 0) {
			throw new Error(
					'InvalidOperationException: valid results cannot contain errors');
		}

		this.isValid = isValid;
		this._value = value;
		this._errors = errors;
	}

	public get value(): TResult {
		return this._value;
	}

	public get errors(): TError[] {
		return this._errors;
	}
}

export class ValidResult<TResult, TError> extends ResultBase<TResult, TError> {
	public constructor(value: TResult) {
		super(true, [], value);
	}

	ifSuccess(
			callback: (resultValue: TResult) => void
	): ValidResult<TResult, TError> {
		callback(this.value);
		return this;
	}

	async ifSuccessAsync(
			callbackAsync: (resultValue: TResult) => Promise<void>
	): Promise<ValidResult<TResult, TError>> {
		await callbackAsync(this.value);
		return this;
	}

	ifError(
			callback: (resultValue: Array<TError>) => void
	): ValidResult<TResult, TError> {
		callback;
		return this;
	}

	async ifErrorAsync(
			callback: (resultValue: Array<TError>) => Promise<void>
	): Promise<ValidResult<TResult, TError>> {
		callback;
		return this;
	}

	map<TTarget>(
			callback: (resultValue: TResult) => TTarget
	): ValidResult<TTarget, TError> {
		let target = callback(this.value);
		return ok(target);
	}

	async mapAsync<TTarget>(
			callback: (resultValue: TResult) => Promise<TTarget>
	): Promise<ValidResult<TTarget, TError>> {
		let target = await callback(this.value);
		return ok(target);
	}

}

export class InvalidResult<TError> extends ResultBase<false, TError> {
	public constructor(errors: TError[]) {
		super(false, errors, false);
	}

	ifError(callback: (resultValue: Array<TError>) => void):
			InvalidResult<TError> {
		callback(this.errors);
		return this;
	}

	async ifErrorAsync(
			callback: (resultValue: Array<TError>) => Promise<void>
	): Promise<InvalidResult<TError>> {
		await callback(this.errors);
		return this;
	}

	ifSuccess(callback: (resultValue: any) => void):
			InvalidResult<TError> {
		callback;
		return this;
	}

	async ifSuccessAsync(
			callbackAsync: (resultValue: any) => Promise<void>
	): Promise<InvalidResult<TError>> {
		callbackAsync;
		return this;
	}

	map<TTarget>(callback: (resultValue: any) => TTarget):
			InvalidResult<TError> {
		callback;
		return this;
	}

	async mapAsync<TTarget>(
			callback: (resultValue: any) => Promise<TTarget>
	): Promise<InvalidResult<TError>> {
		callback;
		return this;
	}
}

