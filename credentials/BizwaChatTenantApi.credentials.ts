import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class BizwaChatTenantApi implements ICredentialType {
	name = 'bizwaChatTenantApi';
	displayName = 'BizwaChat Tenant API';
	documentationUrl = 'https://www.bizwachat.com/';
	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://bizwachat.com',
			required: true,
			description: 'The BizwaChat app URL your users log into.',
		},
		{
			displayName: 'API Path Prefix',
			name: 'apiPathPrefix',
			type: 'string',
			default: '/api/v3',
			required: true,
			description: 'The tenant token API prefix. Keep the default unless your BizwaChat deployment exposes a different v3 integration path.',
		},
		{
			displayName: 'Tenant Subdomain',
			name: 'tenantSubdomain',
			type: 'string',
			default: '',
			required: true,
			description: 'The tenant slug shown in BizwaChat, for example test or acme.',
		},
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			default: '',
			required: true,
			typeOptions: {
				password: true,
			},
			description: 'Generate this token in Settings > System Settings > API Management inside BizwaChat.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{"Bearer " + $credentials.apiToken}}',
				Accept: 'application/json',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			url: '={{$credentials.baseUrl.replace(/\/$/, "") + "/" + $credentials.apiPathPrefix.replace(/^\/+|\/+$/g, "") + "/" + $credentials.tenantSubdomain + "/templates?per_page=1"}}',
			method: 'GET',
			skipSslCertificateValidation: true,
		},
	};
}