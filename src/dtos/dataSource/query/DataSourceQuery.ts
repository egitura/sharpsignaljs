import { FilterOptionGroup } from './FilterOptionGroup';
import { PageOption } from './PageOption';
import { SortOption } from './SortOption';

export class DataSourceQuery<TDto> {
	constructor(
			public filterOptionGroup: FilterOptionGroup<TDto> | null,
			public pageOption: PageOption | null,
			public sortOptions: SortOption<TDto>[]
	) {

	}
}
