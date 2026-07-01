// Baserow: selected App = Baserow, selected connection = your Baserow connection.
const baseUrl = connection.template('apiURL').replace(/\/$/, '');
const response = await connection.fetch(`${baseUrl}/api/user/account/`, { method: 'GET' });
const text = await response.text();
if (!response.ok) throw new Error(`Baserow request failed ${response.status}: ${text}`);
return JSON.parse(text);
