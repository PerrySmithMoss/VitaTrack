const fetchUpstream = globalThis.fetch;
const banana = {
  fdcId: 2709224,
  dataType: "Survey (FNDDS)",
  description: "Banana, raw",
  foodNutrients: [
    [1008, 89], [1003, 1.09], [1004, 0.33], [1005, 22.84], [2000, 12.23], [1093, 1],
  ].map(([id, amount]) => ({ nutrient: { id }, amount })),
  foodPortions: [
    { portionDescription: "1 banana", gramWeight: 126 },
    { portionDescription: "Quantity not specified", gramWeight: 126 },
  ],
};

globalThis.fetch = async (input, options) => {
  const url = new URL(input instanceof Request ? input.url : input);
  if (url.origin !== "https://api.nal.usda.gov") {
    return fetchUpstream(input, options);
  }
  if (url.searchParams.get("api_key") !== "fixture-usda-key" || options?.redirect !== "error") {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
  if (url.pathname === "/fdc/v1/foods/search" && options.method === "POST") {
    const { query, dataType } = JSON.parse(options.body);
    if (dataType.length !== 1 || dataType[0] !== banana.dataType) {
      return Response.json({ message: "Expected a Survey Foods search" }, { status: 400 });
    }
    if (query === "rate limit") {
      return Response.json({ message: "Provider response", id: "private-provider-id" }, { status: 429 });
    }
    return Response.json({ foods: query === "banana" ? [banana] : [] });
  }
  if (url.pathname === `/fdc/v1/food/${banana.fdcId}`) return Response.json(banana);
  return Response.json({ message: "Not found" }, { status: 404 });
};
