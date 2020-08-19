import { CommandBase } from './CommandBase';

export abstract class DeleteCommandBase extends CommandBase {
	protected constructor(public readonly id: string) {
		super();
	}
}
