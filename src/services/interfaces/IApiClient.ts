import { IApiResponse } from './IApiResponse';

export interface IApiClient {
	getBaseUrl(): string;
	getApiKey(): string;
	getToken(): string;

	getDownload(url: string): Promise<any>;

	get(url: string, queryStringParams?: string): Promise<IApiResponse>;

	post(url: string, requestBodyData: object, queryStringParams?: string): Promise<IApiResponse>;

	put(url: string, requestBodyData: object, queryStringParams?: string): Promise<IApiResponse>;

	delete(url: string, requestBodyData: object, queryStringParams?: string): Promise<IApiResponse>;

	options(url: string, requestBodyData: object, queryStringParams?: string): Promise<IApiResponse>;

	patch(url: string, requestBodyData: object, queryStringParams?: string): Promise<IApiResponse>;
}
