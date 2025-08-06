import {
    ICredentialType,
    INodeProperties,
    ICredentialTestRequest,
    IAuthenticateGeneric,
} from 'n8n-workflow';
import { BASE_DOMAIN } from '../shared/constants';

export class BizwachatNotifyerApi implements ICredentialType {
    name = 'bizwachatNotifyerApi';
    displayName = 'Bizwachat Notifyer System Trigger API';
    documentationUrl = 'https://docs.bizwachat.app/n8n-overview';
    
    // Properties shown in the credentials dialog
    properties: INodeProperties[] = [
        {
            displayName: 'API Key',
            name: 'apiKey',
            type: 'string',
			typeOptions: { password: true },
            default: '',
            required: true,
            description: 'API Key for Bizwachat',
        },
        {
            displayName: 'Webhook URL',
            name: 'productionWebhookUrl',
            type: 'string',
            default: '',
            required: true,
            description: 'Enter your webhook URL for testing. In production, this will be automatically determined.',
        }
    ];

    authenticate: IAuthenticateGeneric = {
        type: 'generic',
        properties: {
            headers: {
                Authorization: '={{$credentials.apiKey}}',
            },
        },
    };

    // This method is called when the "Test" button is clicked
    test: ICredentialTestRequest = {
        request: {
            baseURL: `${BASE_DOMAIN}/api:dBShrB6H`,
            url: '/n8n',
            method: 'POST',
            body: {
                hookUrl: '={{$credentials.productionWebhookUrl}}'
            },
            headers: {
                'Content-Type': 'application/json'
            }
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