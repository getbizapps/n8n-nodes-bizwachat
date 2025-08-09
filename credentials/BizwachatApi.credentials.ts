import {
	IAuthenticateGeneric, ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class BizwachatApi implements ICredentialType {
	name = 'bizwachatApi';
	displayName = 'Bizwachat API';
	documentationUrl = 'https://bizwachat.com/references/getting-started';
	properties: INodeProperties[] = [
		{
			displayName: 'Access Token',
			name: 'apiToken',
			type: 'string',
			placeholder: "The channel or global access token",
			default: '',
			required: true,
			typeOptions: {
				password: true
			},
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'Authorization': '={{"Bearer " + $credentials.apiToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://bizwachat.com/api',
			url: '/check-api-key',
			method: 'GET',
			headers: {
				'Authorization': '={{"Bearer " + $credentials.apiToken}}',
			}
		},
	};
}
