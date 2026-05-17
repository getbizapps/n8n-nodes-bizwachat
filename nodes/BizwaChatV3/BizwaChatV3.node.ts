import type {
	IBinaryData,
	IDataObject,
	IExecuteFunctions,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodeProperties,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
	ResourceMapperFields,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import {
	bizwaChatApiRequest,
	buildTemplateMapperFields,
	buildTemplateOptions,
	cleanObject,
	coerceResourceMapperValue,
	extractEntity,
	extractList,
	flattenForMultipart,
	getTemplateById,
	listNodeOptions,
	type BizwaChatTemplateRecord,
} from '../../shared/BizwaChatApi.helpers';

const messageContactCollection: INodeProperties = {
	displayName: 'Contact',
	name: 'contact',
	type: 'collection',
	default: {},
	placeholder: 'Add Contact Data',
	description: 'Optional contact data used when BizwaChat has to create the contact before sending.',
	displayOptions: { show: { resource: ['message'], operation: ['sendTemplate', 'sendText', 'sendInteractive', 'sendMedia'] } },
	options: [
		{ displayName: 'First Name', name: 'firstname', type: 'string', default: '' },
		{ displayName: 'Last Name', name: 'lastname', type: 'string', default: '' },
		{ displayName: 'Email', name: 'email', type: 'string', default: '' },
		{ displayName: 'Country', name: 'country', type: 'string', default: '' },
		{
			displayName: 'Status',
			name: 'status_id',
			type: 'options',
			default: '',
			typeOptions: { loadOptionsMethod: 'getStatuses' },
		},
		{
			displayName: 'Source',
			name: 'source_id',
			type: 'options',
			default: '',
			typeOptions: { loadOptionsMethod: 'getSources' },
		},
		{ displayName: 'Assigned User ID', name: 'assigned_id', type: 'string', default: '' },
		{
			displayName: 'Group Names',
			name: 'groups',
			type: 'multiOptions',
			default: [],
			typeOptions: { loadOptionsMethod: 'getGroups' },
			description: 'Optional group names to assign when BizwaChat creates the contact.',
		},
	],
};

const contactFieldsCollection: INodeProperties = {
	displayName: 'Contact Fields',
	name: 'contactFields',
	type: 'collection',
	default: {},
	placeholder: 'Add Contact Fields',
	displayOptions: { show: { resource: ['contact'], operation: ['create', 'update'] } },
	options: [
		{ displayName: 'First Name', name: 'firstname', type: 'string', default: '' },
		{ displayName: 'Last Name', name: 'lastname', type: 'string', default: '' },
		{ displayName: 'Company', name: 'company', type: 'string', default: '' },
		{
			displayName: 'Type',
			name: 'type',
			type: 'options',
			default: 'lead',
			options: [
				{ name: 'Lead', value: 'lead' },
				{ name: 'Customer', value: 'customer' },
			],
		},
		{ displayName: 'Email', name: 'email', type: 'string', default: '' },
		{ displayName: 'Phone', name: 'phone', type: 'string', default: '' },
		{
			displayName: 'Source',
			name: 'source_id',
			type: 'options',
			default: '',
			typeOptions: { loadOptionsMethod: 'getSources' },
		},
		{
			displayName: 'Status',
			name: 'status_id',
			type: 'options',
			default: '',
			typeOptions: { loadOptionsMethod: 'getStatuses' },
		},
		{ displayName: 'Description', name: 'description', type: 'string', default: '', typeOptions: { rows: 3 } },
		{ displayName: 'Country ID', name: 'country_id', type: 'string', default: '' },
		{ displayName: 'Assigned User ID', name: 'assigned_id', type: 'string', default: '' },
		{
			displayName: 'Group Names',
			name: 'groups',
			type: 'multiOptions',
			default: [],
			typeOptions: { loadOptionsMethod: 'getGroups' },
		},
	],
};

const descriptionProperties: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		default: 'message',
		options: [
			{ name: 'Message', value: 'message' },
			{ name: 'Contact', value: 'contact' },
			{ name: 'Group', value: 'group' },
			{ name: 'Source', value: 'source' },
			{ name: 'Status', value: 'status' },
			{ name: 'Template', value: 'template' },
			{ name: 'Template Bot', value: 'templateBot' },
			{ name: 'Message Bot', value: 'messageBot' },
		],
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		default: 'sendTemplate',
		options: [
			{ name: 'Send Template', value: 'sendTemplate', action: 'Send a template message' },
			{ name: 'Send Text', value: 'sendText', action: 'Send a text message' },
			{ name: 'Send Interactive', value: 'sendInteractive', action: 'Send an interactive message' },
			{ name: 'Send Media', value: 'sendMedia', action: 'Send a media message' },
			{ name: 'Send Typing Indicator', value: 'sendTypingIndicator', action: 'Send a typing indicator' },
		],
		displayOptions: { show: { resource: ['message'] } },
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		default: 'getAll',
		options: [
			{ name: 'Get', value: 'get', action: 'Get a contact' },
			{ name: 'Get All', value: 'getAll', action: 'Get contacts' },
			{ name: 'Create', value: 'create', action: 'Create a contact' },
			{ name: 'Update', value: 'update', action: 'Update a contact' },
			{ name: 'Delete', value: 'delete', action: 'Delete a contact' },
		],
		displayOptions: { show: { resource: ['contact'] } },
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		default: 'getAll',
		options: [
			{ name: 'Get', value: 'get', action: 'Get a group' },
			{ name: 'Get All', value: 'getAll', action: 'Get groups' },
			{ name: 'Create', value: 'create', action: 'Create a group' },
			{ name: 'Update', value: 'update', action: 'Update a group' },
			{ name: 'Delete', value: 'delete', action: 'Delete a group' },
		],
		displayOptions: { show: { resource: ['group'] } },
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		default: 'getAll',
		options: [
			{ name: 'Get', value: 'get', action: 'Get a source' },
			{ name: 'Get All', value: 'getAll', action: 'Get sources' },
			{ name: 'Create', value: 'create', action: 'Create a source' },
			{ name: 'Update', value: 'update', action: 'Update a source' },
			{ name: 'Delete', value: 'delete', action: 'Delete a source' },
		],
		displayOptions: { show: { resource: ['source'] } },
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		default: 'getAll',
		options: [
			{ name: 'Get', value: 'get', action: 'Get a status' },
			{ name: 'Get All', value: 'getAll', action: 'Get statuses' },
			{ name: 'Create', value: 'create', action: 'Create a status' },
			{ name: 'Update', value: 'update', action: 'Update a status' },
			{ name: 'Delete', value: 'delete', action: 'Delete a status' },
		],
		displayOptions: { show: { resource: ['status'] } },
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		default: 'getAll',
		options: [
			{ name: 'Get', value: 'get', action: 'Get a template' },
			{ name: 'Get All', value: 'getAll', action: 'Get templates' },
		],
		displayOptions: { show: { resource: ['template'] } },
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		default: 'getAll',
		options: [
			{ name: 'Get', value: 'get', action: 'Get a template bot' },
			{ name: 'Get All', value: 'getAll', action: 'Get template bots' },
		],
		displayOptions: { show: { resource: ['templateBot'] } },
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		default: 'getAll',
		options: [
			{ name: 'Get', value: 'get', action: 'Get a message bot' },
			{ name: 'Get All', value: 'getAll', action: 'Get message bots' },
		],
		displayOptions: { show: { resource: ['messageBot'] } },
	},
	{
		displayName: 'Template',
		name: 'templateId',
		type: 'options',
		default: '',
		required: true,
		typeOptions: { loadOptionsMethod: 'getTemplates' },
		displayOptions: { show: { resource: ['message', 'template'], operation: ['sendTemplate', 'get'] } },
	},
	{
		displayName: 'Template Parameters',
		name: 'templateFields',
		type: 'resourceMapper',
		default: { mappingMode: 'defineBelow', matchingColumns: [], schema: [], value: null },
		noDataExpression: true,
		typeOptions: {
			loadOptionsDependsOn: ['templateId'],
			resourceMapper: {
				addAllFields: false,
				fieldWords: { plural: 'parameters', singular: 'parameter' },
				mode: 'add',
				noFieldsError: 'Select a template first to load its required parameters.',
				resourceMapperMethod: 'getTemplateParameterSchema',
			},
		},
		displayOptions: { show: { resource: ['message'], operation: ['sendTemplate'] } },
	},
	{
		displayName: 'Phone Number',
		name: 'phoneNumber',
		type: 'string',
		default: '',
		required: true,
		description: 'The destination phone number with or without the + prefix.',
		displayOptions: { show: { resource: ['message'], operation: ['sendTemplate', 'sendText', 'sendInteractive', 'sendMedia'] } },
	},
	{
		displayName: 'From Phone Number ID',
		name: 'fromPhoneNumberId',
		type: 'string',
		default: '',
		description: 'Optional sender phone number ID. Leave blank to use the tenant default.',
		displayOptions: { show: { resource: ['message'], operation: ['sendTemplate', 'sendInteractive', 'sendTypingIndicator'] } },
	},
	{
		displayName: 'Auto Generate OTP',
		name: 'autoGenerateOtp',
		type: 'boolean',
		default: false,
		displayOptions: { show: { resource: ['message'], operation: ['sendTemplate'] } },
	},
	{
		displayName: 'OTP Length',
		name: 'otpLength',
		type: 'number',
		default: 6,
		typeOptions: { minValue: 4, maxValue: 10 },
		displayOptions: { show: { resource: ['message'], operation: ['sendTemplate'], autoGenerateOtp: [true] } },
	},
	{
		displayName: 'OTP Field Number',
		name: 'otpFieldNumber',
		type: 'number',
		default: 1,
		typeOptions: { minValue: 1, maxValue: 10 },
		displayOptions: { show: { resource: ['message'], operation: ['sendTemplate'], autoGenerateOtp: [true] } },
	},
	{
		displayName: 'Message Body',
		name: 'messageBody',
		type: 'string',
		default: '',
		required: true,
		typeOptions: { rows: 4 },
		displayOptions: { show: { resource: ['message'], operation: ['sendText'] } },
	},
	{
		displayName: 'Interactive Type',
		name: 'interactiveType',
		type: 'options',
		default: 'button',
		options: [
			{ name: 'Reply Buttons', value: 'button' },
			{ name: 'Call to Action URL', value: 'cta_url' },
		],
		displayOptions: { show: { resource: ['message'], operation: ['sendInteractive'] } },
	},
	{
		displayName: 'Header Text',
		name: 'interactiveHeaderText',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: ['message'], operation: ['sendInteractive'] } },
	},
	{
		displayName: 'Body Text',
		name: 'interactiveBodyText',
		type: 'string',
		default: '',
		required: true,
		typeOptions: { rows: 4 },
		displayOptions: { show: { resource: ['message'], operation: ['sendInteractive'] } },
	},
	{
		displayName: 'Footer Text',
		name: 'interactiveFooterText',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: ['message'], operation: ['sendInteractive'] } },
	},
	{
		displayName: 'Reply Buttons',
		name: 'interactiveButtons',
		type: 'fixedCollection',
		default: { button: [] },
		typeOptions: { multipleValues: true },
		options: [
			{
				displayName: 'Button',
				name: 'button',
				values: [
					{ displayName: 'Title', name: 'title', type: 'string', default: '', required: true },
					{ displayName: 'ID', name: 'id', type: 'string', default: '' },
				],
			},
		],
		description: 'Add 1 to 3 reply buttons.',
		displayOptions: { show: { resource: ['message'], operation: ['sendInteractive'], interactiveType: ['button'] } },
	},
	{
		displayName: 'CTA Button Text',
		name: 'interactiveCtaDisplayText',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['message'], operation: ['sendInteractive'], interactiveType: ['cta_url'] } },
	},
	{
		displayName: 'CTA Button URL',
		name: 'interactiveCtaUrl',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['message'], operation: ['sendInteractive'], interactiveType: ['cta_url'] } },
	},
	{
		displayName: 'Media Type',
		name: 'mediaType',
		type: 'options',
		default: 'image',
		options: [
			{ name: 'Image', value: 'image' },
			{ name: 'Document', value: 'document' },
			{ name: 'Video', value: 'video' },
			{ name: 'Audio', value: 'audio' },
		],
		displayOptions: { show: { resource: ['message'], operation: ['sendMedia'] } },
	},
	{
		displayName: 'Media Input',
		name: 'mediaInputType',
		type: 'options',
		default: 'url',
		options: [
			{ name: 'URL', value: 'url' },
			{ name: 'Binary File', value: 'binary' },
		],
		displayOptions: { show: { resource: ['message'], operation: ['sendMedia'] } },
	},
	{
		displayName: 'Media URL',
		name: 'mediaUrl',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['message'], operation: ['sendMedia'], mediaInputType: ['url'] } },
	},
	{
		displayName: 'Binary Property',
		name: 'binaryPropertyName',
		type: 'string',
		default: 'data',
		required: true,
		displayOptions: { show: { resource: ['message'], operation: ['sendMedia'], mediaInputType: ['binary'] } },
	},
	{
		displayName: 'Caption',
		name: 'caption',
		type: 'string',
		default: '',
		typeOptions: { rows: 3 },
		displayOptions: { show: { resource: ['message'], operation: ['sendMedia'] } },
	},
	{
		displayName: 'Filename',
		name: 'filename',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: ['message'], operation: ['sendMedia'] } },
	},
	messageContactCollection,
	{
		displayName: 'Message ID',
		name: 'messageId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['message'], operation: ['sendTypingIndicator'] } },
	},
	{
		displayName: 'Contact',
		name: 'contactId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['contact'], operation: ['get', 'update', 'delete'] } },
	},
	{
		displayName: 'Filters',
		name: 'contactFilters',
		type: 'collection',
		default: {},
		placeholder: 'Add Filter',
		displayOptions: { show: { resource: ['contact'], operation: ['getAll'] } },
		options: [
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				default: '',
				options: [
					{ name: 'Lead', value: 'lead' },
					{ name: 'Customer', value: 'customer' },
				],
			},
			{ displayName: 'Source ID', name: 'source_id', type: 'options', default: '', typeOptions: { loadOptionsMethod: 'getSources' } },
			{ displayName: 'Status ID', name: 'status_id', type: 'options', default: '', typeOptions: { loadOptionsMethod: 'getStatuses' } },
		],
	},
	contactFieldsCollection,
	{
		displayName: 'Group',
		name: 'groupId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['group'], operation: ['get', 'update', 'delete'] } },
	},
	{
		displayName: 'Group Name',
		name: 'groupName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['group'], operation: ['create', 'update'] } },
	},
	{
		displayName: 'Source',
		name: 'sourceId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['source'], operation: ['get', 'update', 'delete'] } },
	},
	{
		displayName: 'Source Name',
		name: 'sourceName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['source'], operation: ['create', 'update'] } },
	},
	{
		displayName: 'Status',
		name: 'statusId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['status'], operation: ['get', 'update', 'delete'] } },
	},
	{
		displayName: 'Status Name',
		name: 'statusName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: { resource: ['status'], operation: ['create', 'update'] } },
	},
	{
		displayName: 'Color',
		name: 'statusColor',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: ['status'], operation: ['create', 'update'] } },
	},
	{
		displayName: 'Set as Default',
		name: 'statusIsDefault',
		type: 'boolean',
		default: false,
		displayOptions: { show: { resource: ['status'], operation: ['create', 'update'] } },
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: true,
		displayOptions: { show: { resource: ['template', 'templateBot', 'messageBot', 'contact', 'group', 'source', 'status'], operation: ['getAll'] } },
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		typeOptions: { minValue: 1, maxValue: 100 },
		displayOptions: { show: { resource: ['template', 'templateBot', 'messageBot', 'contact', 'group', 'source', 'status'], operation: ['getAll'], returnAll: [false] } },
	},
	{
		displayName: 'Template Bot',
		name: 'templateBotId',
		type: 'options',
		default: '',
		required: true,
		typeOptions: { loadOptionsMethod: 'getTemplateBots' },
		displayOptions: { show: { resource: ['templateBot'], operation: ['get'] } },
	},
	{
		displayName: 'Message Bot',
		name: 'messageBotId',
		type: 'options',
		default: '',
		required: true,
		typeOptions: { loadOptionsMethod: 'getMessageBots' },
		displayOptions: { show: { resource: ['messageBot'], operation: ['get'] } },
	},
];

export class BizwaChatV3 implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'BizwaChat v3',
		name: 'bizwaChatV3',
		icon: 'file:bizwachat.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Send BizwaChat messages and manage tenant resources on the v3 API surface.',
		defaults: { name: 'BizwaChat v3' },
		inputs: ['main'],
		outputs: ['main'],
		credentials: [{ name: 'bizwaChatTenantApi', required: true }],
		properties: descriptionProperties,
	};

	methods = {
		loadOptions: {
			async getTemplates(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await bizwaChatApiRequest.call(this, 'GET', '/templates', { qs: { per_page: 100 } });
				return buildTemplateOptions(extractList(response) as BizwaChatTemplateRecord[]);
			},
			async getTemplateBots(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				return listNodeOptions.call(this, '/templatebots', (record) => toSimpleOption(record, 'template_name'));
			},
			async getMessageBots(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				return listNodeOptions.call(this, '/messagebots', (record) => toSimpleOption(record, 'title'));
			},
			async getStatuses(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				return listNodeOptions.call(this, '/statuses', (record) => toSimpleOption(record, 'name'));
			},
			async getSources(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				return listNodeOptions.call(this, '/sources', (record) => toSimpleOption(record, 'name'));
			},
			async getGroups(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				return listNodeOptions.call(this, '/groups', (record) => toSimpleOption(record, 'name', 'name'));
			},
		},
		resourceMapping: {
			async getTemplateParameterSchema(this: ILoadOptionsFunctions): Promise<ResourceMapperFields> {
				const templateId = this.getCurrentNodeParameter('templateId');
				if (!templateId) {
					return { fields: [] };
				}
				const template = await getTemplateById.call(this, String(templateId));
				return buildTemplateMapperFields(template);
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
			try {
				const resource = this.getNodeParameter('resource', itemIndex) as string;
				const operation = this.getNodeParameter('operation', itemIndex) as string;
				const result = await executeOperation.call(this, resource, operation, itemIndex);
				if (Array.isArray(result)) {
					returnData.push(...this.helpers.returnJsonArray(result));
				} else {
					returnData.push({ json: result });
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: (error as Error).message }, pairedItem: itemIndex });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}

async function executeOperation(this: IExecuteFunctions, resource: string, operation: string, itemIndex: number): Promise<IDataObject | IDataObject[]> {
	switch (`${resource}:${operation}`) {
		case 'message:sendTemplate':
			return sendTemplate.call(this, itemIndex);
		case 'message:sendText':
			return sendText.call(this, itemIndex);
		case 'message:sendInteractive':
			return sendInteractive.call(this, itemIndex);
		case 'message:sendMedia':
			return sendMedia.call(this, itemIndex);
		case 'message:sendTypingIndicator':
			return sendTypingIndicator.call(this, itemIndex);
		case 'template:getAll':
			return getCollection.call(this, itemIndex, '/templates');
		case 'template:get':
			return getEntityByParameter.call(this, itemIndex, 'templateId', '/templates');
		case 'templateBot:getAll':
			return getCollection.call(this, itemIndex, '/templatebots');
		case 'templateBot:get':
			return getEntityByParameter.call(this, itemIndex, 'templateBotId', '/templatebots');
		case 'messageBot:getAll':
			return getCollection.call(this, itemIndex, '/messagebots');
		case 'messageBot:get':
			return getEntityByParameter.call(this, itemIndex, 'messageBotId', '/messagebots');
		case 'contact:getAll':
			return getCollection.call(this, itemIndex, '/contacts', buildContactFilterQuery.call(this, itemIndex));
		case 'contact:get':
			return getEntityByParameter.call(this, itemIndex, 'contactId', '/contacts');
		case 'contact:create':
			return createEntity.call(this, '/contacts', buildContactMutationPayload.call(this, itemIndex, true));
		case 'contact:update':
			return updateEntity.call(this, itemIndex, 'contactId', '/contacts', buildContactMutationPayload.call(this, itemIndex, false));
		case 'contact:delete':
			return deleteEntity.call(this, itemIndex, 'contactId', '/contacts');
		case 'group:getAll':
			return getCollection.call(this, itemIndex, '/groups');
		case 'group:get':
			return getEntityByParameter.call(this, itemIndex, 'groupId', '/groups');
		case 'group:create':
			return createEntity.call(this, '/groups', buildNamedPayload.call(this, itemIndex, 'groupName', 'Group Name'));
		case 'group:update':
			return updateEntity.call(this, itemIndex, 'groupId', '/groups', buildNamedPayload.call(this, itemIndex, 'groupName', 'Group Name'));
		case 'group:delete':
			return deleteEntity.call(this, itemIndex, 'groupId', '/groups');
		case 'source:getAll':
			return getCollection.call(this, itemIndex, '/sources');
		case 'source:get':
			return getEntityByParameter.call(this, itemIndex, 'sourceId', '/sources');
		case 'source:create':
			return createEntity.call(this, '/sources', buildNamedPayload.call(this, itemIndex, 'sourceName', 'Source Name'));
		case 'source:update':
			return updateEntity.call(this, itemIndex, 'sourceId', '/sources', buildNamedPayload.call(this, itemIndex, 'sourceName', 'Source Name'));
		case 'source:delete':
			return deleteEntity.call(this, itemIndex, 'sourceId', '/sources');
		case 'status:getAll':
			return getCollection.call(this, itemIndex, '/statuses');
		case 'status:get':
			return getEntityByParameter.call(this, itemIndex, 'statusId', '/statuses');
		case 'status:create':
			return createEntity.call(this, '/statuses', buildStatusPayload.call(this, itemIndex));
		case 'status:update':
			return updateEntity.call(this, itemIndex, 'statusId', '/statuses', buildStatusPayload.call(this, itemIndex));
		case 'status:delete':
			return deleteEntity.call(this, itemIndex, 'statusId', '/statuses');
		default:
			throw new NodeOperationError(this.getNode(), `Unsupported BizwaChat operation: ${resource}:${operation}`);
	}
}

async function getCollection(this: IExecuteFunctions, itemIndex: number, path: string, extraQs: IDataObject = {}): Promise<IDataObject[]> {
	const returnAll = this.getNodeParameter('returnAll', itemIndex, true) as boolean;
	const limit = this.getNodeParameter('limit', itemIndex, 50) as number;
	const response = await bizwaChatApiRequest.call(this, 'GET', path, {
		qs: cleanObject({ ...extraQs, per_page: returnAll ? 100 : Math.max(1, Math.min(limit, 100)) }),
	});
	const items = extractList(response);
	return returnAll ? items : items.slice(0, limit);
}

async function getEntityByParameter(this: IExecuteFunctions, itemIndex: number, parameterName: string, path: string): Promise<IDataObject> {
	const id = this.getNodeParameter(parameterName, itemIndex) as string;
	const response = await bizwaChatApiRequest.call(this, 'GET', `${path}/${id}`);
	return extractEntity(response);
}

async function createEntity(this: IExecuteFunctions, path: string, payload: IDataObject): Promise<IDataObject> {
	const response = await bizwaChatApiRequest.call(this, 'POST', path, { body: payload });
	return extractEntity(response);
}

async function updateEntity(this: IExecuteFunctions, itemIndex: number, parameterName: string, path: string, payload: IDataObject): Promise<IDataObject> {
	const id = this.getNodeParameter(parameterName, itemIndex) as string;
	const response = await bizwaChatApiRequest.call(this, 'PUT', `${path}/${id}`, { body: payload });
	return extractEntity(response);
}

async function deleteEntity(this: IExecuteFunctions, itemIndex: number, parameterName: string, path: string): Promise<IDataObject> {
	const id = this.getNodeParameter(parameterName, itemIndex) as string;
	return bizwaChatApiRequest.call(this, 'DELETE', `${path}/${id}`);
}

async function sendTemplate(this: IExecuteFunctions, itemIndex: number): Promise<IDataObject> {
	const templateId = this.getNodeParameter('templateId', itemIndex) as string;
	const template = await getTemplateById.call(this, templateId);
	const dynamicFields = coerceResourceMapperValue(this.getNodeParameter('templateFields', itemIndex));
	const payload = cleanObject({
		auto_generate_otp: this.getNodeParameter('autoGenerateOtp', itemIndex, false) as boolean,
		contact: getMessageContactPayload(this, itemIndex),
		from_phone_number_id: this.getNodeParameter('fromPhoneNumberId', itemIndex, '') as string,
		otp_field_number: this.getNodeParameter('otpFieldNumber', itemIndex, 1) as number,
		otp_length: this.getNodeParameter('otpLength', itemIndex, 6) as number,
		phone_number: this.getNodeParameter('phoneNumber', itemIndex) as string,
		template_language: String(template.language ?? ''),
		template_name: String(template.template_name ?? ''),
		...dynamicFields,
	});
	const response = await bizwaChatApiRequest.call(this, 'POST', '/messages/template', { body: payload });
	return extractEntity(response);
}

async function sendText(this: IExecuteFunctions, itemIndex: number): Promise<IDataObject> {
	const payload = cleanObject({
		contact: getMessageContactPayload(this, itemIndex),
		message_body: this.getNodeParameter('messageBody', itemIndex) as string,
		phone_number: this.getNodeParameter('phoneNumber', itemIndex) as string,
	});
	const response = await bizwaChatApiRequest.call(this, 'POST', '/messages/send', { body: payload });
	return extractEntity(response);
}

async function sendInteractive(this: IExecuteFunctions, itemIndex: number): Promise<IDataObject> {
	const interactiveType = this.getNodeParameter('interactiveType', itemIndex) as string;
	const payload: IDataObject = cleanObject({
		body_text: this.getNodeParameter('interactiveBodyText', itemIndex) as string,
		contact: getMessageContactPayload(this, itemIndex),
		footer_text: this.getNodeParameter('interactiveFooterText', itemIndex, '') as string,
		from_phone_number_id: this.getNodeParameter('fromPhoneNumberId', itemIndex, '') as string,
		header_text: this.getNodeParameter('interactiveHeaderText', itemIndex, '') as string,
		interactive_type: interactiveType,
		phone_number: this.getNodeParameter('phoneNumber', itemIndex) as string,
	});

	if (interactiveType === 'button') {
		const buttonsCollection = this.getNodeParameter('interactiveButtons', itemIndex, { button: [] }) as IDataObject;
		const buttons = ((buttonsCollection.button ?? []) as IDataObject[])
			.map((button) => cleanObject({ id: button.id, title: button.title }))
			.filter((button) => String(button.title ?? '').trim() !== '');

		if (buttons.length === 0) {
			throw new NodeOperationError(this.getNode(), 'Add at least one reply button for interactive sends.');
		}

		payload.buttons = buttons;
	} else {
		payload.cta_button = cleanObject({
			display_text: this.getNodeParameter('interactiveCtaDisplayText', itemIndex) as string,
			url: this.getNodeParameter('interactiveCtaUrl', itemIndex) as string,
		});
	}

	const response = await bizwaChatApiRequest.call(this, 'POST', '/messages/send-interactive', { body: payload });
	return extractEntity(response);
}

async function sendMedia(this: IExecuteFunctions, itemIndex: number): Promise<IDataObject> {
	const mediaInputType = this.getNodeParameter('mediaInputType', itemIndex, 'url') as string;
	const basePayload = cleanObject({
		caption: this.getNodeParameter('caption', itemIndex, '') as string,
		contact: getMessageContactPayload(this, itemIndex),
		filename: this.getNodeParameter('filename', itemIndex, '') as string,
		media_type: this.getNodeParameter('mediaType', itemIndex) as string,
		phone_number: this.getNodeParameter('phoneNumber', itemIndex) as string,
	});

	if (mediaInputType === 'url') {
		const payload = cleanObject({ ...basePayload, media_url: this.getNodeParameter('mediaUrl', itemIndex) as string });
		const response = await bizwaChatApiRequest.call(this, 'POST', '/messages/media', { body: payload });
		return extractEntity(response);
	}

	const binaryPropertyName = this.getNodeParameter('binaryPropertyName', itemIndex) as string;
	const binaryData = this.helpers.assertBinaryData(itemIndex, binaryPropertyName) as IBinaryData;
	const binaryBuffer = await this.helpers.getBinaryDataBuffer(itemIndex, binaryPropertyName);
	const multipartPayload = flattenForMultipart(basePayload);
	multipartPayload.media_file = {
		options: {
			contentType: binaryData.mimeType ?? 'application/octet-stream',
			filename: binaryData.fileName ?? 'bizwachat-upload',
		},
		value: binaryBuffer,
	} as unknown as IDataObject;

	const response = await bizwaChatApiRequest.call(this, 'POST', '/messages/media', { formData: multipartPayload, json: false });
	return extractEntity(response as IDataObject);
}

async function sendTypingIndicator(this: IExecuteFunctions, itemIndex: number): Promise<IDataObject> {
	const payload = cleanObject({
		from_phone_number_id: this.getNodeParameter('fromPhoneNumberId', itemIndex, '') as string,
		message_id: this.getNodeParameter('messageId', itemIndex) as string,
	});
	const response = await bizwaChatApiRequest.call(this, 'POST', '/messages/typing-indicator', { body: payload });
	return extractEntity(response);
}

function getMessageContactPayload(context: IExecuteFunctions, itemIndex: number): IDataObject | undefined {
	const value = context.getNodeParameter('contact', itemIndex, {}) as IDataObject;
	const payload = cleanObject({ ...value, groups: normalizeCommaList(value.groups) });
	return Object.keys(payload).length > 0 ? payload : undefined;
}

function buildContactFilterQuery(this: IExecuteFunctions, itemIndex: number): IDataObject {
	const filters = this.getNodeParameter('contactFilters', itemIndex, {}) as IDataObject;
	return cleanObject(filters);
}

function buildContactMutationPayload(this: IExecuteFunctions, itemIndex: number, isCreate: boolean): IDataObject {
	const value = this.getNodeParameter('contactFields', itemIndex, {}) as IDataObject;
	const payload = cleanObject({
		firstname: value.firstname,
		lastname: value.lastname,
		company: value.company,
		type: value.type,
		email: value.email,
		phone: value.phone,
		source_id: value.source_id,
		status_id: value.status_id,
		description: value.description,
		country_id: value.country_id,
		assigned_id: value.assigned_id,
		groups: normalizeCommaList(value.groups),
	});

	if (isCreate) {
		for (const field of ['firstname', 'phone', 'type'] as const) {
			if (String(payload[field] ?? '').trim() === '') {
				throw new NodeOperationError(this.getNode(), `Contact ${field} is required when creating a contact.`);
			}
		}
	}

	return payload;
}

function buildNamedPayload(this: IExecuteFunctions, itemIndex: number, parameterName: string, label: string): IDataObject {
	const name = String(this.getNodeParameter(parameterName, itemIndex)).trim();
	if (name === '') {
		throw new NodeOperationError(this.getNode(), `${label} cannot be empty.`);
	}
	return { name };
}

function buildStatusPayload(this: IExecuteFunctions, itemIndex: number): IDataObject {
	const name = String(this.getNodeParameter('statusName', itemIndex)).trim();
	if (name === '') {
		throw new NodeOperationError(this.getNode(), 'Status Name cannot be empty.');
	}
	return cleanObject({
		name,
		color: this.getNodeParameter('statusColor', itemIndex, '') as string,
		isdefault: this.getNodeParameter('statusIsDefault', itemIndex, false) as boolean,
	});
}

function normalizeCommaList(value: unknown): string | undefined {
	if (Array.isArray(value)) {
		const items = value.map((entry) => String(entry).trim()).filter((entry) => entry !== '');
		return items.length > 0 ? items.join(',') : undefined;
	}
	const stringValue = String(value ?? '').trim();
	return stringValue === '' ? undefined : stringValue;
}

function toSimpleOption(record: IDataObject, preferredNameKey: string, preferredValueKey = 'id'): INodePropertyOptions | null {
	const id = record[preferredValueKey] ?? record.id;
	if (id === undefined || id === null) {
		return null;
	}
	const explicit = record[preferredNameKey];
	const fallbackName = record.name ?? record.template_name ?? record.title ?? record.trigger_message;
	return { name: String(explicit ?? fallbackName ?? `ID ${id}`), value: String(id) };
}