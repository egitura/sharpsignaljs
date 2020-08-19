export class ErrorBase {
}
export interface IError {}
export class AnError extends ErrorBase implements IError {
	public value: string = '';

	constructor() {
		super();
		this.value = 'test error';
	}
}

export class AnotherError extends ErrorBase implements IError {
	public anotherValue: string = '';

	constructor() {
		super();
		this.anotherValue = 'another test error';
	}
}
