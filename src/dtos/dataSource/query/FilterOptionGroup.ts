import { FilterOption } from './FilterOption';
import { LogicalFilterOperator } from './enum/LogicalFilterOperator';

export class FilterOptionGroup<TDto> {
	constructor(
			public readonly filterOptions: FilterOption<TDto>[],
			public readonly filterOptionGroups: FilterOptionGroup<TDto>[] | null,
			public readonly logicalOperator: LogicalFilterOperator | '' | null
	) {
	}
}


