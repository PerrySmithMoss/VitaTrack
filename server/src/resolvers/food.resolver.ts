import {
  Arg,
  Ctx,
  Field,
  Float,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Food } from "../entities/food.entity";
import deserializeUser from "../middleware/deserializeUser";
import { PrismaContext } from "../types/PrismaContext";

@ObjectType()
class FoodFieldError {
  @Field()
  field!: string;

  @Field()
  message!: string;
}

@ObjectType()
class FoodResponseIterable {
  @Field(() => [FoodFieldError], { nullable: true })
  errors?: FoodFieldError[];

  @Field(() => [Food], { nullable: true })
  data?: Food[];
}

@ObjectType()
class FoodResponse {
  @Field(() => [FoodFieldError], { nullable: true })
  errors?: FoodFieldError[];

  @Field(() => Food, { nullable: true })
  data?: Food;
}

@InputType()
class FoodInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  mealName: string;

  @Field(() => Float)
  quantity: number;

  @Field(() => Int, { nullable: true })
  calories: number | null;

  @Field(() => Float, { nullable: true })
  protein: number | null;

  @Field(() => Float, { nullable: true })
  fat: number | null;

  @Field(() => Float, { nullable: true })
  carbohydrate: number | null;

  @Field(() => Float, { nullable: true })
  sugar: number | null;
}

@Resolver()
export class FoodResolver {
  @Mutation(() => FoodResponse)
  @UseMiddleware(deserializeUser)
  async addFood(
    @Ctx() ctx: PrismaContext,
    @Arg("nutritionId", () => Int) nutritionId: number,
    @Arg("foodInput", () => FoodInput)
    foodInput: FoodInput
  ) {
    try {
      const userId = ctx.res.locals.user.id;

      if (!userId) {
        return {
          errors: [
            {
              field: "Bad Request",
              message: "You must login to see this resourse.",
            },
          ],
        };
      }

      // Check if the user has a food entry for the specified date range
      const foodEntry = await ctx.prisma.food.findFirst({
        where: {
          AND: [
            {
              name: foodInput.name,
            },
            {
              mealName: foodInput.mealName,
            },
          ],
        },
      });

      let food;

      if (foodEntry) {
        food = await ctx.prisma.food.update({
          data: {
            name: foodInput.name,
            mealName: foodInput.mealName,
            calories: foodInput.calories,
            protein: foodInput.protein,
            fat: foodInput.fat,
            carbohydrate: foodInput.carbohydrate,
            sugar: foodInput.sugar,
            quantity: foodInput.quantity,
            nutrition: {
              connect: {
                id: nutritionId,
              },
            },
            user: {
              connect: {
                id: userId,
              },
            },
          },
          where: {
            id: foodEntry.id,
          },
        });
      } else {
        food = await ctx.prisma.food.create({
          data: {
            name: foodInput.name,
            mealName: foodInput.mealName,
            calories: foodInput.calories,
            protein: foodInput.protein,
            fat: foodInput.fat,
            carbohydrate: foodInput.carbohydrate,
            sugar: foodInput.sugar,
            quantity: foodInput.quantity,
            nutrition: {
              connect: {
                id: nutritionId,
              },
            },
            user: {
              connect: {
                id: userId,
              },
            },
          },
        });
      }

      return {
        data: food,
      };
    } catch (err) {
      return {
        errors: [
          {
            field: "Error while trying to add food to diary.",
            message: err,
          },
        ],
      };
    }
  }

  @Query(() => FoodResponseIterable)
  @UseMiddleware(deserializeUser)
  async getCurrentUsersFoodByDate(
    @Ctx() ctx: PrismaContext,
    @Arg("date", () => Date, { nullable: true }) date: Date | null
  ) {
    try {
      const userId = ctx.res.locals.user.id;

      if (!userId) {
        return {
          errors: [
            {
              field: "Bad Request",
              message: "You must login to see this resourse.",
            },
          ],
        };
      }

      let usersFood;

      if (date == null) {
        // Fetch any food entries for the current date
        let startOfDay = new Date();
        startOfDay.setHours(1, 0, 0, 0);

        let endOfDay = new Date();
        endOfDay.setHours(24, 59, 59, 999);

        usersFood = await ctx.prisma.food.findMany({
          where: {
            AND: [
              {
                userId: userId,
              },
              {
                createdAt: {
                  lte: endOfDay,
                  gte: startOfDay,
                },
              },
            ],
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      } else {
        // Fetch food entries for the specified day
        let startOfDay = new Date(date);
        startOfDay.setHours(1, 0, 0, 0);

        let endOfDay = new Date(date);
        endOfDay.setHours(24, 59, 59, 999);

        usersFood = await ctx.prisma.food.findMany({
          where: {
            AND: [
              {
                userId: userId,
              },
              {
                createdAt: {
                  lte: endOfDay,
                  gte: startOfDay,
                },
              },
            ],
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      }

      return {
        data: usersFood,
      };
    } catch (err) {
      return {
        errors: [
          {
            field: "Error while trying to fetch user's nutrition.",
            message: err,
          },
        ],
      };
    }
  }
}
