// Microsoft OAuth-style app: selected App = Microsoft Email/Excel/Calendar/etc.
const response = await connection.fetch('https://graph.microsoft.com/v1.0/me', { method: 'GET' });
const text = await response.text();
if (!response.ok) throw new Error(`Microsoft Graph request failed ${response.status}: ${text}`);
return JSON.parse(text);
