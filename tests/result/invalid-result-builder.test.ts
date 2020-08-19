import { InvalidResult, InvalidResultBuilder } from '../../src';
import { AnError, AnotherError, ErrorBase, IError } from '../_helpers/AnError';

describe('InvalidResultBuilder', () => {
	let builder: InvalidResultBuilder<ErrorBase | IError>;
	beforeEach(() => {
		builder = new InvalidResultBuilder();
	});

	describe('add', () => {
		//const builder = new InvalidResultBuilder();
		it('should provide the ability to add an error of T', () => {
			// ARRANGE
			let anError = new AnError();

			// ACT
			builder.add(anError);
			let result = builder.toResult();

			// ASSERT
			expect(builder.add).toBeInstanceOf(Function);
			expect(result.errors[0]).toBeInstanceOf(AnError);
		});

		it('should provide the ability to add different types of errors of T', () => {
			// ARRANGE
			let anError = new AnError();
			let anotherError = new AnotherError();

			// ACT
			builder.add(anError);
			builder.add(anotherError);
			let result = builder.toResult();

			// ASSERT
			expect(result.errors).toContain(anError);
			expect(result.errors).toContain(anotherError);
			expect(result.errors[0]).toBeInstanceOf(AnError);
			expect(result.errors[1]).toBeInstanceOf(AnotherError);
		});
	});

	describe('toResult', () => {
		it('should return a new InvalidResult with the added errors', () => {
			// ARRANGE
			let anError = new AnError();
			let anotherError = new AnotherError();
			builder.add(anError);
			builder.add(anotherError);

			// ACT
			let result = builder.toResult();

			// ASSERT
			expect(result).toBeInstanceOf(InvalidResult);
			expect(result.errors.length).toBe(2);
			expect(result.errors[0]).toBeInstanceOf(AnError);
			expect(result.errors[1]).toBeInstanceOf(AnotherError);
			expect(result.errors).toContain(anError);
			expect(result.errors).toContain(anotherError);
		});
	});

	describe('reset', () => {
		it('should clear the list of errors', () => {
			// ARRANGE
			let anError = new AnError();
			builder.add(anError);

			// ACT
			builder.reset();
			let result = builder.toResult();

			// ASSERT
			expect(result.errors).not.toContain(anError);
			expect(result.errors.length).toBe(0);
		});
	});

});
