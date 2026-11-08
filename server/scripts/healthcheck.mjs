// The entrypoint runs migrations before starting GraphQL.
const port = process.env.PORT || 5500;
const response = await fetch('http://127.0.0.1:' + port + '/graphql', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ query: '{ __typename }' }),
}).catch(() => undefined);

if (!response?.ok) {
  process.exit(1);
}

const result = await response.json().catch(() => undefined);
if (result?.data?.__typename !== 'Query' || result.errors) {
  process.exitCode = 1;
}
