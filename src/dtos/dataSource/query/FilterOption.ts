import { FilterOperator } from './enum/FilterOperator';

export class FilterOption<TDto> {
	constructor(
			public readonly propertyName: keyof TDto,
			public readonly value: string,
			public readonly operator: FilterOperator
	) {

	}
}
