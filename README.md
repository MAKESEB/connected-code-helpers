# Connected Code helpers

Helper documentation and examples for Make Connected Code.

- [Connection reference](docs/connection-reference.md) lists generated app connection types, known `connection.*` fields referenced by catalog policies, and available helpers.
- [Examples](examples/) contains small JavaScript snippets for common HTTP, OAuth, SQL, Baserow, and Cerebras patterns.

Connected Code keeps secrets in the Make connection/keychain and proxy sandbox. Prefer `connection.fetch(...)`, `connection.sql.query(...)`, and `connection.email.*` helpers over passing hostnames, tokens, or passwords in user code.
