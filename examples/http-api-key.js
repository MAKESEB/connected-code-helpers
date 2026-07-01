// HTTP App with API Key Auth Connection.
// Set HTTP Base URL in the module UI. Secrets stay in the HTTP keychain/proxy.
const response = await connection.fetch('https://api.example.com/v1/items', { method: 'GET' });
const text = await response.text();
if (!response.ok) throw new Error(`HTTP request failed ${response.status}: ${text}`);
return JSON.parse(text);
