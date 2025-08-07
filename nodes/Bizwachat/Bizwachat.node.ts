import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { N8NPropertiesBuilder, N8NPropertiesBuilderConfig } from 'n8n-bizwachat-openapi-node';
import * as doc from './openapi.json';

const config: N8NPropertiesBuilderConfig = {}
const parser = new N8NPropertiesBuilder(doc, config);
const properties = parser.build()

export class Bizwachat implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Bizwachat',
		name: 'bizwachat',
		icon: 'file:bizwachat.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Bizwachat API',
		defaults: {
			name: 'Bizwachat',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'bizwachatApi',
				required: true,
			},
		],
		requestDefaults: {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			baseURL: 'https://bizwachat.com/api',
		},
		properties: properties,
	};
}
