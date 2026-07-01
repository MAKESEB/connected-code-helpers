// HTTP App with API Key Auth Connection, manual header placement.
const response = await connection.fetch('https://api.example.com/v1/items', {
  method: 'GET',
  headers: { 'x-api-key': connection.template('key') }
});
return { status: response.status, body: await response.text() };
