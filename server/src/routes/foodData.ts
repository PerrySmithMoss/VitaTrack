import type { Request, Response } from "express";
import { config } from "../config/config";
import { deserializeSession } from "../middleware/deserializeUser";

const base = "https://api.nal.usda.gov/fdc/v1/";
const surveyFoods = "Survey (FNDDS)";
const nutrientIds = {
  calories: 1008,
  protein: 1003,
  fat: 1004,
  carbohydrate: 1005,
  sugar: 2000,
  sodium: 1093,
} as const;

type SearchMatch = { fdcId: number; description: string };
type FoodDetails = SearchMatch & {
  dataType: string;
  foodNutrients?: Array<{ nutrient?: { id?: number }; amount?: number }>;
  foodPortions?: Array<{ portionDescription?: string; gramWeight?: number }>;
};

function foodDetails(food: FoodDetails) {
  if (
    !food || food.dataType !== surveyFoods ||
    !Number.isSafeInteger(food.fdcId) || typeof food.description !== "string" ||
    !Array.isArray(food.foodNutrients)
  ) return null;

  const amounts = new Map(food.foodNutrients.map(row => [row?.nutrient?.id, row?.amount]));
  const entries = Object.entries(nutrientIds).map(([name, id]) => [name, amounts.get(id)] as const);
  if (entries.some(([, amount]) => typeof amount !== "number" || !Number.isFinite(amount) || amount < 0)) {
    return null;
  }

  const portions = [{ name: "g", grams: 1 }];
  for (const portion of food.foodPortions ?? []) {
    const { portionDescription: name, gramWeight: grams } = portion;
    if (
      typeof name === "string" && name && name !== "Quantity not specified" &&
      typeof grams === "number" && Number.isFinite(grams) && grams > 0 &&
      !portions.some(option => option.name === name)
    ) {
      portions.push({ name, grams });
    }
  }

  return {
    id: food.fdcId,
    name: food.description,
    nutrientsPer100g: Object.fromEntries(entries),
    portions,
  };
}

export async function foodData(req: Request, res: Response) {
  res.setHeader("Cache-Control", "private, no-store");
  if (!req.is("application/json")) {
    return res.status(415).json({ message: "Expected a JSON request" });
  }

  const { action, value } = req.body ?? {};
  const query = typeof value === "string" ? value.trim() : "";
  const search = action === "search" && query.length >= 2 && query.length <= 120;
  const details = action === "details" && Number.isSafeInteger(value) && value > 0;
  if (!search && !details) {
    return res.status(400).json({ message: "Invalid food lookup" });
  }

  await deserializeSession(req, res);
  if (!res.locals.user) {
    return res.status(401).json({ message: "Sign in to look up foods" });
  }
  if (!config.usdaFdcApiKey) {
    return res.status(503).json({ message: "Food lookup is unavailable" });
  }

  const url = new URL(search ? "foods/search" : `food/${value}`, base);
  url.searchParams.set("api_key", config.usdaFdcApiKey);
  try {
    const response = await fetch(url, {
      ...(search && {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, dataType: [surveyFoods], pageSize: 8 }),
      }),
      signal: AbortSignal.timeout(5000),
      redirect: "error",
    });
    if (!response.ok) {
      console.warn("FoodData Central lookup failed", action, response.status);
      return res.status(502).json({ message: "Food lookup is unavailable" });
    }

    const payload = await response.json();
    if (search && Array.isArray(payload?.foods)) {
      return res.json(payload.foods.flatMap((match: SearchMatch) =>
        Number.isSafeInteger(match?.fdcId) && typeof match.description === "string"
          ? [{ id: match.fdcId, name: match.description }]
          : []
      ));
    }
    const food = search ? null : foodDetails(payload);
    if (!food) return res.status(502).json({ message: "Food details are unavailable" });
    return res.json(food);
  } catch {
    return res.status(502).json({ message: "Food lookup is unavailable" });
  }
}
