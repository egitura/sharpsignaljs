import { asyncHelper } from '../_helpers/asyncHelper';
import { SampleDto, SampleErrorDto, SampleMappedDto } from '../_helpers/Dtos';
import { InvalidResult } from '../../src/result';

test('Usage example: ifSuccess', async () => {
	let result = await new asyncHelper().asyncServiceCall();

	result.ifSuccess((resultValue) => {
		expect(resultValue).toBeInstanceOf(SampleDto);
	}).ifError((errors) => {
		console.log('cant be reached, no error:', errors);
	});
});

test('Usage example: ifSuccessAsync', async () => {
	let result = await new asyncHelper().asyncServiceCall();
	let anotherAsyncCall = new asyncHelper().asyncServiceCall;

	let resolvedResult = await result.ifSuccessAsync(async (resultValue) => {
		await anotherAsyncCall();
		expect(resultValue).toBeInstanceOf(SampleDto);
	});

	await resolvedResult.ifErrorAsync(async (errors: Array<SampleErrorDto>) => {
		console.log('cant be reached, no error:', errors);
	});
});

test('Usage example: ifError', async () => {
	let result = await new asyncHelper().asyncServiceCallReturningInvalidResult();
	expect(result).toBeInstanceOf(InvalidResult);

	result.ifSuccess((resultValue) => {
		console.log('cant be reached, no success: ', resultValue);
	}).ifError((errors) => {
		expect(errors).toBeInstanceOf(Array);
		expect(errors[0]).toBeInstanceOf(SampleErrorDto);
	});
});

test('Usage example: map', async () => {
	let result = await new asyncHelper().asyncServiceCall();
	// @ts-ignore
	result.map<SampleMappedDto>((resultValue: SampleDto) => {
		expect(resultValue).toBeInstanceOf(SampleDto);
		return new SampleMappedDto().mapFrom(SampleDto);
	}).ifSuccess((resultValue: SampleMappedDto) => {
		expect(resultValue).toBeInstanceOf(SampleMappedDto);
	}).ifError((errors: Array<SampleErrorDto>) => {
		console.log('cant be reached, no error:', errors);
	});

	let invalidResult = await new asyncHelper().asyncServiceCallReturningInvalidResult();
	// @ts-ignore
	invalidResult.map<SampleMappedDto>((resultValue: SampleDto) => {
		console.log('cant be reached, no success');
		return new SampleMappedDto().mapFrom(resultValue);
	}).ifError((errors: Array<SampleErrorDto>) => {
		expect(errors).toBeInstanceOf(Array);
		expect(errors[0]).toBeInstanceOf(SampleErrorDto);
	});
});
