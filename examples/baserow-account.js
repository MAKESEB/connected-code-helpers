// Baserow: selected App = Baserow, selected connection = your Baserow connection.
// Use a relative path. Connected Code derives the Baserow base URL and auth from the connection.
const response = await connection.fetch('/api/user/account/', { method: 'GET' });
const text = await response.text();
if (!response.ok) throw new Error(`Baserow request failed ${response.status}: ${text}`);
return JSON.parse(text);
