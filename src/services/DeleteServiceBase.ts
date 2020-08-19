import { IDeleteService } from './interfaces/IDeleteService';
import { DeleteCommandBase, ErrorDto } from '../dtos';
import { ServiceBase } from './base/ServiceBase';
import { Result } from '../result';
import { IApiClient } from './interfaces/IApiClient';


export abstract class DeleteServiceBase<TDeleteCommand extends DeleteCommandBase> extends ServiceBase
		implements IDeleteService<TDeleteCommand> {
	protected constructor(apiControllerUrl: string, apiClient: IApiClient) {
		super(apiControllerUrl, apiClient);
	}

	async delete(command: TDeleteCommand): Promise<Result<boolean, ErrorDto>> {
		try {
			const response = await this.client.delete(this.apiControllerUrl, command);
			return this.handleResponse(response) as Result<boolean, ErrorDto>;
		} catch (e) {
			return this.errorResult(e);
		}
	}
}
