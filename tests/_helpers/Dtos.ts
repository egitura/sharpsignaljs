export class SampleDto {}
export class SampleMappedDto {
	mapFrom(_dto: SampleDto) {
		return new SampleMappedDto();
	}
}
export class SampleErrorDto {}
