import { IApiClient, IApiResponse } from '..';
import { err, InvalidResult, ok, Result } from '../../result';
import { ErrorDto } from '../../dtos';

export abstract class ServiceBase {

	constructor(protected readonly apiControllerUrl: string, protected readonly client: IApiClient) {
	}

	protected handleResponse<TDto>(
			response: IApiResponse
	): Result<TDto, ErrorDto> | Result<TDto[], ErrorDto> {
		if (!response.isValid) {
			const errors: ErrorDto[] = response.errors;
			return err(errors);
		}

		return ok(response.value);
	}

	protected errorResult(e: Error | any): InvalidResult<ErrorDto> {
		//  This scenario handles axios specific errors!!!
		if (e.response && e.response.data && e.response.data.errors) {
			const errors: ErrorDto[] = e.response.data.errors;
			return err(errors);
		}
		if (e instanceof Error) {
			const error = new ErrorDto();
			error.message = e.message;
			return err([error]);
		}
		const error = new ErrorDto();
		error.message = e.toString();
		return err([error]);
	}
}
