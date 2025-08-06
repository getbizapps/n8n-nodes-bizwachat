import { BizwachatApi } from '../../credentials/BizwachatApi.credentials';
import { IAuthenticateGeneric } from 'n8n-workflow';

describe('BizwachatApi Credentials', () => {
	let credentials: BizwachatApi;

	beforeAll(() => {
		credentials = new BizwachatApi();
	});

	test('should have the correct name', () => {
		expect(credentials.name).toBe('bizwachatApi');
	});

	test('should have the correct display name', () => {
		expect(credentials.displayName).toBe('Bizwachat API');
	});

	test('should have required properties', () => {
		expect(credentials.properties).toHaveLength(1);
		
		const apiKeyProperty = credentials.properties[0];
		expect(apiKeyProperty.name).toBe('apiKey');
		expect(apiKeyProperty.type).toBe('string');
		expect(apiKeyProperty.displayName).toBe('API Key');
		expect(apiKeyProperty.typeOptions).toEqual({ password: true });
	});

	test('should have correct authentication method', () => {
		expect(credentials.authenticate).toBeDefined();
		expect(credentials.authenticate.type).toBe('generic');
		
		const auth = credentials.authenticate as IAuthenticateGeneric;
		expect(auth.properties).toBeDefined();
		
		// Type assertion to ensure TypeScript knows the property exists
		if (auth.properties && auth.properties.headers) {
			expect(auth.properties.headers).toHaveProperty('Authorization');
			expect(auth.properties.headers.Authorization).toBe('={{$credentials.apiKey}}');
		} else {
			throw new Error('Authentication properties or headers property is missing');
		}
	});
}); 