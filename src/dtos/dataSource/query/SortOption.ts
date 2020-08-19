import { SortDirection } from './enum/SortDirection';

export class SortOption<TDto> {
	constructor(
			public readonly propertyName: keyof TDto,
			public readonly direction: SortDirection
	) {

	}
}
