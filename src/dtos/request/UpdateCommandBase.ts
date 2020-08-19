import { CommandBase } from './CommandBase';

export abstract class UpdateCommandBase extends CommandBase {
	constructor(public readonly id: string) {
		super();
	}
}
