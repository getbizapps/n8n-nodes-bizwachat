import {
IExecuteFunctions,
ILoadOptionsFunctions,
INodeExecutionData,
INodeType,
INodeTypeDescription,
NodeOperationError,
INodePropertyOptions,
ResourceMapperFields,
IHttpRequestOptions,
} from 'n8n-workflow';



import { WHATSAPP_TIMEZONES } from './timezones';
import { BASE_DOMAIN } from '../../shared/constants';

const BASE_URLS = {
	VALIDATION: `${BASE_DOMAIN}/api`,
	NOTIFIER: `${BASE_DOMAIN}/api`,
	NOTIFYER: `${BASE_DOMAIN}/api`,
	WHATSABLE: `${BASE_DOMAIN}/api`,
	DEFAULT: `${BASE_DOMAIN}/api`,
};

// Bizwachat n8n Node
// --- Usage ---
// This node supports WhatsApp messaging, media upload, template sending, and scheduling via Bizwachat API.
// All API calls use robust error handling and input validation. See inline comments for details.
// Node properties and operations are documented for user guidance.

export class Bizwachat implements INodeType {
	/**
	 * Node description for Bizwachat WhatsApp integration
	 */
	description: INodeTypeDescription = {
		displayName: 'Bizwachat',
		name: 'bizwachat',
		icon: 'file:bizwachat.svg',
		group: ['output'],
		version: 1,
		subtitle: '={{$parameter["operation"] || "Configure WhatsApp messaging"}}',
		description: 'Automate WhatsApp messages and media via Bizwachat',
		defaults: {
			name: 'Bizwachat',
		},
	inputs: ['main'],
	outputs: ['main'],
		credentials: [
			{ name: 'bizwachatApi', required: true },
		],
		properties: [
		// Resource selection
		{
			displayName: 'Resource',
			name: 'resource',
			type: 'options',
			noDataExpression: true,
		options: [
			{ name: 'Send Message', value: 'sendMessage' },
			{ name: 'Send Media', value: 'sendMedia' },
			{ name: 'Upload Media', value: 'uploadMedia' },
		],
		default: 'sendMedia',
			required: true,
		},
		// Operation selection
		{
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				show: {
					resource: ['sendMessage', 'uploadMedia', 'sendMedia'],
				},
			},
			options: [
				{ name: 'Send Media', value: 'sendMedia', description: 'Send WhatsApp media message', action: 'Send media message' },
				{ name: 'Send Message Via Bizwachat', value: 'sendBizwaChatMessage', description: 'Send WhatsApp messages via Bizwachat platform', action: 'Send message via bizwachat' },
				{ name: 'Send Message Via Notifier', value: 'sendNotifyerMessage', description: 'Send WhatsApp messages via Bizwachat Notifier', action: 'Send message via notifier' },
				{ name: 'Send Non-Template Via Notifyer', value: 'sendNonTemplateMessage', description: 'Send WhatsApp non-template message via Notifyer', action: 'Send non template message via notifyer' },
				{ name: 'Send Template Via Notifyer', value: 'sendNotifyerTemplate', description: 'Send WhatsApp template message via Notifyer', action: 'Send template message via notifyer' },
				{ name: 'Upload Media', value: 'uploadMedia', description: 'Upload media file to Bizwachat', action: 'Upload media file' },
			],
			default: 'sendMedia',
		required: true,
	},
		// File Upload (Upload Media)
		{
			displayName: 'File to Upload',
			name: 'binaryProperty',
			type: 'string',
			default: 'data',
		},
		{
			displayName: 'Attachment URL',
			name: 'attachment',
			type: 'string',
			default: '',
			displayOptions: {
				show: {
					resource: ['sendMessage'],
					operation: ['sendMessage'],
				},
			},
			description: 'Direct URL to a file (image, document, etc.) to send as an attachment. Optional.',
		},
		{
			displayName: 'Filename',
			name: 'filename',
			type: 'string',
			default: '',
			displayOptions: {
				show: {
					resource: ['sendMessage'],
					operation: ['sendMessage'],
				},
			},
			description: 'Filename for the attachment (optional)',
		},

		// Notifyer: Send Template
		{
			displayName: 'Recipient Phone Number',
			name: 'notifyerRecipient',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					resource: ['sendMessage'],
					operation: ['sendNotifyerTemplate'],
				},
			},
			description: 'WhatsApp phone number of the recipient in international format',
			default: '',
		},
		{
			displayName: 'Template Name or ID',
			name: 'notifyerTemplate',
			type: 'options',
			typeOptions: {
				loadOptionsMethod: 'getTemplates',
			},
			required: true,
			displayOptions: {
				show: {
					resource: ['sendMessage'],
					operation: ['sendNotifyerTemplate'],
				},
			},
			description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
			default: '',
		},
		{
			displayName: 'Template Variables',
			name: 'notifyerVariables',
			type: 'resourceMapper',
			noDataExpression: true,
			default: {
				mappingMode: 'defineBelow',
				value: null,
			},
			required: true,
			displayOptions: {
				show: {
					resource: ['sendMessage'],
					operation: ['sendNotifyerTemplate'],
				},
			},
			description: 'Map variables to template fields. Use the auto-generated fields for body, header, and media.',
			typeOptions: {
				loadOptionsDependsOn: ['notifyerTemplate'],
				resourceMapper: {
					resourceMapperMethod: 'getTemplateVariables',
					mode: 'add',
					fieldWords: {
						singular: 'variable',
						plural: 'variables',
					},
					addAllFields: true,
					multiKeyMatch: false,
					supportAutoMap: false,
				},
			},
		},
		{
			displayName: 'Note',
			name: 'templateNote',
			type: 'string',
			default: '',
			displayOptions: {
				show: {
					resource: ['sendMessage'],
					operation: ['sendNotifyerTemplate'],
				},
			},
			description: 'Optional note to add to the template message',
			typeOptions: {
				rows: 2,
			},
		},
		{
			displayName: 'Label Names or IDs',
			name: 'templateLabels',
			type: 'multiOptions',
			default: [],
			displayOptions: {
				show: {
					resource: ['sendMessage'],
					operation: ['sendNotifyerTemplate'],
				},
			},
			description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
			typeOptions: {
				loadOptionsMethod: 'getLabels',
			},
		},
		{
			displayName: 'Schedule Message',
			name: 'scheduleTemplateMessage',
			type: 'boolean',
			default: false,
			displayOptions: {
				show: {
					resource: ['sendMessage'],
					operation: ['sendNotifyerTemplate'],
				},
			},
			description: 'Whether to schedule the message for later delivery',
		},
		{
			displayName: 'Scheduled Date and Time',
			name: 'templateScheduledDateTime',
			type: 'dateTime',
			required: true,
			displayOptions: {
				show: {
					resource: ['sendMessage'],
					operation: ['sendNotifyerTemplate'],
					scheduleTemplateMessage: [true],
				},
			},
			description: 'The date and time when the message should be sent',
			default: '',
		},
		{
			displayName: 'Timezone',
			name: 'templateTimezone',
			type: 'options',
			displayOptions: {
				show: {
					resource: ['sendMessage'],
					operation: ['sendNotifyerTemplate'],
					scheduleTemplateMessage: [true],
				},
			},
			options: WHATSAPP_TIMEZONES,
			default: '',
			description: 'Timezone for the scheduled date and time',
		},


		// Fields for bizwachat product
		{
			displayName: 'Recipient Name or ID',
			name: 'bizwachatTo',
			type: 'options',
			typeOptions: {
				loadOptionsMethod: 'getWhatsAppNumbers',
			},
			required: true,
			displayOptions: {
				show: {
					resource: ['sendMessage'],
					operation: ['sendBizwaChatMessage'],
				},
			},
			description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
			default: '',
		},
		{
			displayName: 'Text',
			name: 'bizwachatText',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					resource: ['sendMessage'],
					operation: ['sendBizwaChatMessage'],
				},
			},
			description: 'Message text content',
			typeOptions: {
				rows: 4,
			},
			default: '',
		},
		{
			displayName: 'Attachment URL',
			name: 'bizwachatAttachment',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['sendMessage'],
					operation: ['sendBizwaChatMessage'],
				},
			},
			description: 'URL of an attachment to send',
			default: '',
		},
		{
			displayName: 'Filename',
			name: 'bizwachatFilename',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['sendMessage'],
					operation: ['sendBizwaChatMessage'],
				},
			},
			description: 'Filename for the attachment',
			default: '',
		},

		// Notifyer: Send Non-Template Message
		{
			displayName: 'Recipient Phone Number',
			name: 'nonTemplateRecipient',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					resource: ['sendMessage'],
					operation: ['sendNonTemplateMessage'],
				},
			},
			description: 'WhatsApp phone number of the recipient in international format',
			default: '',
		},
		{
			displayName: 'Message Type',
			name: 'messageType',
			type: 'options',
			required: true,
			displayOptions: {
				show: {
					resource: ['sendMessage'],
					operation: ['sendNonTemplateMessage'],
				},
			},
			options: [
				{
					name: 'Audio',
					value: 'audio',
				},
				{
					name: 'Document',
					value: 'document',
				},
				{
					name: 'Image',
					value: 'image',
				},
				{
					name: 'Text',
					value: 'text',
				},
				{
					name: 'Video',
					value: 'video',
				},
			],
			default: 'text',
			description: 'Select the type of WhatsApp message to send',
		},
		{
			displayName: 'Enable Link Preview',
			name: 'enableLinkPreview',
			type: 'boolean',
			default: false,
			displayOptions: {
				show: {
					resource: ['sendMessage'],
					operation: ['sendNonTemplateMessage'],
					messageType: ['text'],
				},
			},
			description: 'Whether to enable link preview for text messages containing URLs',
		},
		{
			displayName: 'Document URL',
			name: 'documentUrl',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					resource: ['sendMessage'],
					operation: ['sendNonTemplateMessage'],
					messageType: ['document'],
				},
			},
			description: 'URL of the document to send',
			default: '',
		},
		{
			displayName: 'Caption',
			name: 'documentCaption',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['sendMessage'],
					operation: ['sendNonTemplateMessage'],
					messageType: ['document'],
				},
			},
			description: 'Optional caption for the document',
			default: '',
		},
		{
			displayName: 'Filename',
			name: 'documentFilename',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					resource: ['sendMessage'],
					operation: ['sendNonTemplateMessage'],
					messageType: ['document'],
				},
			},
			description: 'Filename for the document',
			default: '',
		},
		{
			displayName: 'Preview URL',
			name: 'documentPreviewUrl',
			type: 'boolean',
			default: false,
			displayOptions: {
				show: {
					resource: ['sendMessage'],
					operation: ['sendNonTemplateMessage'],
					messageType: ['document'],
				},
			},
			description: 'Whether to enable URL preview for document',
		},
		{
			displayName: 'Image URL',
			name: 'imageUrl',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					resource: ['sendMessage'],
					operation: ['sendNonTemplateMessage'],
					messageType: ['image'],
				},
			},
			description: 'URL of the image to send',
			default: '',
		},
		{
			displayName: 'Caption',
			name: 'imageCaption',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['sendMessage'],
					operation: ['sendNonTemplateMessage'],
					messageType: ['image'],
				},
			},
			description: 'Optional caption for the image',
			default: '',
		},
		{
			displayName: 'Preview URL',
			name: 'previewUrl',
			type: 'boolean',
			default: false,
			displayOptions: {
				show: {
					resource: ['sendMessage'],
					operation: ['sendNonTemplateMessage'],
					messageType: ['image'],
				},
			},
			description: 'Whether to enable URL preview for image',
		},
		{
			displayName: 'Video URL',
			name: 'videoUrl',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					resource: ['sendMessage'],
					operation: ['sendNonTemplateMessage'],
					messageType: ['video'],
				},
			},
			description: 'URL of the video to send',
			default: '',
		},
		{
			displayName: 'Caption',
			name: 'videoCaption',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['sendMessage'],
					operation: ['sendNonTemplateMessage'],
					messageType: ['video'],
				},
			},
			description: 'Optional caption for the video',
			default: '',
		},
		{
			displayName: 'Preview URL',
			name: 'videoPreviewUrl',
			type: 'boolean',
			default: false,
			displayOptions: {
				show: {
					resource: ['sendMessage'],
					operation: ['sendNonTemplateMessage'],
					messageType: ['video'],
				},
			},
			description: 'Whether to enable URL preview for video',
		},
		{
			displayName: 'Audio URL',
			name: 'audioUrl',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					resource: ['sendMessage'],
					operation: ['sendNonTemplateMessage'],
					messageType: ['audio'],
				},
			},
			description: 'URL of the audio to send',
			default: '',
		},
		{
			displayName: 'Preview URL',
			name: 'audioPreviewUrl',
			type: 'boolean',
			default: false,
			displayOptions: {
				show: {
					resource: ['sendMessage'],
					operation: ['sendNonTemplateMessage'],
					messageType: ['audio'],
				},
			},
			description: 'Whether to enable URL preview for audio',
		},
		{
			displayName: 'Message Content',
			name: 'messageContent',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					resource: ['sendMessage'],
					operation: ['sendNonTemplateMessage'],
					messageType: ['text'],
				},
			},
			description: 'The content of the message (text or URL depending on message type)',
			default: '',
		},
		{
			displayName: 'Label Names or IDs',
			name: 'nonTemplateLabels',
			type: 'multiOptions',
			default: [],
			displayOptions: {
				show: {
					resource: ['sendMessage'],
					operation: ['sendNonTemplateMessage'],
				},
			},
			description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
			typeOptions: {
				loadOptionsMethod: 'getLabels',
			},
		},
		{
			displayName: 'Schedule Message',
			name: 'scheduleNonTemplateMessage',
			type: 'boolean',
			default: false,
			displayOptions: {
				show: {
					resource: ['sendMessage'],
					operation: ['sendNonTemplateMessage'],
				},
			},
			description: 'Whether to schedule the message for later delivery',
		},
		{
			displayName: 'Scheduled Date and Time',
			name: 'nonTemplateScheduledDateTime',
			type: 'dateTime',
			required: true,
			displayOptions: {
				show: {
					resource: ['sendMessage'],
					operation: ['sendNonTemplateMessage'],
					scheduleNonTemplateMessage: [true],
				},
			},
			description: 'The date and time when the message should be sent',
			default: '',
		},
		{
			displayName: 'Timezone',
			name: 'nonTemplateTimezone',
			type: 'options',
			displayOptions: {
				show: {
					resource: ['sendMessage'],
					operation: ['sendNonTemplateMessage'],
					scheduleNonTemplateMessage: [true],
				},
			},
			options: WHATSAPP_TIMEZONES,
			default: '',
			description: 'Timezone for the scheduled date and time',
		},

		// Hidden field to store product info
		{
			displayName: 'Detected Product',
			name: 'detectedProduct',
			type: 'hidden',
			default: '',
		},
		{
			displayName: 'User ID',
			name: 'userId',
			type: 'hidden',
			default: '',
		},
		],
	};

	methods = {
		loadOptions: {

			async getTemplates(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];

				try {
					// Fetch available templates from API using the user ID
					const templatesOptions: IHttpRequestOptions = {
						method: 'GET',
						baseURL: BASE_URLS.DEFAULT,
						url: `/templates`,
						headers: {
							'Accept': 'application/json',
						},
	};

					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						'bizwachatApi',
						templatesOptions,
					);

					// Process templates from response
					if (Array.isArray(response)) {
						for (const template of response) {
							// Extract metadata and components
							const name = template.name || template.id || template.template_id || 'Unnamed Template';
							const description = template.type ? `Type: ${template.type}, Language: ${template.language || 'Unknown'}, Variables: ${template.variable_counts || 0}` : '';
							const value = JSON.stringify({
								template_id: template.template_id || template.id,
								variable_counts: template.variable_counts || 0,
								template_formate: template.template_formate,
								components: template.components,
							});
							returnData.push({ name, description, value });
	}
					} else {
						// Fallback if no templates found
						returnData.push({
							name: 'No templates found',
							value: 'notfound',
							description: 'No templates were found for this user',
						});
					}
				} catch (error) {
					// If loading templates fails, provide an error message
					returnData.push({
						name: `Error: ${error.message}`,
						value: 'error',
						description: 'Failed to load templates',
					});
				}

				return returnData;
			},

			async getWhatsAppNumbers(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];

				try {
					// Get WhatsApp numbers
					const numbersOptions: IHttpRequestOptions = {
						method: 'GET',
						baseURL: BASE_URLS.DEFAULT,
						url: `/get-bizwachat-numbers`,
						headers: {
							'Accept': 'application/json',
						},
					};

					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						'bizwachatApi',
						numbersOptions,
					);

					// Process numbers from response
					if (Array.isArray(response)) {
						for (const number of response) {
							if (number.phone_number) {
								returnData.push({
									name: number.phone_number,
									value: number.phone_number,
									description: 'WhatsApp number',
								});
							}
						}
					} else {
						returnData.push({
							name: 'No numbers found',
							value: 'notfound',
							description: 'No WhatsApp numbers were found for this user',
						});
					}
				} catch (error) {
					returnData.push({
						name: `Error: ${error.message}`,
						value: 'error',
						description: 'Failed to load WhatsApp numbers',
					});
				}

				return returnData;
			},

			async getLabels(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];

				try {
					// Get labels
					const labelsOptions: IHttpRequestOptions = {
						method: 'GET',
						baseURL: BASE_URLS.DEFAULT,
						url: `/n8n/label`,
						headers: {
							'Accept': 'application/json',
						},
					};

					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						'bizwachatApi',
						labelsOptions,
					);

					// Process labels from response
					if (Array.isArray(response)) {
						for (const label of response) {
							if (label.label) {
								returnData.push({
									name: label.label,
									value: label.label,
									description: 'Label',
								});
							}
						}
					} else {
						returnData.push({
							name: 'No labels found',
							value: 'notfound',
							description: 'No labels were found for this user',
						});
					}
				} catch (error) {
					returnData.push({
						name: `Error: ${error.message}`,
						value: 'error',
						description: 'Failed to load labels',
					});
				}

				return returnData;
			},
		},
		resourceMapping: {
			getTemplateVariables,
		},
	};
	// --- Refactored execute method ---
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const operation = this.getNodeParameter('operation', i) as string;
				let response;

				if (operation === 'sendMessage') {
					// Send text message (POST /api/send)
					const phone = this.getNodeParameter('recipient', i) as string;
					const message = this.getNodeParameter('message', i) as string;
					const header = this.getNodeParameter('header', i, '') as string;
					const footer = this.getNodeParameter('footer', i, '') as string;
					const buttons = this.getNodeParameter('buttons', i, []) as Array<{ id: string; title: string }>;

					const payload: Record<string, any> = {
						phone,
						message,
					};
					if (header) payload.header = header;
					if (footer) payload.footer = footer;
					if (buttons && buttons.length > 0) payload.buttons = buttons;

					const options: IHttpRequestOptions = {
						method: 'POST',
						baseURL: BASE_URLS.DEFAULT,
						url: '/send',
						headers: {
							'Content-Type': 'application/json',
							'Accept': 'application/json',
						},
						body: payload,
					};

					response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						'bizwachatApi',
						options,
					);
				} else if (operation === 'sendMedia') {
					// Send media message (POST /api/send/media)
					const phone = this.getNodeParameter('mediaPhone', i) as string;
					const mediaType = this.getNodeParameter('mediaType', i) as string;
					const mediaUrl = this.getNodeParameter('mediaUrl', i) as string;
					const caption = this.getNodeParameter('mediaCaption', i, '') as string;
					const fileName = this.getNodeParameter('mediaFileName', i, '') as string;

					const payload: Record<string, any> = {
						phone,
						media_type: mediaType,
						media_url: mediaUrl,
					};
					if (caption) payload.caption = caption;
					if (fileName) payload.file_name = fileName;

					const options: IHttpRequestOptions = {
						method: 'POST',
						baseURL: BASE_URLS.DEFAULT,
						url: '/send/media',
						headers: {
							'Content-Type': 'application/json',
							'Accept': 'application/json',
						},
						body: payload,
					};

					response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						'bizwachatApi',
						options,
					);
				} else if (operation === 'sendNotifyerTemplate') {
					// Send template message (POST /api/send/template)
					const phone = this.getNodeParameter('notifyerRecipient', i) as string;
					const templateRaw = this.getNodeParameter('notifyerTemplate', i) as string;
					const variablesObj = this.getNodeParameter('notifyerVariables', i) as { value: Record<string, string> };

					const templateData = JSON.parse(templateRaw);
					const templateName = templateData.template_id || templateData.name;
					const languageCode = templateData.language || 'en_US';
					const templateComponents = templateData.components.components || templateData.components;

					// Build components array for payload
					const components: any[] = [];
					for (const component of templateComponents) {
						const comp: any = { type: component.type.toLowerCase() };
						if (component.type.toLowerCase() === 'body') {
							const bodyParams: any[] = [];
							const variableMatches = component.text ? component.text.match(/\{\{\d+\}\}/g) : [];
							if (variableMatches) {
								for (let idx = 1; idx <= variableMatches.length; idx++) {
									const key = `body${idx}`;
									if (variablesObj.value && variablesObj.value[key] !== undefined) {
										bodyParams.push({ type: 'text', text: variablesObj.value[key] });
									}
								}
							}
							if (bodyParams.length > 0) comp.parameters = bodyParams;
						}
						// Add other component types as needed
						components.push(comp);
					}

					const templatePayload = {
						phone,
						template: {
							name: templateName,
							language: { code: languageCode },
							components,
						},
					};

					const options: IHttpRequestOptions = {
						method: 'POST',
						baseURL: BASE_URLS.DEFAULT,
						url: '/send/template',
						headers: {
							'Content-Type': 'application/json',
							'Accept': 'application/json',
						},
						body: templatePayload,
					};

					response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						'bizwachatApi',
						options,
					);
				} else {
					throw new NodeOperationError(this.getNode(), `Operation ${operation} is not supported`);
				}

				returnData.push({
					json: response || { success: false, message: 'Operation not implemented' },
					pairedItem: { item: i },
				});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: error.message },
						pairedItem: { item: i },
					});
					continue;
				}
				throw new NodeOperationError(this.getNode(), error, { itemIndex: i });
			}
		}

		return [returnData];
	}
}

export async function getTemplateVariables(this: ILoadOptionsFunctions): Promise<ResourceMapperFields> {
	const returnData: ResourceMapperFields = {
		fields: [],
	};

	try {
		// Get the selected template value
		const templateValue = this.getNodeParameter('notifyerTemplate') as string;
		if (!templateValue || templateValue === 'notfound' || templateValue === 'error') {
			return returnData;
		}

		// Parse the template value to get variable_counts
		const templateData = JSON.parse(templateValue);

		// Find the BODY component and count only its variables
		const bodyComponent = templateData.components.components.find((c: any) => c.type === 'BODY');
		let bodyVariableCount = 0;
		
		if (bodyComponent && bodyComponent.text) {
			// Count variables in body text ({{1}}, {{2}}, etc.)
			const variableMatches = bodyComponent.text.match(/\{\{\d+\}\}/g) || [];
			bodyVariableCount = variableMatches.length;
		}
		
		// Create body fields ONLY for body text variables
		for (let i = 1; i <= bodyVariableCount; i++) {
			let exampleText = `Variable ${i}`;
			
			// Try to get example from body component
			if (bodyComponent && bodyComponent.example && bodyComponent.example.body_text && bodyComponent.example.body_text[0] && bodyComponent.example.body_text[0][i - 1]) {
				exampleText = bodyComponent.example.body_text[0][i - 1];
			}
			
			returnData.fields.push({
				id: `body${i}`,
				displayName: `Body ${i}. Example: ${exampleText}`,
				defaultMatch: true,
				canBeUsedToMatch: true,
				required: true,
				display: true,
				type: 'string'
			});
		}
		
		// Handle URL buttons separately 
		templateData.components.components.forEach((component: any) => {
			if (component.type === 'BUTTONS') {
				const urlButton = component.buttons && component.buttons.find((button: any) => button.type === 'URL');
				
				if (urlButton && urlButton.url && urlButton.url.includes('{{')) {
					// Only add visit_website if URL has variables (dynamic URL)
					let exampleUrl = urlButton.url.replace(/\{\{\d+\}\}/g, 'your-value');
					
					returnData.fields.push({
						id: "visit_website",
						displayName: `Visit Website URL. Example: ${exampleUrl}`,
						defaultMatch: true,
						canBeUsedToMatch: true,
						required: true,
						display: true,
						type: 'string'
					});
				}
			}
		});
		
		// Handle media headers separately
		templateData.components.components.forEach((component: any) => {
			if (component.type === 'HEADER' && component.format !== 'TEXT') {
				returnData.fields.push({
					id: "media",
					displayName: `Media (${component.format}). Example: Enter media URL`,
					defaultMatch: true,
					canBeUsedToMatch: true,
					required: true,
					display: true,
					type: 'string'
				});
			}
		});

	} catch (error) {
		// If parsing fails, return empty fields
		return returnData;
	}

	return returnData;
}