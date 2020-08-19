import { ServiceBase } from './base/ServiceBase';
import { CreateCommandBase, ErrorDto } from '../dtos';
import { ICreateService } from './interfaces/ICreateService';
import { Result } from '../result';
import { IApiClient } from './interfaces/IApiClient';


export abstract class CreateServiceBase<TDto, TCreateCommand extends CreateCommandBase>
		extends ServiceBase
		implements ICreateService<TDto, TCreateCommand> {
	protected constructor(apiControllerUrl: string, apiClient: IApiClient) {
		super(apiControllerUrl, apiClient);
	}

	async create(command: TCreateCommand): Promise<Result<TDto, ErrorDto>> {
		try {
			const response = await this.client.post(this.apiControllerUrl, command);
			return this.handleResponse(response) as Result<TDto, ErrorDto>;
		} catch (e) {
			return this.errorResult(e);
		}
	}
}
