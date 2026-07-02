# Connected Code connection reference

This file documents how an LLM should write code for Make Connected Code with selected Apps and Make Connections.

## Runtime helpers

| Helper | Use |
| --- | --- |
| `input` | Mapped business inputs only. Do not map secrets, tokens, passwords, hosts, or connection strings. |
| `connection.id` | Metadata id for the selected Make connection/keychain handle. |
| `connection.fetch(pathOrUrl, init?)` | Make an HTTP request through the scoped proxy. Prefer relative paths such as `/v1/models`; the selected App/Connection supplies base URL and auth. |
| `connection.sql.query(sql, params?)` | SQL apps only. Pass SQL and params; endpoint/auth stay in the Make connection. |
| `connection.email.send/search/get(...)` | Email apps only. Pass mail content/search inputs; SMTP/IMAP credentials stay in the Make connection. |
| `connection.template(fieldName)` | Escape hatch for rare custom URL/header/body placement. Prefer not to use it; secrets still render only inside the proxy. |

## If you are an LLM writing Connected Code

1. Use `input` only for business data.
2. Use `connection.fetch(...)` for HTTP/API apps; never call global `fetch(...)` for authenticated app calls.
3. Prefer relative paths: `connection.fetch('/items')`. Connected Code joins the path to the selected App request base and validates it stays inside the allowed proxy scope.
4. Add query/body/headers through the second argument: `{ query, json, body, headers, method }`.
5. Do not read or return raw connection secrets. User code receives a capability, not raw credential data.
6. For SQL apps, use `connection.sql.query(sql, params?)`.
7. For Email apps, use `connection.email.*`.
8. Always check `response.ok` before parsing HTTP responses.
9. Return JSON-serializable data.

### Standard HTTP/API pattern

```js
const response = await connection.fetch('/v1/items', {
  method: 'GET',
  query: { limit: 10 }
});
const text = await response.text();
if (!response.ok) throw new Error(`Request failed ${response.status}: ${text.slice(0, 300)}`);
return JSON.parse(text);
```

### POST JSON pattern

```js
const response = await connection.fetch('/v1/items', {
  method: 'POST',
  headers: { 'x-extra-header': 'value' },
  json: { name: input.name }
});
if (!response.ok) throw new Error(`Request failed ${response.status}: ${await response.text()}`);
return response.json();
```

### SQL pattern

```js
const result = await connection.sql.query('select $1::text as message', ['hello']);
return result.rows;
```

## Scope model

- Connected Code never exposes raw credentials to user code.
- The selected Make connection/keychain is available only in the proxy sandbox.
- Service Apps derive request bases and allowed scopes from the generated catalog and selected connection data.
- HTTP App is the only app that asks for an explicit `HTTP Base URL`.
- PostgreSQL, MySQL, and Email use native broker helpers instead of HTTP proxy scopes.
- Requests outside the selected App scope fail closed.

## HTTP credential connection types

| Connection Type | Typical use |
| --- | --- |
| `account:oauth2` | OAuth 2 HTTP connection. Set HTTP Base URL in the module UI, then call relative paths. |
| `keychain:apikeyauth` | API key HTTP credential. Set HTTP Base URL in the module UI. |
| `keychain:basicauth` | Basic auth HTTP credential. |
| `keychain:cacert` | CA certificate HTTP credential. |
| `keychain:clientcertauth` | Client certificate / mTLS HTTP credential. |
| `keychain:proxy` | HTTP proxy credential. |

## App catalog

| App | Label | Connection types | Request base / scope source | Referenced connection fields | Helpers |
| --- | --- | --- | --- | --- | --- |
| google-sheets | Google Sheets | account:google | https://sheets.googleapis.com/v4/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| openai-gpt-3 | OpenAI (ChatGPT, Sora, Whisper) | account:openai-gpt-3 | https://{{temp.region}}api.openai.com/v1 | apiKey, apiOrg, region | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| http | http | account:oauth2, keychain:apikeyauth, keychain:basicauth, keychain:clientcertauth | HTTP Base URL from module UI | — | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| google-email | google-email | account:google-restricted | — | accessToken, refreshTokenExpires | connection.template(fieldName) |
| telegram | Telegram Bot | account:telegram | https://api.telegram.org/bot{{connection.token}}/ | token | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| google-drive | Google Drive | account:google-custom, account:google-drive, account:google-restricted | https://www.googleapis.com/drive/v3/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| airtable | Airtable | account:airtable2, account:airtable3 | {{getBaseUrl(connection, 'api.airtable.com/v0')}} | accessToken, apiToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| email | email | account:imap,google-restricted,microsoft-smtp-imap, account:smtp,google-restricted,microsoft-smtp-imap | Native broker (no HTTP scope) | — | connection.email.send/search/get, connection.template(fieldName) |
| notion | Notion | account:notion2, account:notion3 | https://api.notion.com/v1/ | accessToken, apiKey | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| google-docs | Google Docs | account:google | https://docs.googleapis.com/v1/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| gemini-ai | Google Gemini AI | account:gemini-ai-q9zyjp | https://generativelanguage.googleapis.com/v1beta/ | key | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| google-calendar | Google Calendar | account:google | https://www.googleapis.com/calendar/v3/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| slack | slack | account:slack | {{ifempty(parameters.domain, 'https://slack.com/api/')}} | accessToken | connection.template(fieldName) |
| instagram-business | Instagram for Business (Facebook login) | account:facebook | https://graph.facebook.com/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| facebook-pages | Facebook Pages | account:facebook | https://graph.facebook.com/ | — | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| pinterest | Pinterest | account:pinterest2 | https://api{{if(connection.sandbox, '-sandbox', '')}}.pinterest.com/v5 | accessToken, sandbox, sandboxToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| google-forms | Google Forms | account:google | https://forms.googleapis.com/v1/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| facebook-lead-ads | Facebook Lead Ads | account:facebook | https://graph.facebook.com/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| linkedin | LinkedIn | account:linkedin-openid, account:linkedin2 | https://api.linkedin.com/rest/ | accessToken, developerApplication, id | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| microsoft-email | microsoft-email | account:azure | — | accessToken, userId | connection.template(fieldName) |
| whatsapp-business-cloud | WhatsApp Business Cloud | account:whatsapp-business-cloud, account:whatsapp-business-cloud2 | https://graph.facebook.com/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| wordpress | WordPress | account:wordpress4 | {{connection.restRouteBase}}wp/v2 | apiKey, password, restRouteBase, username | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| youtube | YouTube | account:youtube | https://www.googleapis.com/youtube/v3/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| tally | Tally | account:tally, account:tally2 | https://api.tally.so/ | accessToken, apiKey | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| apify | Apify | account:apify, account:apify2 | https://api.apify.com/v2/ | — | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| anthropic-claude | Anthropic Claude | account:anthropic-claude | https://api.anthropic.com/v1/ | apiKey | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| perplexity-ai | Perplexity AI | account:perplexity-ai | https://api.perplexity.ai/ | apiKey | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| dropbox | Dropbox | account:dropbox | https://api.dropboxapi.com/2/ | accessToken, root_namespace_id | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| discord | Discord | account:discord | https://discord.com/api/v10/ | botToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| line | LINE | account:line, account:line2 | https://api.line.me/v2/bot/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| hubspotcrm | HubSpot CRM | account:hubspotcrm, account:hubspotcrm3 | https://api.hubapi.com/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| zendesk | Zendesk | account:zendesk, account:zendesk4 | https://{{ifempty(connection.subdomain, resolveDomain(connection.domain))}}.zendesk.com/ | accessToken, domain, subdomain | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| shopify | shopify | account:shopify | https://{{connection.domain}}.myshopify.com/admin/api/2026-01/ | accessToken, domain | connection.template(fieldName) |
| microsoft-excel | Microsoft 365 Excel | account:azure | https://graph.microsoft.com/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| clickup | ClickUp | account:clickup, account:clickup2 | https://api.clickup.com/api/v2/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| monday | monday.com | account:monday | https://api.monday.com/ | apiKey | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| trello | Trello | account:trello | https://api.trello.com/1/ | — | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| twilio | twilio | account:twilio | https://api{{ifempty(connection.region, '.')}}twilio.com/2010-04-01/Accounts/{{connection.sid}} | authToken, region, sid | connection.template(fieldName) |
| stripe | Stripe | account:stripe, account:stripe2 | https://api.stripe.com/v1/ | accessToken, key, rk | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| onedrive | OneDrive | account:azure | https://graph.microsoft.com/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| canva | Canva | account:canva | https://api.canva.com/rest/v1/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| calendly | Calendly | account:calendly2 | https://api.calendly.com/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| woocommerce | WooCommerce | account:woocommerce2 | {{getDomain(connection.domain)}}wp-json/wc/v3/ | domain | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| sendinblue | Brevo | account:sendinblue, account:sendinblue2 | https://api.sendinblue.com/v3/ | apiKey | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| highlevel | GoHighLevel | account:highlevel, account:highlevel2, account:highlevel3, account:highlevel4, account:highlevel5 | https://{{if(connection.accessToken, 'services.leadconnectorhq.com', 'rest.gohighlevel.com/v1')}} | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| webflow | Webflow | account:webflow2 | https://api.webflow.com/beta/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| typeform | typeform | account:typeform, account:typeform2 | https://{{switch(connection.region, 'us', 'api.typeform.com', 'eu', 'api.eu.typeform.com', 'eu_new', 'api.typeform.eu', 'api.typeform.com')}} | accessToken, region | connection.template(fieldName) |
| pipedrive | pipedrive | account:pipedrive | {{getApiURL(connection.accessToken, connection.customDomain, connection.apiDomain)}} | accessToken, apiDomain, apiKey, customDomain | connection.template(fieldName) |
| manychat | Manychat | account:manychat | https://api.manychat.com/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| open-router | OpenRouter | account:open-router-4ur2vj, account:open-router3 | https://openrouter.ai/api/v1/ | apiKey | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| elevenlabs | ElevenLabs | account:elevenlabs | {{ifempty(connection.region, 'https://api.elevenlabs.io')}}/v1 | apiKey, region | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| browse-ai | Browse AI | account:browse-ai | https://api.browse.ai/v2/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| supabase | Supabase | account:supabase | https://{{connection.projectId}}.supabase.co | apiKey, projectId, schema | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| google-slides | Google Slides | account:google | https://slides.googleapis.com/v1/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| cloudconvert | CloudConvert | account:cloudconvert2, account:cloudconvert3 | https://api.cloudconvert.com/v2/ | accessToken, apiKey | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| asana | Asana | account:asana | https://app.asana.com/api/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| groq | Groq | account:groq | https://api.groq.com/ | apiKey | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| coda | Coda | account:coda | https://coda.io/apis/v1/ | apiKey | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| make | Make | account:make, account:make2 | {{connection.url}}/api/v2 | accessToken, apiKey, url | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| facebook-insights | Facebook Insights | account:facebook | https://graph.facebook.com/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| google-contacts | Google Contacts | account:google | https://people.googleapis.com/v1/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| facebook-messenger | Facebook Messenger | account:facebook-messenger2 | https://graph.facebook.com/ | — | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| todoist | Todoist | account:todoist3 | https://api.todoist.com/api/v1/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| google-tasks | Google Tasks | account:google | https://www.googleapis.com/tasks/v1/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| z-api | Z-API | account:z-api | https://api.z-api.io/instances/ | , instanceId, token, tokenId | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| deepseek-ai | DeepSeek AI | account:deepseek-ai | https://api.deepseek.com/ | apiKey | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| mailerlite2 | MailerLite | account:mailerlite2 | https://connect.mailerlite.com/api/ | apiKey | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| firecrawl | Firecrawl | account:firecrawl | https://api.firecrawl.dev/v2/ | apiKey | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| inoreader | Inoreader | account:inoreader | https://www.inoreader.com/reader/api/0/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| microsoft-calendar | Microsoft 365 Calendar | account:azure | https://graph.microsoft.com/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| cloudinary | Cloudinary | account:cloudinary | https://api.cloudinary.com/v1_1/{{connection.cloudName}} | apiKey, apiSecret, cloudName | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| active-directory | Microsoft Entra ID | account:azure | https://graph.microsoft.com/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| google-ads | Google Ads (Deprecated) | account:google-ads | https://googleads.googleapis.com/v8/ | accessToken, clientId, customerId, developerToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| google-ads-campaign-management | Google Ads Campaign Management | account:google-ads2 | https://googleads.googleapis.com/{{ifempty(parameters._version, 'v22')}} | accessToken, clientId, customerId, developerToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| google-ads-conversions | Google Ads Conversions | account:google-ads2 | https://googleads.googleapis.com/v22/ | accessToken, clientId, customerId, developerToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| google-ads-customer-match | Google Ads Customer Match | account:google-ads2 | https://googleads.googleapis.com/v22/ | accessToken, clientId, customerId, developerToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| google-ads-lead-forms | Google Ads Lead Forms | account:google-ads2 | https://googleads.googleapis.com/v22/ | accessToken, clientId, customerId, developerToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| google-ads-reports | Google Ads Reports | account:google-ads2 | https://googleads.googleapis.com/v22/ | accessToken, clientId, customerId, developerToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| google-analytics | Google Analytics (Deprecated) | account:google | https://analyticsreporting.googleapis.com/v4/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| google-analytics-4 | Google Analytics 4 | account:google-analytics-4 | https://analyticsdata.googleapis.com/v1beta/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| google-bigquery | BigQuery | account:google | https://bigquery.googleapis.com/bigquery/v2/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| google-chat | Google Chat | account:google-chat3 | https://chat.googleapis.com/v1/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| google-cloud-dialogflow | Google Cloud Dialogflow ES | account:google-custom | https://dialogflow.googleapis.com/v2/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| google-cloud-firestore | Google Cloud Firestore | account:google-custom | https://firestore.googleapis.com/v1/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| google-cloud-pubsub | Google Cloud Pub/Sub | account:google-custom | https://pubsub.googleapis.com/v1/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| google-cloud-speech | Google Cloud Speech | account:google-cloud-speech | https://speech.googleapis.com/v1p1beta1/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| google-cloud-storage | Google Cloud Storage | account:google-custom | https://www.googleapis.com/storage/v1/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| google-cloud-storage-transfer | Google Cloud Storage Transfer Service | account:google-cloud-storage-transfer2 | https://storagetransfer.googleapis.com/v1/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| google-cloud-tts | Google Cloud Text-to-Speech | account:google-custom | https://texttospeech.googleapis.com/v1/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| google-data-studio | Looker Studio | account:google-custom | https://datastudio.googleapis.com/v1/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| google-g-suite | Google Workspace Admin | account:google, account:google-custom | https://www.googleapis.com/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| google-groups | Google Groups | account:google | https://www.googleapis.com/admin/directory/v1/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| google-keep | Google Keep | account:google-custom | https://keep.googleapis.com/v1/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| google-maps | Google Maps | account:google-maps | https://maps.googleapis.com/maps/api/ | — | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| google-meet | Google Meet | account:google | https://www.googleapis.com/calendar/v3/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| google-my-business | Google Business Profile | account:google-custom, account:google-my-business2 | https://mybusiness.googleapis.com/v4/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| google-natural-language | Google Natural Language | account:google-custom | https://language.googleapis.com/v1/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| google-photos | Google Photos | account:google-photos2 | https://photoslibrary.googleapis.com/v1/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| google-search-console | Google Search Console | account:google-search-console | https://www.googleapis.com/webmasters/v3/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| google-shopping | Google Shopping | account:google | https://www.googleapis.com/content/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| google-translate | google-translate | account:google-translate | — | accessToken | connection.template(fieldName) |
| google-vertex-ai | Google Vertex AI (Gemini) | account:google-vertex-ai | https://{{parameters.serviceEndpointLocationId}}-aiplatform.googleapis.com/v1 | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| googlecloudvision | Google Cloud Vision | account:googlecloudvision | https://vision.googleapis.com/ | — | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| intunes | Microsoft Intune | account:intunes | https://graph.microsoft.com/{{connection.apiVersion}} | accessToken, apiVersion | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| linear | Linear | account:linear | https://api.linear.app/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| microsoft-ad-campaign-mgmt | Microsoft Advertising Campaign Management | account:microsoft-ad-campaign-mgmt | https://campaign.api.bingads.microsoft.com/CampaignManagement/v13/ | accessToken, customerId, developerToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| microsoft-d365-bc | Microsoft Dynamics 365 Business Central | account:microsoft-d365-bc, account:microsoft-d365-bc2 | https://{{connection.baseUrl}}/{{connection.tenant}}/{{connection.environment}}/{{connection.endPoint}} | accessToken, baseUrl, endPoint, environment, tenant | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| microsoft-dynamics | Microsoft Dynamics 365 | account:microsoft-dynamics | {{connection.host}} | accessToken, host | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| microsoft-dynamics-365-crm | Microsoft Dynamics 365 - CRM | account:microsoft-dynamics-365-crm | {{connection.host}}/api/data/ | accessToken, host | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| microsoft-dynamics-365-fno | Microsoft Dynamics 365 Finance & Operations | account:microsoft-dynamics-365-fno | {{connection.host}} | accessToken, host | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| microsoft-people | Microsoft 365 People | account:azure | https://graph.microsoft.com/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| microsoft-planner | Microsoft 365 Planner | account:azure | https://graph.microsoft.com/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| microsoft-power-bi | Microsoft Power BI | account:microsoft-power-bi | https://api.powerbi.com/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| microsoft-sharepoint | Microsoft SharePoint Online | account:azure | https://graph.microsoft.com/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| microsoft-teams | Microsoft Teams | account:azure | https://graph.microsoft.com/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| microsoft-to-do | Microsoft To Do | account:azure | https://graph.microsoft.com/beta/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| resend | Resend | account:resend | https://api.resend.com/ | apiKey | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| baserow | Baserow | account:baserow | {{connection.apiURL}} | apiToken, apiURL | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| cerebras-ai | Cerebras AI | account:cerebras-ai | https://api.cerebras.ai/ | apiKey | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| edenaiv3 | Eden AI | account:edenaiv3 | https://api.edenai.run/v3/ | apiKey | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| fal-ai | Fal.ai | account:fal-ai | https://queue.fal.run/fal-ai/ | apiKey | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| quickbooks | quickbooks | account:quickbooks | https://{{if(connection.sandbox, 'sandbox-quickbooks', 'quickbooks')}}.api.intuit.com/v3/company/{{connection.realmId}} | accessToken, accessToken2, realmId, sandbox | connection.template(fieldName) |
| salesforce | salesforce | account:salesforce | {{connection.instanceUrl}}/services/data/ | accessToken, instanceUrl | connection.template(fieldName) |
| zohocrm | zohocrm | account:zohocrm | {{parseZohoUrl(connection)}}/crm/v3 | accessToken | connection.template(fieldName) |
| mysql | mysql | account:mysql | Native broker (no HTTP scope) | — | connection.sql.query(sql, params?), connection.template(fieldName) |
| postgres | postgres | account:postgres | Native broker (no HTTP scope) | — | connection.sql.query(sql, params?), connection.template(fieldName) |
| box | box | account:box | — | accessToken | connection.template(fieldName) |
| toggl | toggl | account:toggl | — | apiToken | connection.template(fieldName) |
| reddit | reddit | account:reddit | https://oauth.reddit.com/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| jira | Jira Cloud Platform | account:jira, account:jira-service-desk2 | {{if(connection.cloudId, 'https://api.atlassian.com/ex/jira/' + connection.cloudId + '/rest/api/3', connection.url + '/rest/api/3')}} | accessToken, cloudId, password, url, username | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| github | GitHub | account:github, account:github2 | https://api.github.com/ | accessToken | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| mistral-ai | Mistral AI | account:mistral-ai | https://api.mistral.ai/v1/ | apiKey | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| fireflies-ai | Fireflies.ai | account:fireflies-ai | https://api.fireflies.ai/ | apiKey | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| leonardo-ai | Leonardo.Ai | account:leonardo-ai | https://cloud.leonardo.ai/api/rest/v1/ | apiKey | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| assembly-ai | AssemblyAI | account:assembly-ai | https://{{connection.environment}}.assemblyai.com | apiKey, environment | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| retell-ai | Retell AI | account:retell-ai | https://api.retellai.com/ | apiKey | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| huggingface | Hugging Face | account:huggingface | https://router.huggingface.co/ | apiKey | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| pinecone | Pinecone | account:pinecone | https://{{connection.indexName}}.pinecone.io | apiKey, indexName | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| xai | xAI | account:xai | https://api.x.ai/v1/ | apiKey | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| stability-ai | Stability AI | account:stability-ai | https://api.stability.ai/ | Organization, apiKey | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| exa-ai | Exa | account:exa-ai | https://api.exa.ai/ | apiKey | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| qdrant | Qdrant | account:qdrant2 | {{connection.qdrantUrl}} | apiKey, qdrantUrl | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| qwen-ai | Qwen AI | account:qwen-ai | https://dashscope-intl.aliyuncs.com/api/v1/ | apiKey | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| eleven-labs | ElevenLabs | account:eleven-labs | https://api.elevenlabs.io/ | apiKey | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| jina-ai | jina.ai | account:jina-ai | https://r.jina.ai/ | apiKey | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| dataforseo | DataForSEO | account:dataforseo | https://api.dataforseo.com/v3/ | password, username | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| confluence | Confluence | account:confluence | https://api.atlassian.com/ex/confluence/{{connection.cloudid}}/wiki/api/v2 | accessToken, cloudid | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| supadata | Supadata | account:supadata | https://api.supadata.ai/ | apiKey | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| browser-act | BrowserAct | account:browser-act | https://api.browseract.com/ | apiKey | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| brightdata | Bright Data | account:brightdata | https://api.brightdata.com/ | apiKey | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| supabase-management | Supabase Management | account:supabase-management | https://api.supabase.com/ | apiKey | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
| together-ai | Together AI | account:together-ai | https://api.together.xyz/v1/ | apiKey | connection.fetch(pathOrUrl, init?), connection.template(fieldName) |
