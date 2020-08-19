import { err, InvalidResult } from './Result';

export class InvalidResultBuilder<TError> {
	private _result!: InvalidResult<TError>;
	private readonly _errors: Array<TError>;

	public constructor() {
		this._errors = [];
		//this._result = err([]);
	}

	public add(error: TError) {
		this._errors.push(error);
	}

	public toResult(): InvalidResult<TError> {
		this._result = err(this._errors);
		return this._result;
	}

	public reset(): void {
		this._errors.splice(0, this._errors.length);
	}
}
