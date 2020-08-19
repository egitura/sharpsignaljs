import { ok, ValidResult } from '../../src/result';
import { testReverse } from '../../src/_experimental/testReverse';

test('mycustomtest', () => {
	// ARRANGE
	let test: ValidResult<boolean, unknown>;
	test = ok(true);
	// ASSERT
	expect(test.isValid).toBe(true);
});

test('testReverse', () => {
	// ARRANGE + ACT
	const reversedString = testReverse('TypeScript');
	const reversedArray = testReverse([1, 2, 3]);
	//console.log('tolowercase', reversedArray.toLowerCase());
	/*console.log('string', reversedString);
	console.log('array', reversedArray);*/

	// ASSERT
	expect(reversedString).toEqual('tpircSepyT');
	expect(reversedArray).toEqual([3, 2, 1]);
});
