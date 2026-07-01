// Google OAuth-style app: selected App = a Google app such as Google Sheets/Drive/Gmail.
const response = await connection.fetch('https://www.googleapis.com/drive/v3/files?pageSize=10', { method: 'GET' });
const text = await response.text();
if (!response.ok) throw new Error(`Google request failed ${response.status}: ${text}`);
return JSON.parse(text);
