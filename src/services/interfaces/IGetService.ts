import { Result } from '../../result';
import { ErrorDto, GetByGuidQuery } from '../../dtos';
import { DataSourceQuery } from '../../dtos';
import { DataSourceResult } from '../../dtos';


export interface IGetService<TDto> {
	getAll(query?: DataSourceQuery<TDto>): Promise<Result<DataSourceResult<TDto>, ErrorDto>>;

	getById(query: GetByGuidQuery): Promise<Result<TDto, ErrorDto>>;
}
