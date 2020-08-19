/* TODO: Complete Operation + Add Tests */

import { Result } from './Result';

export enum OperationType {
	Query = 0,
	Command = 1,
	Func = 2,
	Action = 3
}

export interface IOperation<TBody> {
	value: TBody
	type: OperationType | number
}

export class Operation<TBody> implements IOperation<TBody> {
	protected constructor(
			public value: TBody,
			public type: OperationType
	) {
		this.value = value;
		this.type = type;
	}

	public static new<TBody>(value: TBody, type: OperationType) {
		switch (type) {
			case OperationType.Query:
			case OperationType.Command:
			case OperationType.Func:
			case OperationType.Action:
				return new Operation<TBody>(value, type);
			default:
				return Operation.assertNever(type);
		}
	}

	public static query<TBody>(value: TBody) {
		return Operation.new<TBody>(value, OperationType.Query);
	}

	public static command<TBody>(value: TBody) {
		return new Operation<TBody>(value, OperationType.Command);
	}

	public static func<TBody>(value: TBody) {
		return new Operation(value, OperationType.Func);
	}

	private static assertNever(type: never): never {
		throw Error(`Unexpected operation type: '${type}'`);
	}
}

export class OperationResult<TBody,
		TOperation extends Operation<TBody>,
		TResult extends Result<TResultBody, TError>,
		TResultBody,
		TError> {
	constructor(
			public operation: TOperation,
			public result: TResult) {
	}
}
