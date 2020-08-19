import { ServiceBase } from './base/ServiceBase';
import { ErrorDto, UpdateCommandBase } from '../dtos';
import { IUpdateService } from './interfaces/IUpdateService';
import { Result } from '../result';
import { IApiClient } from './interfaces/IApiClient';


export abstract class UpdateServiceBase<TDto, TUpdateCommand extends UpdateCommandBase>
		extends ServiceBase
		implements IUpdateService<TDto, TUpdateCommand> {
	protected constructor(apiControllerUrl: string, apiClient: IApiClient) {
		super(apiControllerUrl, apiClient);
	}

	async update(command: TUpdateCommand): Promise<Result<TDto, ErrorDto>> {
		try {
			const response = await this.client.put(this.apiControllerUrl, command);
			return this.handleResponse(response) as Result<TDto, ErrorDto>;
		} catch (e) {
			return this.errorResult(e);
		}
	}
}
