# n8n-nodes-bizwachat-v3

Hand-authored BizwaChat n8n nodes for the tenant API-management integration surface.

## What this package includes

- `BizwaChat v3`: send text, interactive, media, typing indicators, and approved template messages.
- `BizwaChat Trigger`: receive BizwaChat webhook events in n8n.
- Tenant resources: create, read, update, and delete contacts, groups, sources, and statuses directly from n8n.
- Dynamic template parameter mapping: select a template from a dropdown, then fill the exact variables BizwaChat expects. No JSON field is required.

## Credentials

Create a `BizwaChat Tenant API` credential with:

- `Base URL`: your BizwaChat app URL, for example `https://bizwachat.com`
- `API Path Prefix`: defaults to `/api/v3`
- `Tenant Subdomain`: the tenant slug, for example `test`
- `API Token`: generated in `Settings > System Settings > API Management`

The package defaults to `/api/v3` because the public tenant API surface is versioned there. If your deployment exposes the tenant token API on a different prefix, change the credential value instead of editing the node.

## Action node

### Message operations

- `Send Template`: fetches templates from BizwaChat, then renders the template placeholders, header inputs, and button parameters as fields.
- `Send Text`: sends a plain WhatsApp message.
- `Send Interactive`: sends a standalone reply-button or CTA URL message through `POST /api/v3/{subdomain}/messages/send-interactive`.
- `Send Media`: sends media from either a URL or an incoming binary file.
- `Send Typing Indicator`: sends a typing indicator using an existing message ID.

### Lookup operations

- `Template`: get one template or list templates.
- `Template Bot`: get one template bot or list template bots.
- `Message Bot`: get one message bot or list message bots.

### Tenant resource operations

- `Contact`: get, list, create, update, and delete contacts.
- `Group`: get, list, create, update, and delete groups.
- `Source`: get, list, create, update, and delete sources.
- `Status`: get, list, create, update, and delete statuses.

## Trigger node

Use `BizwaChat Trigger` when you want BizwaChat to push events into n8n.

1. Add the trigger node to your workflow.
2. Copy the generated webhook URL.
3. In BizwaChat, open `Settings > System Settings > Webhook Management`.
4. Paste the n8n webhook URL and enable the events you want.

The trigger supports the webhook event families currently present in the product:

- `message.received`, `message.sent`, `message.status.update`
- `contact.created`, `contact.updated`, `contact.deleted`
- `source.created`, `source.updated`, `source.deleted`
- `status.created`, `status.updated`, `status.deleted`
- `whatsapp.*` forwarding events when the tenant also uses the WhatsApp resend flow

## Notes

- This package does not use generic JSON text inputs.
- Template header file uploads are not included in this first package version. Use URL-based header media values for image, video, and document template headers.