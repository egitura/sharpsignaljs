import { err, InvalidResult, InvalidResultBuilder, ok, Result, ResultBase, ValidResult } from './result';
import { IKeyOfValueStore, IKeyValueStore, KeyOfValueStore, KeyValueStore } from './collection';
import {
	CreateCommandBase,
	DataSourceQuery,
	DataSourceResult,
	DeleteCommandBase,
	DtoBase,
	ErrorDto,
	FilterOperator,
	FilterOption,
	FilterOptionGroup,
	GetByGuidQuery,
	LogicalFilterOperator,
	PageOption,
	SortDirection,
	SortOption,
	UpdateCommandBase
} from './dtos';

import {
	CreateServiceBase,
	DeleteServiceBase,
	GetServiceBase,
	IApiClient,
	IApiResponse,
	ICreateService,
	IDeleteService,
	IGetService,
	IUpdateService,
	ServiceBase,
	UpdateServiceBase
} from './services';
/*import { Collection } from './collection';
import { Operation, OperationResult } from './result/Operation';*/


// Dto exports
export {
	ErrorDto,
	CreateCommandBase,
	DeleteCommandBase,
	GetByGuidQuery,
	UpdateCommandBase,
	DtoBase,
	DataSourceResult,
	DataSourceQuery,
	FilterOptionGroup,
	SortOption,
	PageOption,
	FilterOption,
	FilterOperator,
	LogicalFilterOperator,
	SortDirection
};

// Collection exports
export {
	IKeyOfValueStore,
	IKeyValueStore,
	KeyOfValueStore,
	KeyValueStore
};

// Result export
export {
	ok,
	err,
	Result,
	ResultBase,
	ValidResult,
	InvalidResult,
	InvalidResultBuilder
	/*,
		Operation,
		OperationResult,
		OperationResultCollection,
		Collection*/
};

// Services exports
export {
	IApiClient,
	DeleteServiceBase,
	UpdateServiceBase,
	CreateServiceBase,
	GetServiceBase,
	ServiceBase,
	IApiResponse,
	ICreateService,
	IDeleteService,
	IGetService,
	IUpdateService
} ;
