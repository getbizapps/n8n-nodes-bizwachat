import { IAuthenticateGeneric, ICredentialTestRequest, ICredentialType, INodeProperties } from 'n8n-workflow';
import { BASE_DOMAIN } from '../shared/constants';

export class BizwachatApi implements ICredentialType {
	name = 'bizwachatApi';
	displayName = 'Bizwachat API';
	// Uses the link to this tutorial as an example
	// Replace with your own docs links when building your own nodes
	documentationUrl =
		'https://docs.bizwachat.app/n8n-overview';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: `${BASE_DOMAIN}/api`,
			url: '/check-api-key-across-projects',
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		},
		rules: [
			{
				type: 'responseSuccessBody',
				properties: {
					key: 'success',
					value: false,
					message: 'Invalid API key',
				},
			},
		],
	};
}