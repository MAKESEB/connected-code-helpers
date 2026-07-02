# Connected Code helpers

Helper documentation and examples for Make Connected Code.

- [Connection reference](docs/connection-reference.md) explains the `connection` capability, relative `connection.fetch(...)`, supported connection types, request bases, and native SQL/Email helpers.
- [Examples](examples/) contains small JavaScript snippets for HTTP, OAuth, SQL, Email, Baserow, and Cerebras patterns.

Current reference is synced to the Connected Code catalog with 157 apps.

Connected Code keeps secrets in the Make connection/keychain and proxy sandbox. Prefer relative `connection.fetch('/path', { query, json, headers })`, `connection.sql.query(...)`, and `connection.email.*` over passing hostnames, tokens, passwords, or connection strings in user code. Use `connection.template(fieldName)` only for rare custom placement, such as an API that requires a bearer prefix in a header not already modeled by the selected credential.
