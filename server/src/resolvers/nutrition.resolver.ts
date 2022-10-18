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
import { Nutrition } from "../entities/nutrition.entity";
import deserializeUser from "../middleware/deserializeUser";
import { PrismaContext } from "../types/PrismaContext";

@ObjectType()
class NutritionFieldError {
  @Field()
  field!: string;

  @Field()
  message!: string;
}

@ObjectType()
class NutritionResponseIterable {
  @Field(() => [NutritionFieldError], { nullable: true })
  errors?: NutritionFieldError[];

  @Field(() => [Nutrition], { nullable: true })
  data?: Nutrition[];
}

@ObjectType()
class NutritionResponse {
  @Field(() => [NutritionFieldError], { nullable: true })
  errors?: NutritionFieldError[];

  @Field(() => Nutrition, { nullable: true })
  data?: Nutrition;
}

@InputType()
class NutritionInput {
  @Field(() => Date)
  date: Date;

  @Field(() => Int, { nullable: true })
  calories: number | null;

  @Field(() => Int, { nullable: true })
  protein: number | null;

  @Field(() => Int, { nullable: true })
  fat: number | null;

  @Field(() => Int, { nullable: true })
  carbohydrate: number | null;
}

@InputType()
class FoodsInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  mealName: string;

  @Field(() => String)
  servingSize: string;

  @Field(() => Float)
  numOfServings: number;

  @Field(() => Int)
  calories: number;

  @Field(() => Float)
  protein: number;

  @Field(() => Float)
  fat: number;

  @Field(() => Float)
  carbohydrate: number;

  @Field(() => Float)
  sugar: number;

  @Field(() => Float)
  sodium: number;
}

@Resolver()
export class NutritionResolver {
  @Mutation(() => NutritionResponse)
  @UseMiddleware(deserializeUser)
  async addNutrition(
    @Ctx() ctx: PrismaContext,
    @Arg("nutritionInput", () => NutritionInput)
    nutritionInput: NutritionInput
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

      const usersCalories = await ctx.prisma.goals.findUniqueOrThrow({
        where: {
          userId: userId,
        },
        select: {
          calories: true,
        },
      });

      let startOfDay = new Date(nutritionInput.date);
      startOfDay.setHours(1, 0, 0, 0);

      let endOfDay = new Date(nutritionInput.date);
      endOfDay.setHours(24, 59, 59, 999);

      // Check if the user has a nutrition entry for the specified date range
      const nutritionEntry = await ctx.prisma.nutrition.findFirst({
        where: {
          date: {
            lte: endOfDay,
            gte: startOfDay,
          },
        },
      });

      let nutrition;

      if (nutritionEntry) {
        nutrition = await ctx.prisma.nutrition.update({
          data: {
            date: nutritionInput.date,
            calories:
              nutritionInput.calories == null
                ? usersCalories.calories
                : nutritionInput.calories,
            protein: nutritionInput.protein,
            fat: nutritionInput.fat,
            carbohydrate: nutritionInput.carbohydrate,
            user: {
              connect: {
                id: userId,
              },
            },
          },
          where: {
            id: nutritionEntry.id,
          },
        });
      } else {
        nutrition = await ctx.prisma.nutrition.create({
          data: {
            date: nutritionInput.date,
            calories:
              nutritionInput.calories == null
                ? usersCalories.calories
                : nutritionInput.calories,
            protein: nutritionInput.protein,
            fat: nutritionInput.fat,
            carbohydrate: nutritionInput.carbohydrate,
            user: {
              connect: {
                id: userId,
              },
            },
          },
        });
      }

      return {
        data: nutrition,
      };
    } catch (err) {
      return {
        errors: [
          {
            field: "Error while trying to log user out.",
            message: err,
          },
        ],
      };
    }
  }

  @Mutation(() => NutritionResponse)
  @UseMiddleware(deserializeUser)
  async addNutritionWithFood(
    @Ctx() ctx: PrismaContext,
    @Arg("nutritionInput", () => NutritionInput)
    nutritionInput: NutritionInput,
    @Arg("foods", () => FoodsInput)
    foodsInput: FoodsInput
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

      let startOfDay = new Date(nutritionInput.date);
      startOfDay.setHours(1, 0, 0, 0);

      let endOfDay = new Date(nutritionInput.date);
      endOfDay.setHours(24, 59, 59, 999);

      // Check if the user has a nutrition entry for the specified date range
      const nutritionEntry = await ctx.prisma.nutrition.findFirst({
        where: {
          date: {
            lte: endOfDay,
            gte: startOfDay,
          },
        },
      });

      let nutrition;
      if (nutritionEntry) {
        nutrition = await ctx.prisma.nutrition.update({
          data: {
            date: nutritionInput.date,
            calories: nutritionInput.calories,
            protein: nutritionInput.protein,
            fat: nutritionInput.fat,
            carbohydrate: nutritionInput.carbohydrate,
            user: {
              connect: {
                id: userId,
              },
            },
          },
          where: {
            id: nutritionEntry.id,
          },
        });
      } else {
        nutrition = await ctx.prisma.nutrition.create({
          data: {
            date: nutritionInput.date,
            calories: nutritionInput.calories,
            protein: nutritionInput.protein,
            fat: nutritionInput.fat,
            carbohydrate: nutritionInput.carbohydrate,
            user: {
              connect: {
                id: userId,
              },
            },
          },
        });
      }

      let food;
      if (nutrition) {
        food = await ctx.prisma.food.create({
          data: {
            name: foodsInput.name,
            mealName: foodsInput.mealName,
            servingSize: foodsInput.servingSize,
            numOfServings: foodsInput.numOfServings,
            calories: foodsInput.calories,
            protein: foodsInput.protein,
            fat: foodsInput.fat,
            carbohydrate: foodsInput.carbohydrate,
            sugar: foodsInput.sugar,
            sodium: foodsInput.sodium,
            nutritionId: nutrition.id,
            userId: userId,
          },
        });
      }

      const updatedNutrition = await ctx.prisma.nutrition.findUnique({
        where: {
          id: nutrition.id,
        },
        include: {
          foods: true,
        },
      });

      if (updatedNutrition) {
        return {
          data: updatedNutrition,
        };
      } else {
        return {
          errors: [
            {
              field: "Nutrition entry",
              message: "Error while trying to fetch updated nutrition entry.",
            },
          ],
        };
      }
    } catch (err) {
      return {
        errors: [
          {
            field: "Error while trying to log user out.",
            message: err,
          },
        ],
      };
    }
  }

  @Mutation(() => NutritionResponse)
  @UseMiddleware(deserializeUser)
  async addNutritionWithFoods(
    @Ctx() ctx: PrismaContext,
    @Arg("nutritionInput", () => NutritionInput)
    nutritionInput: NutritionInput,
    @Arg("foods", () => [FoodsInput])
    foodsInput: FoodsInput[]
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

      let startOfDay = new Date(nutritionInput.date);
      startOfDay.setHours(1, 0, 0, 0);

      let endOfDay = new Date(nutritionInput.date);
      endOfDay.setHours(24, 59, 59, 999);

      // Check if the user has a nutrition entry for the specified date range
      const nutritionEntry = await ctx.prisma.nutrition.findFirst({
        where: {
          date: {
            lte: endOfDay,
            gte: startOfDay,
          },
        },
      });

      let nutrition: {
        id: any;
        createdAt?: Date;
        updatedAt?: Date;
        date?: Date;
        calories?: number | null;
        protein?: number | null;
        fat?: number | null;
        carbohydrate?: number | null;
        userId?: string;
      };
      if (nutritionEntry) {
        nutrition = await ctx.prisma.nutrition.update({
          data: {
            date: nutritionInput.date,
            calories: nutritionInput.calories,
            protein: nutritionInput.protein,
            fat: nutritionInput.fat,
            carbohydrate: nutritionInput.carbohydrate,
            user: {
              connect: {
                id: userId,
              },
            },
          },
          where: {
            id: nutritionEntry.id,
          },
        });
      } else {
        nutrition = await ctx.prisma.nutrition.create({
          data: {
            date: nutritionInput.date,
            calories: nutritionInput.calories,
            protein: nutritionInput.protein,
            fat: nutritionInput.fat,
            carbohydrate: nutritionInput.carbohydrate,
            user: {
              connect: {
                id: userId,
              },
            },
          },
        });
      }

      if (nutrition) {
        const foods = await ctx.prisma.$transaction(
          foodsInput.map((food) =>
            ctx.prisma.food.create({
              data: {
                name: food.name,
                mealName: food.mealName,
                servingSize: food.servingSize,
                numOfServings: food.numOfServings,
                calories: food.calories,
                protein: food.protein,
                fat: food.fat,
                carbohydrate: food.carbohydrate,
                sugar: food.sugar,
                sodium: food.sodium,
                nutritionId: nutrition.id,
                userId: userId,
              },
            })
          )
        );
      }

      const updatedNutrition = await ctx.prisma.nutrition.findUnique({
        where: {
          id: nutrition.id,
        },
        include: {
          foods: true,
        },
      });

      if (updatedNutrition) {
        return {
          data: updatedNutrition,
        };
      } else {
        return {
          errors: [
            {
              field: "Nutrition entry",
              message: "Error while trying to fetch updated nutrition entry.",
            },
          ],
        };
      }
    } catch (err) {
      return {
        errors: [
          {
            field: "Error while trying to log user out.",
            message: err,
          },
        ],
      };
    }
  }

  @Query(() => NutritionResponseIterable)
  @UseMiddleware(deserializeUser)
  async getCurrentUsersNutrition(@Ctx() ctx: PrismaContext) {
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

      const usersNutrition = await ctx.prisma.nutrition.findMany({
        where: {
          userId: userId,
        },
        orderBy: {
          date: "desc",
        },
      });

      return {
        data: usersNutrition,
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

  @Query(() => NutritionResponse)
  @UseMiddleware(deserializeUser)
  async getCurrentUsersNutritionByDate(
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

      let usersNutrition;

      if (date == null) {
        // Fetch any nutrition entries for the current date
        let startOfDay = new Date();
        startOfDay.setHours(1, 0, 0, 0);

        let endOfDay = new Date();
        endOfDay.setHours(24, 59, 59, 999);

        usersNutrition = await ctx.prisma.nutrition.findFirst({
          where: {
            AND: [
              {
                userId: userId,
              },
              {
                date: {
                  lte: endOfDay,
                  gte: startOfDay,
                },
              },
            ],
          },
          orderBy: {
            date: "desc",
          },
        });
      } else {
        // Fetch nutrition entry for the specified day
        let startOfDay = new Date(date);
        startOfDay.setHours(1, 0, 0, 0);

        let endOfDay = new Date(date);
        endOfDay.setHours(24, 59, 59, 999);

        usersNutrition = await ctx.prisma.nutrition.findFirst({
          where: {
            AND: [
              {
                userId: userId,
              },
              {
                date: {
                  lte: endOfDay,
                  gte: startOfDay,
                },
              },
            ],
          },
          orderBy: {
            date: "desc",
          },
        });
      }

      return {
        data: usersNutrition,
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
