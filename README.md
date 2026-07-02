# Connected Code helpers

Helper documentation and examples for Make Connected Code.

- [Connection reference](docs/connection-reference.md) explains the `connection` capability, relative `connection.fetch(...)`, supported connection types, request bases, and native SQL/Email helpers.
- [Examples](examples/) contains small JavaScript snippets for common HTTP, OAuth, SQL, Baserow, and Cerebras patterns.

Connected Code keeps secrets in the Make connection/keychain and proxy sandbox. Prefer relative `connection.fetch('/path', { query, json, headers })`, `connection.sql.query(...)`, and `connection.email.*` over passing hostnames, tokens, or passwords in user code.
