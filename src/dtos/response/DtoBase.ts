export abstract class DtoBase {
	protected constructor(
			public readonly id: string = '',
			public readonly createdOn: string = '',
			public readonly lastModifiedOn: string = '',
			public readonly createdBy: string = '',
			public readonly lastModifiedBy: string = ''
	) {
	}
}
