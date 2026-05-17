import { createHmac, timingSafeEqual } from 'crypto';

import type {
	IDataObject,
	INodeProperties,
	INodeType,
	INodeTypeDescription,
	IWebhookFunctions,
	IWebhookResponseData,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import { bizwaChatWebhookEventOptions } from '../../shared/BizwaChatApi.helpers';

export class BizwaChatWebhookTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'BizwaChat Trigger',
		name: 'bizwaChatWebhookTrigger',
		icon: 'file:bizwachat.svg',
		group: ['trigger'],
		version: 1,
		description: 'Receive BizwaChat webhook events from the tenant Webhook Management screen.',
		defaults: {
			name: 'BizwaChat Trigger',
		},
		inputs: [],
		outputs: ['main'],
		properties: triggerProperties,
		webhooks: [
			{
				httpMethod: 'POST',
				name: 'default',
				path: 'bizwachat',
				responseData: 'firstEntryJson',
				responseMode: 'onReceived',
			},
		],
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const body = (this.getBodyData() ?? {}) as IDataObject;
		const headers = this.getHeaderData();
		const selectedEventTypes = this.getNodeParameter('eventTypes', []) as string[];
		const includeHeaders = this.getNodeParameter('includeHeaders', false) as boolean;
		const verifySignature = this.getNodeParameter('verifySignature', false) as boolean;

		if (verifySignature) {
			const signingSecret = this.getNodeParameter('signingSecret', '') as string;
			verifyBizwaChatSignature(body, headers['x-webhook-signature'], signingSecret, this.getNode().name);
		}

		const eventType = String((body.event as IDataObject | undefined)?.type ?? '');

		if (selectedEventTypes.length > 0 && eventType !== '' && !selectedEventTypes.includes(eventType)) {
			return {
				webhookResponse: {
					eventType,
					filtered: true,
					received: true,
				},
			};
		}

		const output = { ...body };
		if (includeHeaders) {
			output.headers = headers as unknown as IDataObject;
		}

		return {
			webhookResponse: {
				eventType,
				received: true,
			},
			workflowData: [[{ json: output }]],
		};
	}
}

const triggerProperties: INodeProperties[] = [
	{
		displayName: 'Setup',
		name: 'setupNotice',
		type: 'notice',
		default: '',
		description: 'Copy this node\'s webhook URL into BizwaChat at Settings > System Settings > Webhook Management. Then enable the events you want BizwaChat to push into n8n.',
	},
	{
		displayName: 'Event Types',
		name: 'eventTypes',
		type: 'multiOptions',
		default: [],
		options: bizwaChatWebhookEventOptions,
		description: 'Leave empty to accept every BizwaChat webhook event that hits this URL.',
	},
	{
		displayName: 'Include Headers',
		name: 'includeHeaders',
		type: 'boolean',
		default: false,
		description: 'Whether to include the incoming webhook headers in the output item.',
	},
	{
		displayName: 'Verify Signature',
		name: 'verifySignature',
		type: 'boolean',
		default: false,
		description: 'Validate the X-Webhook-Signature header before the workflow continues.',
	},
	{
		displayName: 'Signing Secret',
		name: 'signingSecret',
		type: 'string',
		default: '',
		required: true,
		typeOptions: {
			password: true,
		},
		displayOptions: {
			show: {
				verifySignature: [true],
			},
		},
		description: 'Use the same webhook signing secret configured on the BizwaChat side.',
	},
];

function verifyBizwaChatSignature(
	body: IDataObject,
	rawHeader: string | string[] | undefined,
	signingSecret: string,
	nodeName: string,
): void {
	if (signingSecret.trim() === '') {
		throw new NodeOperationError({ name: nodeName } as never, 'A signing secret is required when signature verification is enabled.');
	}

	const providedSignature = Array.isArray(rawHeader) ? rawHeader[0] : rawHeader;
	if (!providedSignature) {
		throw new NodeOperationError({ name: nodeName } as never, 'Missing X-Webhook-Signature header on incoming BizwaChat webhook.');
	}

	const expectedSignature = createHmac('sha256', signingSecret)
		.update(JSON.stringify(body))
		.digest('hex');

	const providedBuffer = Buffer.from(providedSignature, 'utf8');
	const expectedBuffer = Buffer.from(expectedSignature, 'utf8');

	if (providedBuffer.length !== expectedBuffer.length || !timingSafeEqual(providedBuffer, expectedBuffer)) {
		throw new NodeOperationError({ name: nodeName } as never, 'Invalid BizwaChat webhook signature.');
	}
}