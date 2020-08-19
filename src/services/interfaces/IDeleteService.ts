import { Result } from '../../result';
import { DeleteCommandBase, ErrorDto } from '../../dtos';


export interface IDeleteService<TDeleteCommand extends DeleteCommandBase> {
	delete(command: TDeleteCommand): Promise<Result<boolean, ErrorDto>>;
}
