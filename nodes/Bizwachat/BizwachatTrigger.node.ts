import {
    INodeType,
    INodeTypeDescription,
    IWebhookFunctions,
    IWebhookResponseData,
} from 'n8n-workflow';

export class BizwachatTrigger implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Incoming message Trigger',
        name: 'bizwachatTrigger',
        icon: 'file:bizwachat.svg',
        group: ['trigger'],
        version: 1,
        subtitle: 'Incoming Message',
        description: 'Triggers when receiving messages from Bizwachat services',
        defaults: {
            name: 'Bizwachat Trigger',
        },
        inputs: [],
        outputs: ['main'],
        credentials: [
            {
                name: 'bizwachatTriggerApi',
                required: true,
                displayOptions: {
                    show: {
                        credentialType: ['bizwachatTrigger'],
                    },
                },
            },
            {
                name: 'bizwachatNotifierApi',
                required: true,
                displayOptions: {
                    show: {
                        credentialType: ['notifier'],
                    },
                },
            },
            {
                name: 'bizwachatNotifyerApi',
                required: true,
                displayOptions: {
                    show: {
                        credentialType: ['notifyer'],
                    },
                },
            },
        ],
        webhooks: [
            {
                name: 'default',
                httpMethod: '={{$parameter["httpMethod"]}}',
                responseMode: '={{$parameter["responseMode"]}}',
                path: 'bizwachat-webhook',
                isFullPath: false,
            },
        ],
        properties: [
            {
                displayName: 'Credential Type',
                name: 'credentialType',
                type: 'options',
                options: [
                    {
                        name: 'Bizwachat Trigger API',
                        value: 'bizwachatTrigger',
                        description: 'Use Bizwachat Trigger API for incoming messages',
                    },
                    {
                        name: 'Bizwachat Notifier Trigger API',
                        value: 'notifier',
                        description: 'Use Bizwachat Notifier API for incoming messages',
                    },
                    {
                        name: 'Bizwachat Notifyer System Trigger API',
                        value: 'notifyer',
                        description: 'Use Bizwachat Notifyer System API for incoming messages',
                    }
                ],
                default: 'bizwachatTrigger',
                description: 'Choose which Bizwachat API to use for this trigger',
            },
            {
                displayName: 'HTTP Method',
                name: 'httpMethod',
                type: 'options',
                options: [
                    {
                        name: 'POST',
                        value: 'POST',
                    },
                ],
                default: 'POST',
                description: 'The HTTP method to listen to',
            },
            {
                displayName: 'Respond',
                name: 'responseMode',
                type: 'options',
                options: [
                    {
                        name: 'Immediately',
                        value: 'onReceived',
                        description: 'As soon as the request is received',
                    },
                    {
                        name: 'When Last Node Finishes',
                        value: 'lastNode',
                        description: 'After the last node in the workflow finishes executing',
                    },
                ],
                default: 'onReceived',
                description: 'When to respond to the webhook',
            },
        ],
    };

    async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
        const webhookData = this.getRequestObject().body;

        return {
            workflowData: [this.helpers.returnJsonArray(webhookData)],
        };
    }
}
