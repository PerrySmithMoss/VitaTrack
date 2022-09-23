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
import { Goals } from "../entities/goals.entity";
import deserializeUser from "../middleware/deserializeUser";
import { PrismaContext } from "../types/PrismaContext";

@ObjectType()
class GoalsFieldError {
  @Field()
  field!: string;

  @Field()
  message!: string;
}

@ObjectType()
class GoalsResponse {
  @Field(() => [GoalsFieldError], { nullable: true })
  errors?: GoalsFieldError[];

  @Field(() => Goals, { nullable: true })
  data?: Goals;
}

@InputType()
class GoalsInput {
  @Field(() => Float, { nullable: true })
  startingWeight: number;

  @Field(() => Float, { nullable: true })
  currentWeight: number;

  @Field(() => Float, { nullable: true })
  goalWeight: number;

  @Field(() => Int, { nullable: true })
  calories: number;

  @Field(() => Int, { nullable: true })
  protein: number;

  @Field(() => Int, { nullable: true })
  fat: number;

  @Field(() => Int, { nullable: true })
  carbohydrate: number;
}

@Resolver()
export class GoalsResolver {
  @Query(() => GoalsResponse)
  @UseMiddleware(deserializeUser)
  // The error which is returned from this middleware
  // is causing issues on front-end
  // @UseMiddleware(requireUser)
  async getCurrentUsersGoals(@Ctx() ctx: PrismaContext) {
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

      const usersGoals = await ctx.prisma.goals.findUnique({
        where: {
          userId: userId,
        },
      });

      return {
        data: usersGoals,
      };
    } catch (err) {
      return {
        errors: [
          {
            field: "Error while trying to fetch user's goals.",
            message: err,
          },
        ],
      };
    }
  }

  @Mutation(() => GoalsResponse)
  @UseMiddleware(deserializeUser)
  async upsertUserGoals(
    @Ctx() ctx: PrismaContext,
    @Arg("goalsInput", () => GoalsInput)
    goalsInput: GoalsInput
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

      const goals = ctx.prisma.goals.upsert({
        where: {
          userId,
        },
        create: {
          userId,
          startingWeight: goalsInput.startingWeight,
          currentWeight: goalsInput.currentWeight,
          goalWeight: goalsInput.goalWeight,
          calories: goalsInput.calories,
          protein: goalsInput.protein,
          fat: goalsInput.fat,
          carbohydrate: goalsInput.carbohydrate,
        },
        update: {
          startingWeight: goalsInput.startingWeight,
          currentWeight: goalsInput.currentWeight,
          goalWeight: goalsInput.goalWeight,
          calories: goalsInput.calories,
          protein: goalsInput.protein,
          fat: goalsInput.fat,
          carbohydrate: goalsInput.carbohydrate,
        },
      });

      return {
        data: goals,
      };
    } catch (err: any) {
      return {
        errors: [
          {
            field: "error",
            message: err,
          },
        ],
      };
    }
  }
}
