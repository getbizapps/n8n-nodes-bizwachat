import type {
	IDataObject,
	IExecuteFunctions,
	ILoadOptionsFunctions,
	INodePropertyOptions,
	IRequestOptions,
	ResourceMapperField,
	ResourceMapperFields,
	ResourceMapperValue,
} from 'n8n-workflow';

const CREDENTIAL_NAME = 'bizwaChatTenantApi';

type BizwaChatRequestContext = IExecuteFunctions | ILoadOptionsFunctions;
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface BizwaChatRequestOptions {
	body?: IDataObject;
	formData?: IDataObject;
	json?: boolean;
	qs?: IDataObject;
}

interface BizwaChatCredentialsShape extends IDataObject {
	apiPathPrefix?: string;
	baseUrl?: string;
	tenantSubdomain?: string;
}

export interface BizwaChatTemplateRecord extends IDataObject {
	body_data?: string;
	body_params_count?: number;
	buttons_data?: string;
	category?: string;
	header_data_format?: string;
	header_params_count?: number;
	id?: number | string;
	language?: string;
	status?: string;
	template_name?: string;
	updated_at?: string;
}

export const bizwaChatWebhookEventOptions: INodePropertyOptions[] = [
	{ name: 'Message Received', value: 'message.received' },
	{ name: 'Message Sent', value: 'message.sent' },
	{ name: 'Message Status Update', value: 'message.status.update' },
	{ name: 'Contact Created', value: 'contact.created' },
	{ name: 'Contact Updated', value: 'contact.updated' },
	{ name: 'Contact Deleted', value: 'contact.deleted' },
	{ name: 'Source Created', value: 'source.created' },
	{ name: 'Source Updated', value: 'source.updated' },
	{ name: 'Source Deleted', value: 'source.deleted' },
	{ name: 'Status Created', value: 'status.created' },
	{ name: 'Status Updated', value: 'status.updated' },
	{ name: 'Status Deleted', value: 'status.deleted' },
	{ name: 'WhatsApp Message Received', value: 'whatsapp.message.received' },
	{ name: 'WhatsApp Message Sent', value: 'whatsapp.message.sent' },
	{ name: 'WhatsApp Message Delivered', value: 'whatsapp.message.delivered' },
	{ name: 'WhatsApp Message Read', value: 'whatsapp.message.read' },
	{ name: 'WhatsApp Message Failed', value: 'whatsapp.message.failed' },
	{ name: 'WhatsApp Status Updated', value: 'whatsapp.status.updated' },
	{ name: 'WhatsApp Account Alert', value: 'whatsapp.account.alert' },
	{ name: 'WhatsApp Account Review Updated', value: 'whatsapp.account.review_updated' },
	{ name: 'WhatsApp Account Updated', value: 'whatsapp.account.updated' },
	{ name: 'WhatsApp Business Capability Updated', value: 'whatsapp.business.capability_updated' },
	{ name: 'WhatsApp Business Status Updated', value: 'whatsapp.business.status_updated' },
	{ name: 'WhatsApp Template Status Updated', value: 'whatsapp.template.status_updated' },
	{ name: 'WhatsApp Template Quality Updated', value: 'whatsapp.template.quality_updated' },
	{ name: 'WhatsApp Phone Quality Updated', value: 'whatsapp.phone.quality_updated' },
	{ name: 'WhatsApp Phone Name Updated', value: 'whatsapp.phone.name_updated' },
	{ name: 'WhatsApp Call Received', value: 'whatsapp.call.received' },
	{ name: 'WhatsApp Flow Event', value: 'whatsapp.flow.event' },
];

export function cleanObject(value: IDataObject): IDataObject {
	const cleaned: IDataObject = {};

	for (const [key, entry] of Object.entries(value)) {
		if (entry === undefined || entry === null || entry === '') {
			continue;
		}

		if (typeof entry === 'object' && !Array.isArray(entry)) {
			const nested = cleanObject(entry as IDataObject);
			if (Object.keys(nested).length > 0) {
				cleaned[key] = nested;
			}
			continue;
		}

		cleaned[key] = entry;
	}

	return cleaned;
}

export function coerceResourceMapperValue(value: unknown): IDataObject {
	const mapperValue = value as ResourceMapperValue | null | undefined;
	if (!mapperValue || typeof mapperValue !== 'object' || !('value' in mapperValue)) {
		return {};
	}

	return cleanObject((mapperValue.value ?? {}) as IDataObject);
}

export function extractEntity(response: IDataObject): IDataObject {
	const data = response.data as IDataObject | IDataObject[] | undefined;

	if (data && !Array.isArray(data)) {
		if (Array.isArray(data.data)) {
			return { items: data.data };
		}

		if (data.data && typeof data.data === 'object' && !Array.isArray(data.data)) {
			return data.data as IDataObject;
		}

		return data;
	}

	return response;
}

export function extractList(response: IDataObject): IDataObject[] {
	const data = response.data as IDataObject | IDataObject[] | undefined;

	if (Array.isArray(data)) {
		return data;
	}

	if (data && Array.isArray(data.data)) {
		return data.data as IDataObject[];
	}

	return [];
}

export function flattenForMultipart(value: IDataObject, parentKey = ''): IDataObject {
	const output: IDataObject = {};

	for (const [key, entry] of Object.entries(value)) {
		if (entry === undefined || entry === null || entry === '') {
			continue;
		}

		const compoundKey = parentKey ? `${parentKey}[${key}]` : key;

		if (typeof entry === 'object' && !Array.isArray(entry)) {
			Object.assign(output, flattenForMultipart(entry as IDataObject, compoundKey));
			continue;
		}

		output[compoundKey] = entry;
	}

	return output;
}

export async function getBizwaChatCredentials(this: BizwaChatRequestContext): Promise<Required<BizwaChatCredentialsShape>> {
	const credentials = (await this.getCredentials(CREDENTIAL_NAME)) as BizwaChatCredentialsShape;
	const baseUrl = String(credentials.baseUrl ?? '').trim().replace(/\/$/, '');
	const apiPathPrefix = normalizePathPrefix(String(credentials.apiPathPrefix ?? '/api/v3'));
	const tenantSubdomain = String(credentials.tenantSubdomain ?? '').trim();

	if (baseUrl === '') {
		throw new Error('BizwaChat base URL is required.');
	}

	if (tenantSubdomain === '') {
		throw new Error('BizwaChat tenant subdomain is required.');
	}

	return {
		apiPathPrefix,
		baseUrl,
		tenantSubdomain,
	};
}

export async function bizwaChatApiRequest(
	this: BizwaChatRequestContext,
	method: HttpMethod,
	path: string,
	options: BizwaChatRequestOptions = {},
): Promise<IDataObject> {
	const credentials = await getBizwaChatCredentials.call(this);
	const requestOptions: IRequestOptions = {
		json: options.json ?? true,
		method,
		url: buildTenantApiUrl(credentials.baseUrl, credentials.apiPathPrefix, credentials.tenantSubdomain, path),
	};

	if (options.qs) {
		requestOptions.qs = options.qs;
	}

	if (options.body) {
		requestOptions.body = options.body;
	}

	if (options.formData) {
		requestOptions.formData = options.formData;
		requestOptions.body = undefined;
	}

	const response = await this.helpers.requestWithAuthentication.call(this, CREDENTIAL_NAME, requestOptions);
	return (response ?? {}) as IDataObject;
}

export function buildTemplateMapperFields(template: BizwaChatTemplateRecord): ResourceMapperFields {
	const fields: ResourceMapperField[] = [];
	const headerFormat = String(template.header_data_format ?? '').toUpperCase();
	const headerParamCount = Number(template.header_params_count ?? 0);
	const bodyParamCount = resolveBodyParamCount(template);
	const category = String(template.category ?? '').toUpperCase();

	if (headerFormat === 'TEXT' && headerParamCount > 0) {
		fields.push(createField('header_field_1', 'Header text parameter', 'string', true));
	}

	if (headerFormat === 'IMAGE') {
		fields.push(createField('header_image_url', 'Header image URL', 'url', true));
	}

	if (headerFormat === 'VIDEO') {
		fields.push(createField('header_video_url', 'Header video URL', 'url', true));
	}

	if (headerFormat === 'DOCUMENT') {
		fields.push(createField('header_document_url', 'Header document URL', 'url', true));
		fields.push(createField('header_document_name', 'Header document name', 'string', false));
	}

	for (let index = 1; index <= bodyParamCount; index += 1) {
		fields.push(createField(`field_${index}`, `Body parameter ${index}`, 'string', true));
	}

	const buttons = parseButtons(template.buttons_data);
	let hasCopyCodeField = false;

	buttons.forEach((button, index) => {
		const type = String(button.type ?? '').toUpperCase();
		const text = String(button.text ?? `Button ${index + 1}`).trim();

		if (type === 'URL' || type === 'PHONE_NUMBER' || type === 'PHONE') {
			fields.push(createField(`button_${index}`, `${text} parameter`, 'string', false));
		}

		if (type === 'COPY_CODE') {
			hasCopyCodeField = true;
		}
	});

	if (category === 'AUTHENTICATION' || hasCopyCodeField) {
		fields.push(createField('copy_code', 'Copy code button value', 'string', false));
	}

	return { fields };
}

export function buildTemplateOptions(templates: BizwaChatTemplateRecord[]): INodePropertyOptions[] {
	const options: INodePropertyOptions[] = [];

	for (const template of templates) {
		const id = template.id;
		if (id === undefined || id === null) {
			continue;
		}

		const name = String(template.template_name ?? `Template ${id}`);
		const language = String(template.language ?? 'unknown');
		const status = String(template.status ?? 'UNKNOWN');

		options.push({
			name: `${name} (${language}) [${status}]`,
			value: String(id),
		});
	}

	return options;
}

export async function getTemplateById(this: BizwaChatRequestContext, templateId: string | number): Promise<BizwaChatTemplateRecord> {
	const response = await bizwaChatApiRequest.call(this, 'GET', `/templates/${templateId}`);
	return extractEntity(response) as BizwaChatTemplateRecord;
}

export async function listNodeOptions(
	this: BizwaChatRequestContext,
	path: string,
	builder: (record: IDataObject) => INodePropertyOptions | null,
): Promise<INodePropertyOptions[]> {
	const response = await bizwaChatApiRequest.call(this, 'GET', path, { qs: { per_page: 100 } });
	return extractList(response)
		.map(builder)
		.filter((option): option is INodePropertyOptions => option !== null);
}

function buildTenantApiUrl(baseUrl: string, apiPathPrefix: string, tenantSubdomain: string, path: string): string {
	const normalizedPath = path.startsWith('/') ? path : `/${path}`;
	return `${baseUrl}${apiPathPrefix}/${encodeURIComponent(tenantSubdomain)}${normalizedPath}`;
}

function createField(
	id: string,
	displayName: string,
	type: ResourceMapperField['type'],
	required: boolean,
): ResourceMapperField {
	return {
		canBeUsedToMatch: false,
		defaultMatch: false,
		display: true,
		displayName,
		id,
		required,
		type,
	};
}

function normalizePathPrefix(value: string): string {
	const trimmed = value.trim();
	if (trimmed === '') {
		return '/api/v3';
	}

	return `/${trimmed.replace(/^\/+|\/+$/g, '')}`;
}

function parseButtons(value: unknown): Array<Record<string, unknown>> {
	if (typeof value !== 'string' || value.trim() === '') {
		return [];
	}

	try {
		const parsed = JSON.parse(value) as unknown;
		return Array.isArray(parsed) ? (parsed as Array<Record<string, unknown>>) : [];
	} catch {
		return [];
	}
}

function resolveBodyParamCount(template: BizwaChatTemplateRecord): number {
	const explicitCount = Number(template.body_params_count ?? 0);
	if (explicitCount > 0) {
		return explicitCount;
	}

	const body = String(template.body_data ?? '');
	const matches = [...body.matchAll(/{{\s*(\d+)\s*}}/g)].map((match) => Number(match[1]));

	return matches.length > 0 ? Math.max(...matches) : 0;
}