import { err, InvalidResult, ok, Result, ValidResult } from '../../src/result';
import { SampleDto, SampleErrorDto } from './Dtos';

export class asyncHelper {
	asyncFunction = jest.fn(async (result: number) => {
		let promise = new Promise(resolve => {
			setTimeout((innerResult: number) => {
				resolve('resolved-> ' + innerResult);
			}, 10, result);
		});
		await promise;
	});
	asyncErrorHandleFunction = jest.fn(async (result: []) => {
		let promise = new Promise(resolve => {
			setTimeout((innerResult: []) => {
				resolve('resolved-> ' + innerResult.toString());
			}, 10, result);
		});
		await promise;
	});
	asyncErrorHandleFunctionRejecting = jest.fn(async (result: []) => {
		let promise = new Promise((_resolve, reject) => {
			setTimeout((_innerResult: []) => {
				reject('some reason for rejection-> ');
			}, 10, result);
		});
		await promise;
	});
	async asyncServiceCall(): Promise<Result<SampleDto, SampleErrorDto>> {
		return new Promise<ValidResult<SampleDto, SampleErrorDto>>(resolve => {
			setTimeout(() => {
				let value: SampleDto = new SampleDto();
				resolve(ok(value));
			}, 10);
		});
	};
	async asyncServiceCallReturningInvalidResult(): Promise<Result<SampleDto, SampleErrorDto>> {
		return new Promise<InvalidResult<SampleErrorDto>>(resolve => {
			setTimeout(() => {
				let error: SampleErrorDto = new SampleErrorDto();
				resolve(err([error]));
			}, 10);
		});
	}
}
