import { Operation, OperationResult } from './Operation';
import { Collection } from '../collection';
import { Result } from './Result';

// <OT, O extends Operation<OT>,E, R extends Result<R, E>>
/* TODO: Complete OperationResultCollection + Add Tests */
export class OperationResultCollection<TBody,
		TOperation extends Operation<TBody>,
		TResult extends Result<TResultBody, TError>,
		TResultBody,
		TError>
		extends Collection<OperationResult<TBody, TOperation, TResult, TResultBody, TError>> {
	private constructor() {
		super();
	}

	/*get items(): Array<OperationResult<TBody, TOperation, TResult, TResultBody, TError>> {
		return super.items as Array<OperationResult<TBody, TOperation, TResult, TResultBody, TError>>;
	}*/

	get validItems(): Array<OperationResult<TBody, TOperation, TResult, TResultBody, TError>> {
		return this.items.filter(i => i.result.isValid);
	}

	get invalidItems(): Array<OperationResult<TBody, TOperation, TResult, TResultBody, TError>> {
		return this.items.filter(i => !i.result.isValid);
	}

	get isValid(): boolean {
		return !(this.invalidItems.length > 0);
	}

	get isInvalid(): boolean {
		return !this.isValid;
	}

	get isPartiallyValid(): boolean {
		return this.validItems.length > 0
				&& this.validItems.length < this.items.length;
	}

	public static new() {
		return new OperationResultCollection();
	}

	public pushRange(
			items: Array<OperationResult<TBody, TOperation, TResult, TResultBody, TError>>) {
		items.forEach(i => {
			this.items.push(i);
		});
	}
}

/*OperationResultCollection.new().push(
		new OperationResult(
				Operation.query('testqueryobject'),
				ok(true)
		)
);*/
