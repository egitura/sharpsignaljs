import { DataSourceQuery } from '../..';

export class DataSourceResult<TDto> {
	constructor(
			public readonly items: TDto[],
			public readonly totalPageCount: number,
			public readonly totalRecordCount: number,
			public readonly dataSourceQuery?: DataSourceQuery<TDto>
	) {

	}
}
