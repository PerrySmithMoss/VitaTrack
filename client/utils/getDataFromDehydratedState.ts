// Function which returns the data wich matches the passed in 'key' param
export function getDataFromDehydratedState(key: string, dehydratedState: any) {
  const obj = dehydratedState.queries.find(
    (obj: any) => obj.queryKey[0] === key
  );

  return obj.state.data;
}
