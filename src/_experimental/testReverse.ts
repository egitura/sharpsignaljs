
export function testReverse(string: string): string;
export function testReverse<T>(array: T[]): T[];
//export function testReverse<T>(array: Array<T>): string;
export function testReverse(stringOrArray: string | any[]) {
	return typeof stringOrArray !== 'string'
			? stringOrArray.slice().reverse()
			: stringOrArray.split('').reverse().join('');
}
