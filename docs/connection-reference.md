# Connected Code connection reference

This file documents what Connected Code can infer for each selected App in the App dropdown.

## Runtime helpers

| Helper | Use |
| --- | --- |
| `input` | Your mapped input variables. |
| `connection.id` | Metadata id for the selected Make connection/keychain proxy handle. |
| `connection.fetch(url, init?)` | Make an HTTP request through the scoped proxy. Secrets stay in the proxy sandbox. |
| `connection.template('fieldName')` | Emit an inert placeholder that the proxy renders from the selected Make connection/keychain. Use this when a request needs a field in a URL/body/header. |
| `connection.sql.query(sql, params?)` | Available for SQL apps such as PostgreSQL/MySQL. User code passes only SQL and params; endpoint/auth stay in the Make connection. |
| `connection.email.send/search/get(...)` | Available for Email broker apps. User code passes mail content/search inputs; SMTP/IMAP credentials stay in the Make connection. |

## HTTP credential connection types

For the generic HTTP App, choose a Connection Type and then use `connection.fetch(...)` against the required HTTP Base URL scope.

| Connection Type | Typical use |
| --- | --- |
| `account:oauth2` | OAuth 2 HTTP connection. Use `connection.fetch(...)`; use `connection.template('accessToken')` only when building a custom header/body manually. |
| `keychain:apikeyauth` | API key HTTP credential. Use `connection.fetch(...)`; use `connection.template('key')` or the configured key field if you must manually place it. |
| `keychain:basicauth` | Basic auth HTTP credential. |
| `keychain:cacert` | CA certificate HTTP credential. |
| `keychain:clientcertauth` | Client certificate / mTLS HTTP credential. |
| `keychain:proxy` | HTTP proxy credential. |

## Known `connection.*` fields referenced by generated policies

| Field | Apps referencing it |
| --- | --- |
| connection.AIservices | azure-ai-foundry |
| connection.Organization | stability-ai |
| connection.acAccountName | activecampaign |
| connection.accessToken | google-sheets, google-email, google-drive, airtable, notion, google-docs, google-calendar, slack, instagram-business, pinterest, google-forms, facebook-lead-ads… |
| connection.accessToken2 | quickbooks |
| connection.accountName | activecampaign |
| connection.agentBaseUrl | fillout |
| connection.apiDomain | pipedrive |
| connection.apiEndpoint | mailchimp |
| connection.apiKey | openai-gpt-3, notion, wordpress, tally, anthropic-claude, perplexity-ai, monday, pdf-co, sendinblue, pipedrive, open-router, elevenlabs… |
| connection.apiOrg | openai-gpt-3 |
| connection.apiSecret | cloudinary |
| connection.apiToken | airtable, baserow, toggl |
| connection.apiURL | baserow |
| connection.apiVersion | intunes |
| connection.authToken | twilio |
| connection.azureOpenAiKey | azure-openai |
| connection.baseUrl | pdf-co, microsoft-d365-bc, airtop, azure-openai |
| connection.botToken | discord |
| connection.client-token | z-api |
| connection.clientId | google-ads, google-ads-campaign-management, google-ads-conversions, google-ads-customer-match, google-ads-lead-forms, google-ads-reports |
| connection.cloudId | jira |
| connection.cloudName | cloudinary |
| connection.cloudid | confluence |
| connection.customDomain | pipedrive, teamwork |
| connection.customerId | google-ads, google-ads-campaign-management, google-ads-conversions, google-ads-customer-match, google-ads-lead-forms, google-ads-reports, microsoft-ad-campaign-mgmt |
| connection.devMode | airtop |
| connection.developerApplication | linkedin |
| connection.developerToken | google-ads, google-ads-campaign-management, google-ads-conversions, google-ads-customer-match, google-ads-lead-forms, google-ads-reports, microsoft-ad-campaign-mgmt |
| connection.domain | zendesk, shopify, woocommerce, activecampaign, teamwork, gitlab |
| connection.endPoint | microsoft-d365-bc |
| connection.endpoints | azure-openai |
| connection.enterpriseDomain | jotform |
| connection.environment | microsoft-d365-bc, assembly-ai |
| connection.environmentUrl | microsoft-power-automate |
| connection.hipaa | jotform |
| connection.host | microsoft-dynamics, microsoft-dynamics-365-crm, microsoft-dynamics-365-fno |
| connection.id | linkedin |
| connection.indexName | pinecone |
| connection.instanceId | z-api |
| connection.instanceUrl | salesforce |
| connection.isApiKey | azure-openai |
| connection.key | gemini-ai, stripe |
| connection.password | wordpress, jira, dataforseo |
| connection.privateToken | gitlab |
| connection.projectId | supabase |
| connection.qdrantUrl | qdrant |
| connection.realmId | quickbooks |
| connection.refreshTokenExpires | google-email |
| connection.region | openai-gpt-3, twilio, typeform, elevenlabs |
| connection.restRouteBase | wordpress |
| connection.rk | stripe |
| connection.root_namespace_id | dropbox |
| connection.sandbox | pinterest, quickbooks |
| connection.sandboxToken | pinterest |
| connection.schema | supabase |
| connection.select | teamwork |
| connection.sid | twilio |
| connection.subdomain | zendesk |
| connection.tenant | microsoft-d365-bc |
| connection.token | telegram, z-api |
| connection.tokenId | z-api |
| connection.url | make, jira |
| connection.userId | microsoft-email |
| connection.username | wordpress, jira, dataforseo |

## App catalog

| App | Label | Connection types | Referenced connection fields | Helpers | Scope/source |
| --- | --- | --- | --- | --- | --- |
| google-sheets | Google Sheets | account:google | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://sheets.googleapis.com/v4/ |
| openai-gpt-3 | OpenAI (ChatGPT, Sora, Whisper) | account:openai-gpt-3 | apiKey, apiOrg, region | connection.fetch(url, init?), connection.template(fieldName) | https://{{temp.region}}api.openai.com/v1 |
| http | HTTP App | account:oauth2, keychain:apikeyauth, keychain:basicauth, keychain:cacert, keychain:clientcertauth, keychain:proxy | — | connection.fetch(url, init?), connection.template(fieldName) | HTTP Base URL |
| google-email | Gmail | account:google-email | accessToken, refreshTokenExpires | connection.fetch(url, init?), connection.template(fieldName) | https://gmail.googleapis.com/gmail/v1/users/me/ |
| telegram | Telegram Bot | account:telegram | token | connection.fetch(url, init?), connection.template(fieldName) | https://api.telegram.org/bot{{connection.token}}/ |
| google-drive | Google Drive | account:google-custom, account:google-drive, account:google-restricted, account:google-restricted,google-drive | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://www.googleapis.com/drive/v3/ |
| airtable | Airtable | account:airtable2, account:airtable3, account:airtable3,airtable2 | accessToken, apiToken | connection.fetch(url, init?), connection.template(fieldName) | {{getBaseUrl(connection, 'api.airtable.com/v0')}} |
| email | Email | account:imap, account:smtp | — | connection.email.send/search/get | — |
| notion | Notion | account:notion2, account:notion2,notion3, account:notion3 | accessToken, apiKey | connection.fetch(url, init?), connection.template(fieldName) | https://api.notion.com/v1/ |
| google-docs | Google Docs | account:google | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://docs.googleapis.com/v1/ |
| gemini-ai | Google Gemini AI | account:gemini-ai-q9zyjp | key | connection.fetch(url, init?), connection.template(fieldName) | https://generativelanguage.googleapis.com/v1beta/ |
| google-calendar | Google Calendar | account:google | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://www.googleapis.com/calendar/v3/ |
| slack | Slack | account:slack2, account:slack2,slack3, account:slack3 | accessToken | connection.fetch(url, init?), connection.template(fieldName) | {{ifempty(parameters.domain, 'https://slack.com/api/')}} |
| instagram-business | Instagram for Business (Facebook login) | account:facebook | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://graph.facebook.com/v25.0/ |
| facebook-pages | Facebook Pages | account:facebook | — | connection.fetch(url, init?), connection.template(fieldName) | https://graph.facebook.com/v25.0/ |
| pinterest | Pinterest | account:pinterest2 | accessToken, sandbox, sandboxToken | connection.fetch(url, init?), connection.template(fieldName) | https://api{{if(connection.sandbox, '-sandbox', '')}}.pinterest.com/v5 |
| google-forms | Google Forms | account:google | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://forms.googleapis.com/v1/ |
| facebook-lead-ads | Facebook Lead Ads | account:facebook | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://graph.facebook.com/v25.0/ |
| linkedin | LinkedIn | account:linkedin-openid, account:linkedin2, account:linkedin2,linkedin-openid | accessToken, developerApplication, id | connection.fetch(url, init?), connection.template(fieldName) | https://api.linkedin.com/rest/ |
| microsoft-email | Microsoft 365 Email (Outlook) | account:azure, account:microsoft-smtp-imap | accessToken, userId | connection.fetch(url, init?), connection.template(fieldName) | https://graph.microsoft.com/v1.0/ |
| whatsapp-business-cloud | WhatsApp Business Cloud | account:whatsapp-business-cloud, account:whatsapp-business-cloud,whatsapp-business-cloud2, account:whatsapp-business-cloud2 | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://graph.facebook.com/v25.0/ |
| wordpress | WordPress | account:wordpress4 | apiKey, password, restRouteBase, username | connection.fetch(url, init?), connection.template(fieldName) | {{connection.restRouteBase}}wp/v2 |
| youtube | YouTube | account:youtube | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://www.googleapis.com/youtube/v3/ |
| tally | Tally | account:tally, account:tally2 | accessToken, apiKey | connection.fetch(url, init?), connection.template(fieldName) | https://api.tally.so/ |
| apify | Apify | account:apify, account:apify2, account:apify2,apify | — | connection.fetch(url, init?), connection.template(fieldName) | https://api.apify.com/v2/ |
| anthropic-claude | Anthropic Claude | account:anthropic-claude | apiKey | connection.fetch(url, init?), connection.template(fieldName) | https://api.anthropic.com/v1/ |
| perplexity-ai | Perplexity AI | account:perplexity-ai | apiKey | connection.fetch(url, init?), connection.template(fieldName) | https://api.perplexity.ai/ |
| dropbox | Dropbox | account:dropbox | accessToken, root_namespace_id | connection.fetch(url, init?), connection.template(fieldName) | https://api.dropboxapi.com/2/ |
| discord | Discord | account:discord | botToken | connection.fetch(url, init?), connection.template(fieldName) | https://discord.com/api/v10/ |
| line | LINE | account:line, account:line2 | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://api.line.me/v2/bot/ |
| hubspotcrm | HubSpot CRM | account:hubspotcrm, account:hubspotcrm3 | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://api.hubapi.com/ |
| zendesk | Zendesk | account:zendesk, account:zendesk4, account:zendesk4,zendesk | accessToken, domain, subdomain | connection.fetch(url, init?), connection.template(fieldName) | https://{{ifempty(connection.subdomain, resolveDomain(connection.domain))}}.zendesk.com/ |
| shopify | Shopify | account:shopify, account:shopify,shopify4, account:shopify4 | accessToken, domain | connection.fetch(url, init?), connection.template(fieldName) | https://{{connection.domain}}.myshopify.com/admin/api/2026-01/graphql.json |
| microsoft-excel | Microsoft 365 Excel | account:azure | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://graph.microsoft.com/v1.0/ |
| clickup | ClickUp | account:clickup, account:clickup2, account:clickup2,clickup | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://api.clickup.com/api/v2/ |
| monday | monday.com | account:monday | apiKey | connection.fetch(url, init?), connection.template(fieldName) | https://api.monday.com/ |
| trello | Trello | account:trello | — | connection.fetch(url, init?), connection.template(fieldName) | https://api.trello.com/1/ |
| twilio | Twilio | account:twilio | authToken, region, sid | connection.fetch(url, init?), connection.template(fieldName) | https://api{{ifempty(connection.region, '.')}}twilio.com/2010-04-01/Accounts/{{connection.sid}} |
| pdf-co | PDF.co | account:pdf-co | apiKey, baseUrl | connection.fetch(url, init?), connection.template(fieldName) | https://{{ifempty(connection.baseUrl, 'api.pdf.co/v1')}} |
| stripe | Stripe | account:stripe, account:stripe,stripe2, account:stripe2 | accessToken, key, rk | connection.fetch(url, init?), connection.template(fieldName) | https://api.stripe.com/v1/ |
| onedrive | OneDrive | account:azure | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://graph.microsoft.com/v1.0/ |
| canva | Canva | account:canva | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://api.canva.com/rest/v1/ |
| calendly | Calendly | account:calendly2 | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://api.calendly.com/ |
| woocommerce | WooCommerce | account:woocommerce2 | domain | connection.fetch(url, init?), connection.template(fieldName) | {{getDomain(connection.domain)}}wp-json/wc/v3/ |
| sendinblue | Brevo | account:sendinblue, account:sendinblue2, account:sendinblue2,sendinblue | apiKey | connection.fetch(url, init?), connection.template(fieldName) | https://api.sendinblue.com/v3/ |
| highlevel | GoHighLevel | account:highlevel, account:highlevel,highlevel2, account:highlevel,highlevel3, account:highlevel2, account:highlevel2,highlevel4, account:highlevel3, account:highlevel3,highlevel4, account:highlevel4, account:highlevel5 | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://{{if(connection.accessToken, 'services.leadconnectorhq.com', 'rest.gohighlevel.com/v1')}} |
| webflow | Webflow | account:webflow2 | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://api.webflow.com/beta/ |
| typeform | Typeform | account:typeform2 | accessToken, region | connection.fetch(url, init?), connection.template(fieldName) | https://{{switch(connection.region, 'us', 'api.typeform.com', 'eu', 'api.eu.typeform.com', 'eu_new', 'api.typeform.eu', 'api.typeform.com')}} |
| pipedrive | Pipedrive CRM | account:pipedrive-apikey, account:pipedrive-apikey,pipedrive-auth, account:pipedrive-auth, account:pipedrive-auth,pipedrive-apikey | accessToken, apiDomain, apiKey, customDomain | connection.fetch(url, init?), connection.template(fieldName) | {{getApiURL(connection.accessToken, connection.customDomain, connection.apiDomain)}} |
| manychat | Manychat | account:manychat | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://api.manychat.com/ |
| open-router | OpenRouter | account:open-router-4ur2vj, account:open-router3, account:open-router3,open-router-4ur2vj | apiKey | connection.fetch(url, init?), connection.template(fieldName) | https://openrouter.ai/api/v1/ |
| jotform | Jotform | account:jotform | enterpriseDomain, hipaa | connection.fetch(url, init?), connection.template(fieldName) | https://{{if(connection.enterpriseDomain === undefined, if(connection.hipaa === true,'hipaa-api.jotform.com' , 'eu-api.jotform.com'), connection.enterpriseDomain + '/API')}}, {{getUrlParamaterForUniversalModule(connection.enterpriseDomain, connection.hipaa)}} |
| fillout | Fillout Forms | account:fillout | accessToken, agentBaseUrl | connection.fetch(url, init?), connection.template(fieldName) | {{connection.agentBaseUrl}}/v1/api |
| elevenlabs | ElevenLabs | account:elevenlabs | apiKey, region | connection.fetch(url, init?), connection.template(fieldName) | {{ifempty(connection.region, 'https://api.elevenlabs.io')}}/v1 |
| browse-ai | Browse AI | account:browse-ai | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://api.browse.ai/v2/ |
| supabase | Supabase | account:supabase | apiKey, projectId, schema | connection.fetch(url, init?), connection.template(fieldName) | https://{{connection.projectId}}.supabase.co |
| mailchimp | Mailchimp | account:mailchimp, account:mailchimp2, account:mailchimp2,mailchimp | accessToken, apiEndpoint | connection.fetch(url, init?), connection.template(fieldName) | {{connection.apiEndpoint}}/3.0 |
| google-slides | Google Slides | account:google | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://slides.googleapis.com/v1/ |
| cloudconvert | CloudConvert | account:cloudconvert2, account:cloudconvert3, account:cloudconvert3,cloudconvert2 | accessToken, apiKey | connection.fetch(url, init?), connection.template(fieldName) | https://api.cloudconvert.com/v2/ |
| asana | Asana | account:asana | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://app.asana.com/api/1.0/ |
| groq | Groq | account:groq | apiKey | connection.fetch(url, init?), connection.template(fieldName) | https://api.groq.com/ |
| coda | Coda | account:coda | apiKey | connection.fetch(url, init?), connection.template(fieldName) | https://coda.io/apis/v1/ |
| make | Make | account:make, account:make2, account:make2,make | accessToken, apiKey, url | connection.fetch(url, init?), connection.template(fieldName) | {{connection.url}}/api/v2 |
| facebook-insights | Facebook Insights | account:facebook | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://graph.facebook.com/v25.0/ |
| google-contacts | Google Contacts | account:google | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://people.googleapis.com/v1/ |
| activecampaign | ActiveCampaign | account:activecampaign | acAccountName, accountName, apiKey, domain | connection.fetch(url, init?), connection.template(fieldName) | https://{{parseAccountName(ifempty(connection.accountName, connection.acAccountName))}}.{{ifempty(connection.domain, 'api-us1.com')}} |
| facebook-messenger | Facebook Messenger | account:facebook-messenger2 | — | connection.fetch(url, init?), connection.template(fieldName) | https://graph.facebook.com/v25.0/ |
| todoist | Todoist | account:todoist3 | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://api.todoist.com/api/v1/ |
| google-tasks | Google Tasks | account:google | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://www.googleapis.com/tasks/v1/ |
| z-api | Z-API | account:z-api | client-token, instanceId, token, tokenId | connection.fetch(url, init?), connection.template(fieldName) | https://api.z-api.io/instances/ |
| deepseek-ai | DeepSeek AI | account:deepseek-ai | apiKey | connection.fetch(url, init?), connection.template(fieldName) | https://api.deepseek.com/ |
| mailerlite2 | MailerLite | account:mailerlite2 | apiKey | connection.fetch(url, init?), connection.template(fieldName) | https://connect.mailerlite.com/api/ |
| firecrawl | Firecrawl | account:firecrawl | apiKey | connection.fetch(url, init?), connection.template(fieldName) | https://api.firecrawl.dev/v2/ |
| inoreader | Inoreader | account:inoreader | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://www.inoreader.com/reader/api/0/ |
| microsoft-calendar | Microsoft 365 Calendar | account:azure | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://graph.microsoft.com/v1.0/ |
| cloudinary | Cloudinary | account:cloudinary | apiKey, apiSecret, cloudName | connection.fetch(url, init?), connection.template(fieldName) | https://api.cloudinary.com/v1_1/{{connection.cloudName}} |
| active-directory | Microsoft Entra ID | account:azure | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://graph.microsoft.com/v1.0/ |
| google-ads | Google Ads (Deprecated) | account:google-ads | accessToken, clientId, customerId, developerToken | connection.fetch(url, init?), connection.template(fieldName) | https://googleads.googleapis.com/v8/ |
| google-ads-campaign-management | Google Ads Campaign Management | account:google-ads2 | accessToken, clientId, customerId, developerToken | connection.fetch(url, init?), connection.template(fieldName) | https://googleads.googleapis.com/{{ifempty(parameters._version, 'v22')}} |
| google-ads-conversions | Google Ads Conversions | account:google-ads2 | accessToken, clientId, customerId, developerToken | connection.fetch(url, init?), connection.template(fieldName) | https://googleads.googleapis.com/v22/ |
| google-ads-customer-match | Google Ads Customer Match | account:google-ads2 | accessToken, clientId, customerId, developerToken | connection.fetch(url, init?), connection.template(fieldName) | https://googleads.googleapis.com/v22/ |
| google-ads-lead-forms | Google Ads Lead Forms | account:google-ads2 | accessToken, clientId, customerId, developerToken | connection.fetch(url, init?), connection.template(fieldName) | https://googleads.googleapis.com/v22/ |
| google-ads-reports | Google Ads Reports | account:google-ads2 | accessToken, clientId, customerId, developerToken | connection.fetch(url, init?), connection.template(fieldName) | https://googleads.googleapis.com/v22/ |
| google-analytics | Google Analytics (Deprecated) | account:google | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://analyticsreporting.googleapis.com/v4/ |
| google-analytics-4 | Google Analytics 4 | account:google-analytics-4 | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://analyticsdata.googleapis.com/v1beta/ |
| google-bigquery | BigQuery | account:google | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://bigquery.googleapis.com/bigquery/v2/ |
| google-chat | Google Chat | account:google-chat3 | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://chat.googleapis.com/v1/ |
| google-cloud-dialogflow | Google Cloud Dialogflow ES | account:google-custom | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://dialogflow.googleapis.com/v2/ |
| google-cloud-firestore | Google Cloud Firestore | account:google-custom | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://firestore.googleapis.com/v1/ |
| google-cloud-pubsub | Google Cloud Pub/Sub | account:google-custom | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://pubsub.googleapis.com/v1/ |
| google-cloud-speech | Google Cloud Speech | account:google-cloud-speech | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://speech.googleapis.com/v1p1beta1/ |
| google-cloud-storage | Google Cloud Storage | account:google-custom | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://www.googleapis.com/storage/v1/ |
| google-cloud-storage-transfer | Google Cloud Storage Transfer Service | account:google-cloud-storage-transfer2 | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://storagetransfer.googleapis.com/v1/ |
| google-cloud-tts | Google Cloud Text-to-Speech | account:google-custom | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://texttospeech.googleapis.com/v1/ |
| google-data-studio | Looker Studio | account:google-custom | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://datastudio.googleapis.com/v1/ |
| google-g-suite | Google Workspace Admin | account:google, account:google,google-custom, account:google-custom | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://www.googleapis.com/ |
| google-groups | Google Groups | account:google | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://www.googleapis.com/admin/directory/v1/ |
| google-keep | Google Keep | account:google-custom | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://keep.googleapis.com/v1/ |
| google-maps | Google Maps | account:google-maps | — | connection.fetch(url, init?), connection.template(fieldName) | https://maps.googleapis.com/maps/api/ |
| google-meet | Google Meet | account:google | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://www.googleapis.com/calendar/v3/ |
| google-my-business | Google Business Profile | account:google-custom, account:google-custom,google-my-business2, account:google-my-business2 | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://mybusiness.googleapis.com/v4/ |
| google-natural-language | Google Natural Language | account:google-custom | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://language.googleapis.com/v1/ |
| google-photos | Google Photos | account:google-photos2 | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://photoslibrary.googleapis.com/v1/ |
| google-search-console | Google Search Console | account:google-search-console | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://www.googleapis.com/webmasters/v3/ |
| google-shopping | Google Shopping | account:google | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://www.googleapis.com/content/v2.1/ |
| google-translate | Google Translate | account:google | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://www.googleapis.com/language/translate/v2/ |
| google-vertex-ai | Google Vertex AI (Gemini) | account:google-vertex-ai | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://{{parameters.serviceEndpointLocationId}}-aiplatform.googleapis.com/v1 |
| googlecloudvision | Google Cloud Vision | account:googlecloudvision | — | connection.fetch(url, init?), connection.template(fieldName) | https://vision.googleapis.com/ |
| intunes | Microsoft Intune | account:intunes | accessToken, apiVersion | connection.fetch(url, init?), connection.template(fieldName) | https://graph.microsoft.com/{{connection.apiVersion}} |
| linear | Linear | account:linear | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://api.linear.app/ |
| microsoft-ad-campaign-mgmt | Microsoft Advertising Campaign Management | account:microsoft-ad-campaign-mgmt | accessToken, customerId, developerToken | connection.fetch(url, init?), connection.template(fieldName) | https://campaign.api.bingads.microsoft.com/CampaignManagement/v13/ |
| microsoft-d365-bc | Microsoft Dynamics 365 Business Central | account:microsoft-d365-bc, account:microsoft-d365-bc,microsoft-d365-bc2, account:microsoft-d365-bc2 | accessToken, baseUrl, endPoint, environment, tenant | connection.fetch(url, init?), connection.template(fieldName) | https://{{connection.baseUrl}}/{{connection.tenant}}/{{connection.environment}}/{{connection.endPoint}} |
| microsoft-dynamics | Microsoft Dynamics 365 | account:microsoft-dynamics | accessToken, host | connection.fetch(url, init?), connection.template(fieldName) | {{connection.host}} |
| microsoft-dynamics-365-crm | Microsoft Dynamics 365 - CRM | account:microsoft-dynamics-365-crm | accessToken, host | connection.fetch(url, init?), connection.template(fieldName) | {{connection.host}}/api/data/v9.2 |
| microsoft-dynamics-365-fno | Microsoft Dynamics 365 Finance & Operations | account:microsoft-dynamics-365-fno | accessToken, host | connection.fetch(url, init?), connection.template(fieldName) | {{connection.host}} |
| microsoft-people | Microsoft 365 People | account:azure | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://graph.microsoft.com/v1.0/ |
| microsoft-planner | Microsoft 365 Planner | account:azure | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://graph.microsoft.com/v1.0/ |
| microsoft-power-automate | Microsoft Power Automate | account:microsoft-power-automate | accessToken, environmentUrl | connection.fetch(url, init?), connection.template(fieldName) | {{connection.environmentUrl}}/api/data/v9.2 |
| microsoft-power-bi | Microsoft Power BI | account:microsoft-power-bi | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://api.powerbi.com/v1.0/ |
| microsoft-sharepoint | Microsoft SharePoint Online | account:azure | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://graph.microsoft.com/v1.0/ |
| microsoft-teams | Microsoft Teams | account:azure | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://graph.microsoft.com/v1.0/ |
| microsoft-to-do | Microsoft To Do | account:azure | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://graph.microsoft.com/beta/ |
| resend | Resend | account:resend | apiKey | connection.fetch(url, init?), connection.template(fieldName) | https://api.resend.com/ |
| airtop | Airtop | account:airtop | apiKey, baseUrl, devMode | connection.fetch(url, init?), connection.template(fieldName) | {{ if(connection.devMode; connection.baseUrl; 'https://api.airtop.ai/api/v1') }} |
| baserow | Baserow | account:baserow | apiToken, apiURL | connection.fetch(url, init?), connection.template(fieldName) | {{connection.apiURL}} |
| cerebras-ai | Cerebras AI | account:cerebras-ai | apiKey | connection.fetch(url, init?), connection.template(fieldName) | https://api.cerebras.ai/ |
| edenaiv3 | Eden AI | account:edenaiv3 | apiKey | connection.fetch(url, init?), connection.template(fieldName) | https://api.edenai.run/v3/ |
| fal-ai | Fal.ai | account:fal-ai | apiKey | connection.fetch(url, init?), connection.template(fieldName) | https://queue.fal.run/fal-ai/ |
| quickbooks | QuickBooks | account:quickbooks, account:quickbooks2, account:quickbooks2,quickbooks | accessToken, accessToken2, realmId, sandbox | connection.fetch(url, init?), connection.template(fieldName) | https://{{if(connection.sandbox, 'sandbox-quickbooks', 'quickbooks')}}.api.intuit.com/v3/company/{{connection.realmId}} |
| salesforce | Salesforce | account:salesforce, account:salesforce,salesforce2, account:salesforce2 | accessToken, instanceUrl | connection.fetch(url, init?), connection.template(fieldName) | {{connection.instanceUrl}}/services/data/v66.0 |
| zohocrm | Zoho CRM | account:zohocrm2 | accessToken | connection.fetch(url, init?), connection.template(fieldName) | {{parseZohoUrl(connection)}}/crm/v3 |
| mysql | MySQL | account:mysql | — | connection.sql.query(sql, params?) | — |
| postgres | PostgreSQL | account:postgres | — | connection.sql.query(sql, params?) | — |
| box | Box | account:box2 | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://api.box.com/2.0/ |
| teamwork | Teamwork | account:teamwork2 | accessToken, customDomain, domain, select | connection.fetch(url, init?), connection.template(fieldName) | {{getConnectionUrl(connection.select, connection.domain, connection.customDomain)}} |
| toggl | Toggl Track | account:toggl | apiToken | connection.fetch(url, init?), connection.template(fieldName) | https://api.track.toggl.com/api/v9/ |
| reddit | reddit | account:reddit | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://oauth.reddit.com/ |
| jira | Jira Cloud Platform | account:jira, account:jira-service-desk2 | accessToken, cloudId, password, url, username | connection.fetch(url, init?), connection.template(fieldName) | {{if(connection.cloudId, 'https://api.atlassian.com/ex/jira/' + connection.cloudId + '/rest/api/3', connection.url + '/rest/api/3')}} |
| github | GitHub | account:github, account:github2, account:github2,github | accessToken | connection.fetch(url, init?), connection.template(fieldName) | https://api.github.com/ |
| mistral-ai | Mistral AI | account:mistral-ai | apiKey | connection.fetch(url, init?), connection.template(fieldName) | https://api.mistral.ai/v1/ |
| fireflies-ai | Fireflies.ai | account:fireflies-ai | apiKey | connection.fetch(url, init?), connection.template(fieldName) | https://api.fireflies.ai/ |
| leonardo-ai | Leonardo.Ai | account:leonardo-ai | apiKey | connection.fetch(url, init?), connection.template(fieldName) | https://cloud.leonardo.ai/api/rest/v1/ |
| assembly-ai | AssemblyAI | account:assembly-ai | apiKey, environment | connection.fetch(url, init?), connection.template(fieldName) | https://{{connection.environment}}.assemblyai.com |
| retell-ai | Retell AI | account:retell-ai | apiKey | connection.fetch(url, init?), connection.template(fieldName) | https://api.retellai.com/ |
| huggingface | Hugging Face | account:huggingface | apiKey | connection.fetch(url, init?), connection.template(fieldName) | https://router.huggingface.co/ |
| pinecone | Pinecone | account:pinecone | apiKey, indexName | connection.fetch(url, init?), connection.template(fieldName) | https://{{connection.indexName}}.pinecone.io |
| xai | xAI | account:xai | apiKey | connection.fetch(url, init?), connection.template(fieldName) | https://api.x.ai/v1/ |
| stability-ai | Stability AI | account:stability-ai | Organization, apiKey | connection.fetch(url, init?), connection.template(fieldName) | https://api.stability.ai/ |
| exa-ai | Exa | account:exa-ai | apiKey | connection.fetch(url, init?), connection.template(fieldName) | https://api.exa.ai/ |
| azure-openai | Azure OpenAI | account:azure-openai, account:azure-openai2, account:azure-openai2,azure-openai3, account:azure-openai3 | accessToken, azureOpenAiKey, baseUrl, endpoints, isApiKey | connection.fetch(url, init?), connection.template(fieldName) | {{if(connection.isApiKey, connection.baseUrl, connection.endpoints.`Base Endpoint`)}}/openai |
| qdrant | Qdrant | account:qdrant2 | apiKey, qdrantUrl | connection.fetch(url, init?), connection.template(fieldName) | {{connection.qdrantUrl}} |
| qwen-ai | Qwen AI | account:qwen-ai | apiKey | connection.fetch(url, init?), connection.template(fieldName) | https://dashscope-intl.aliyuncs.com/api/v1/ |
| eleven-labs | ElevenLabs | account:eleven-labs | apiKey | connection.fetch(url, init?), connection.template(fieldName) | https://api.elevenlabs.io/ |
| jina-ai | jina.ai | account:jina-ai | apiKey | connection.fetch(url, init?), connection.template(fieldName) | https://r.jina.ai/ |
| dataforseo | DataForSEO | account:dataforseo | password, username | connection.fetch(url, init?), connection.template(fieldName) | https://api.dataforseo.com/v3/ |
| gitlab | GitLab | account:gitlab3, account:gitlab3,gitlab5, account:gitlab5 | accessToken, domain, privateToken | connection.fetch(url, init?), connection.template(fieldName) | https://{{ifempty(connection.domain, 'gitlab.com')}}/api/v4/ |
| confluence | Confluence | account:confluence | accessToken, cloudid | connection.fetch(url, init?), connection.template(fieldName) | https://api.atlassian.com/ex/confluence/{{connection.cloudid}}/wiki/api/v2 |
| supadata | Supadata | account:supadata | apiKey | connection.fetch(url, init?), connection.template(fieldName) | https://api.supadata.ai/ |
| browser-act | BrowserAct | account:browser-act | apiKey | connection.fetch(url, init?), connection.template(fieldName) | https://api.browseract.com/ |
| brightdata | Bright Data | account:brightdata | apiKey | connection.fetch(url, init?), connection.template(fieldName) | https://api.brightdata.com/ |
| supabase-management | Supabase Management | account:supabase-management | apiKey | connection.fetch(url, init?), connection.template(fieldName) | https://api.supabase.com/ |
| together-ai | Together AI | account:together-ai | apiKey | connection.fetch(url, init?), connection.template(fieldName) | https://api.together.xyz/v1/ |
| azure-ai-foundry | Azure AI Foundry | account:azure-ai-foundry | AIservices, apiKey | connection.fetch(url, init?), connection.template(fieldName) | {{first(split(connection.AIservices,'cognitiveservices.'))}} |
