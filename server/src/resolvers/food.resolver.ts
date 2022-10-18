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

@ObjectType()
class FoodResponseSimple {
  @Field(() => [FoodFieldError], { nullable: true })
  errors?: FoodFieldError[];

  @Field(() => String, { nullable: true })
  data?: String;
}

@ObjectType()
class FoodResponseSuccess {
  @Field(() => [FoodFieldError], { nullable: true })
  errors?: FoodFieldError[];

  @Field(() => String, { nullable: true })
  message!: string;
}

@InputType()
class FoodInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  mealName: string;

  @Field(() => Float)
  numOfServings: number;

  @Field(() => String)
  servingSize: string;

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
export class FoodResolver {
  @Mutation(() => FoodResponse)
  @UseMiddleware(deserializeUser)
  async addFood(
    @Ctx() ctx: PrismaContext,
    @Arg("nutritionId", () => Int) nutritionId: number,
    @Arg("date", () => Date) date: Date,
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

      let foodEntry;

      if (date == null) {
        // Fetch any food entries for the current date
        let startOfDay = new Date();
        startOfDay.setHours(1, 0, 0, 0);

        let endOfDay = new Date();
        endOfDay.setHours(24, 59, 59, 999);

        foodEntry = await ctx.prisma.food.findFirst({
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
              {
                name: foodInput.name,
              },
              {
                mealName: foodInput.mealName,
              },
            ],
          },
          orderBy: {
            createdAt: "asc",
          },
        });
      } else {
        // Fetch food entries for the specified day
        let startOfDay = new Date(date);
        startOfDay.setHours(1, 0, 0, 0);

        let endOfDay = new Date(date);
        endOfDay.setHours(24, 59, 59, 999);

        // Check if the user has a food entry for the specified date range
        foodEntry = await ctx.prisma.food.findFirst({
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
              {
                name: foodInput.name,
              },
              {
                mealName: foodInput.mealName,
              },
            ],
          },
        });
      }

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
            numOfServings: foodInput.numOfServings,
            servingSize: foodInput.servingSize,
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
            createdAt: date,
            mealName: foodInput.mealName,
            calories: foodInput.calories,
            protein: foodInput.protein,
            fat: foodInput.fat,
            carbohydrate: foodInput.carbohydrate,
            sugar: foodInput.sugar,
            sodium: foodInput.sodium,
            numOfServings: foodInput.numOfServings,
            servingSize: foodInput.servingSize,
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

  @Mutation(() => FoodResponseSimple)
  @UseMiddleware(deserializeUser)
  async addFoodsv2(
    @Ctx() ctx: PrismaContext,
    @Arg("nutritionId", () => Int) nutritionId: number,
    @Arg("foodInput", () => [FoodInput])
    foodInput: FoodInput[]
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

      const foods = await ctx.prisma.$transaction(
        foodInput.map((food) =>
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
          })
        )
      );

      return {
        data: "Foods logged successfully.",
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
  async getCurrentUsersFood(@Ctx() ctx: PrismaContext) {
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

      const usersFood = await ctx.prisma.food.findMany({
        where: {
          userId: userId,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      return {
        data: usersFood,
      };
    } catch (err) {
      return {
        errors: [
          {
            field: "Error while trying to fetch user's food.",
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
            createdAt: "asc",
          },
        });
      } else {
        // Fetch food entries for the specified day
        // const startOfDay = new Date(date);
        // const startOfTheDay = date.setHours(1, 0, 0, 0);
        const startDate = new Date(date); // 2013-07-30 17:11:00
        const startOfDayDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate(),
          0,
          0,
          0
        );

        // const endOfDay = new Date(date);
        // const endOfTheDay = date.setHours(24, 59, 59, 999);
        const endDate = new Date(date);
        const endOfDayDate = new Date(
          endDate.getFullYear(),
          endDate.getMonth(),
          endDate.getDate(),
          23,
          59,
          59
        );

        usersFood = await ctx.prisma.food.findMany({
          where: {
            AND: [
              {
                userId: userId,
              },
              {
                createdAt: {
                  lte: endOfDayDate,
                  gte: startOfDayDate,
                },
              },
            ],
          },
          orderBy: {
            createdAt: "asc",
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
            field: "Error while trying to fetch user's food.",
            message: err,
          },
        ],
      };
    }
  }

  @Query(() => Int)
  @UseMiddleware(deserializeUser)
  async getCurrentUsersRemainingCaloriesByDate(
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

      let remainingCalories;
      if (date == null) {
        // Fetch any food entries for the current date
        let startOfDay = new Date();
        startOfDay.setHours(1, 0, 0, 0);

        let endOfDay = new Date();
        endOfDay.setHours(24, 59, 59, 999);

        const usersFood = await ctx.prisma.food.findMany({
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
          select: {
            calories: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        });

        const caloriesConsumed = usersFood.reduce((acc, curr) => {
          return (acc += curr.calories);
        }, 0);

        const usersCaloricGoals = await ctx.prisma.goals.findUnique({
          where: {
            userId: userId,
          },
          select: {
            calories: true
          }
        });

        remainingCalories = (usersCaloricGoals?.calories as number) - caloriesConsumed
      } else {
        // Fetch food entries for the specified day
        const startDate = new Date(date); 
        const startOfDayDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate(),
          0,
          0,
          0
        );

        const endDate = new Date(date);
        const endOfDayDate = new Date(
          endDate.getFullYear(),
          endDate.getMonth(),
          endDate.getDate(),
          23,
          59,
          59
        );

        const usersFood = await ctx.prisma.food.findMany({
          where: {
            AND: [
              {
                userId: userId,
              },
              {
                createdAt: {
                  lte: endOfDayDate,
                  gte: startOfDayDate,
                },
              },
            ],
          },
          select: {
            calories: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        });

        const caloriesConsumed = usersFood.reduce((acc, curr) => {
          return (acc += curr.calories);
        }, 0);

        const usersCaloricGoals = await ctx.prisma.goals.findUnique({
          where: {
            userId: userId,
          },
          select: {
            calories: true
          }
        });

        remainingCalories = (usersCaloricGoals?.calories as number) - caloriesConsumed
      }

      return remainingCalories;
    } catch (err) {
      return {
        errors: [
          {
            field: "Error while trying to fetch user's food.",
            message: err,
          },
        ],
      };
    }
  }

  @Mutation(() => FoodResponseSuccess)
  @UseMiddleware(deserializeUser)
  async deleteFoodFromMealByDate(
    @Ctx() ctx: PrismaContext,
    @Arg("foodId", () => Int) foodId: number,
    @Arg("mealName", () => String) mealName: string,
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

      let foodItem;

      if (date == null) {
        const startDate = new Date();
        const startOfDayDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate(),
          0,
          0,
          0
        );

        const endDate = new Date();
        const endOfDayDate = new Date(
          endDate.getFullYear(),
          endDate.getMonth(),
          endDate.getDate(),
          23,
          59,
          59
        );

        foodItem = await ctx.prisma.food.findFirst({
          where: {
            AND: [
              {
                userId: userId,
              },
              {
                createdAt: {
                  lte: endOfDayDate,
                  gte: startOfDayDate,
                },
              },
              {
                mealName: mealName,
              },
              {
                id: foodId,
              },
            ],
          },
          orderBy: {
            createdAt: "asc",
          },
        });
      } else {
        const startDate = new Date(date);
        const startOfDayDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate(),
          0,
          0,
          0
        );

        const endDate = new Date(date);
        const endOfDayDate = new Date(
          endDate.getFullYear(),
          endDate.getMonth(),
          endDate.getDate(),
          23,
          59,
          59
        );

        foodItem = await ctx.prisma.food.findFirst({
          where: {
            AND: [
              {
                userId: userId,
              },
              {
                createdAt: {
                  lte: endOfDayDate,
                  gte: startOfDayDate,
                },
              },
              {
                mealName: mealName,
              },
              {
                id: foodId,
              },
            ],
          },
          orderBy: {
            createdAt: "asc",
          },
        });
      }

      if (foodItem) {
        await ctx.prisma.food.delete({
          where: {
            id: foodItem.id,
          },
        });
        return {
          message: "Successfully deleted food item.",
        };
      } else {
        return {
          errors: [
            {
              field: `Food ID`,
              message: `Error while trying to delete food item with ID ${foodId}`,
            },
          ],
        };
      }
    } catch (err) {
      return {
        errors: [
          {
            field: "Error while trying to delete food item.",
            message: err,
          },
        ],
      };
    }
  }
}
