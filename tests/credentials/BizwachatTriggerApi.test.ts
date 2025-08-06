import { BizwachatTriggerApi } from '../../credentials/BizwachatTriggerApi.credentials';
import { IAuthenticateGeneric, ICredentialTestRequest } from 'n8n-workflow';

describe('BizwachatTriggerApi Credentials', () => {
	let credentials: BizwachatTriggerApi;

	beforeAll(() => {
		credentials = new BizwachatTriggerApi();
	});

	test('should have the correct name', () => {
		expect(credentials.name).toBe('bizwachatTriggerApi');
	});

	test('should have the correct display name', () => {
		expect(credentials.displayName).toBe('Bizwachat Trigger API');
	});

	test('should have the correct documentation URL', () => {
		expect(credentials.documentationUrl).toBe('https://docs.bizwachat.app/n8n-overview');
	});

	test('should have required properties', () => {
		expect(credentials.properties).toHaveLength(2);
		
		const apiKeyProperty = credentials.properties[0];
		expect(apiKeyProperty.name).toBe('apiKey');
		expect(apiKeyProperty.type).toBe('string');
		expect(apiKeyProperty.displayName).toBe('API Key');
		expect(apiKeyProperty.typeOptions).toEqual({ password: true });
		expect(apiKeyProperty.required).toBe(true);
		expect(apiKeyProperty.description).toBe('API Key for Bizwachat Trigger');

		const webhookProperty = credentials.properties[1];
		expect(webhookProperty.name).toBe('productionWebhookUrl');
		expect(webhookProperty.type).toBe('string');
		expect(webhookProperty.displayName).toBe('Webhook URL');
		expect(webhookProperty.required).toBe(true);
		expect(webhookProperty.description).toBe('Enter your webhook URL for testing. In production, this will be automatically determined.');
	});

	test('should have correct authentication method', () => {
		expect(credentials.authenticate).toBeDefined();
		expect(credentials.authenticate.type).toBe('generic');
		
		const auth = credentials.authenticate as IAuthenticateGeneric;
		expect(auth.properties).toBeDefined();
		
		if (auth.properties && auth.properties.headers) {
			expect(auth.properties.headers).toHaveProperty('Authorization');
			expect(auth.properties.headers.Authorization).toBe('={{$credentials.apiKey}}');
		} else {
			throw new Error('Authentication properties or headers property is missing');
		}
	});

	test('should have correct test configuration', () => {
		expect(credentials.test).toBeDefined();
		
		const test = credentials.test as ICredentialTestRequest;
		expect(test.request).toBeDefined();
		expect(test.request.method).toBe('POST');
		expect(test.request.url).toBe('/n8n/webhook');
		expect(test.request.body).toEqual({
			url: '={{$credentials.productionWebhookUrl}}'
		});
		expect(test.request.headers).toEqual({
			'Content-Type': 'application/json'
		});
		expect(test.request.baseURL).toContain('/api:KXAU3bZ4');
	});
}); 