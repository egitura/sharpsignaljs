import { CreateCommandBase, ErrorDto } from '../../dtos';
import { Result } from '../../result';

export interface ICreateService<TDto, TCreateCommand extends CreateCommandBase> {
	create(command: TCreateCommand): Promise<Result<TDto, ErrorDto>>;
}
