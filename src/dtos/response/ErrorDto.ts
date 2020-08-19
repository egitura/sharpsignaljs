export class ErrorDto {
	public constructor() {}

	private _errorCode: number = 0;

	public get errorCode() {
		return this._errorCode;
	}

	public set errorCode(value) {
		this._errorCode = value;
	}

	private _message: string = '';

	public get message() {
		return this._message;
	}

	public set message(value) {
		this._message = value;
	}
}

export class ErrorDtoFactory {
	static 404(): ErrorDto {
		let dto = new ErrorDto();
		dto.errorCode = 404;
		dto.message = 'Not Found';
		return dto;
	}

	static NotFound(): ErrorDto {
		return ErrorDtoFactory['404']();
	}
}

