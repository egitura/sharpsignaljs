import { ErrorDto, UpdateCommandBase } from '../../dtos';
import { Result } from '../../result';
export interface IUpdateService<TDto, TUpdateCommand extends UpdateCommandBase> {
	update(command: TUpdateCommand): Promise<Result<TDto, ErrorDto>>;
}
