export function customFetcher<TData, TVariables>(
  query: string,
  variables?: TVariables,
  headers?: RequestInit['headers'] | undefined
) {
  return async (): Promise<TData> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/graphql/`, {
      method: 'POST',
      ...{
        headers: {
          ...headers,
          'Apollo-Require-Preflight': 'true',
          'Content-Type': 'application/json',
          'Accept'      : `application/json`
        },
        credentials: 'include',
      },
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  };
}
