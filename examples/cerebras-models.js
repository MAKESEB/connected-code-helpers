// Cerebras AI: selected App = Cerebras AI, selected connection = your Cerebras AI connection.
const response = await connection.fetch('https://api.cerebras.ai/v1/models', { method: 'GET' });
const text = await response.text();
if (!response.ok) throw new Error(`Cerebras request failed ${response.status}: ${text}`);
const data = JSON.parse(text);
return { modelCount: data.data?.length ?? 0, firstModel: data.data?.[0]?.id ?? null };
