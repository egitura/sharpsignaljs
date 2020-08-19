import { ErrorDto, GetByGuidQuery } from '../dtos';
import { ServiceBase } from './base/ServiceBase';
import { IGetService } from './interfaces/IGetService';
import { Result } from '../result';
import { IApiClient } from './interfaces/IApiClient';
import { DataSourceQuery } from '../dtos';
import { DataSourceResult } from '../dtos';

export abstract class GetServiceBase<TDto> extends ServiceBase implements IGetService<TDto> {

	protected constructor(private getAllSuffix: string, apiControllerUrl: string, apiClient: IApiClient) {
		super(apiControllerUrl, apiClient);
	}

	async getById(query: GetByGuidQuery): Promise<Result<TDto, ErrorDto>> {
		try {
			const response = await this.client.get(`${this.apiControllerUrl}/${query.id}`);
			return this.handleResponse(response) as Result<TDto, ErrorDto>;
		} catch (e) {
			return this.errorResult(e);
		}
	}

	async getAll(query?: DataSourceQuery<TDto>): Promise<Result<DataSourceResult<TDto>, ErrorDto>> {
		try {
			const response = await this.client.post(`${this.apiControllerUrl}/${this.getAllSuffix}`, query ? query : {});
			return this.handleResponse(response) as Result<DataSourceResult<TDto>, ErrorDto>;
		} catch (e) {
			return this.errorResult(e);
		}
	}
}
