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
import { Workout } from "../entities/workout.entity";
import deserializeUser from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { PrismaContext } from "../types/PrismaContext";

@ObjectType()
class WorkoutFieldError {
  @Field()
  field!: string;

  @Field()
  message!: string;
}

@ObjectType()
class WorkoutResponseIterable {
  @Field(() => [WorkoutFieldError], { nullable: true })
  errors?: WorkoutFieldError[];

  @Field(() => [Workout], { nullable: true })
  data?: Workout[];
}
@ObjectType()
class WorkoutResponse {
  @Field(() => [WorkoutFieldError], { nullable: true })
  errors?: WorkoutFieldError[];

  @Field(() => Workout, { nullable: true })
  data?: Workout;
}

@InputType()
class ExercisesInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  category: string;

  @Field(() => String)
  exerciseType: string;

  @Field(() => Boolean, { defaultValue: false })
  unilateral: boolean;

  @Field(() => [StrengthSetInput], { nullable: true })
  strengthSets?: StrengthSetInput[];

  @Field(() => [CardioSetInput], { nullable: true })
  cardioSets?: CardioSetInput[];
}

@InputType()
class StrengthSetInput {
  @Field(() => Int, { defaultValue: 1 })
  setNumber: number;

  @Field(() => String, { nullable: true })
  weight?: string;

  @Field(() => String, { nullable: true })
  reps?: string;

  @Field(() => String, { nullable: true })
  notes?: string;
}

@InputType()
class CardioSetInput {
  @Field(() => Int, { defaultValue: 1 })
  setNumber: number;

  @Field(() => String, { nullable: true })
  minutes?: string;

  @Field(() => String, { nullable: true })
  seconds?: string;

  @Field(() => String, { nullable: true })
  distance?: string;

  @Field(() => String, { nullable: true })
  caloriesBurned?: string;

  @Field(() => String, { nullable: true })
  notes?: string;
}

@Resolver()
export class WorkoutResolver {
  @Query(() => WorkoutResponseIterable)
  @UseMiddleware(deserializeUser)
  // The error which is returned from this middleware
  // is causing issues on front-end
  @UseMiddleware(requireUser)
  async getUsersWorkouts(@Ctx() ctx: PrismaContext) {
    try {
      if (!ctx.res.locals.user) {
        return null;
      }

      const userId = ctx.res.locals.user.id;

      const workouts = await ctx.prisma.workout.findMany({
        where: {
          userId: userId,
        },
        include: {
          exercises: {
            include: {
              strengthSets: true,
              cardioSets: true,
            },
          },
        },
      });

      return {
        data: workouts,
      };
    } catch (err) {
      return {
        errors: [
          {
            field: "Error while trying fetch user's workouts.",
            message: err,
          },
        ],
      };
    }
  }

  @Mutation(() => WorkoutResponse)
  @UseMiddleware(deserializeUser)
  // The error which is returned from this middleware
  // is causing issues on front-end
  @UseMiddleware(requireUser)
  async createWorkout(
    @Ctx() ctx: PrismaContext,
    @Arg("name") name: string,
    @Arg("startTime") startTime: string,
    @Arg("endTime") endTime: string,
    @Arg("bodyweight", () => Float, { nullable: true })
    bodyweight: number | null,
    @Arg("notes", () => String, { nullable: true }) notes: string | null,
    @Arg("exercises", () => [ExercisesInput], { nullable: true })
    exercises: ExercisesInput[]
  ) {
    try {
      if (!ctx.res.locals.user) {
        return {
          errors: [
            {
              field: "Error while trying to create workout.",
              message: "You must be logged in to create a workout.",
            },
          ],
        };
      }

      const userId = ctx.res.locals.user.id;

      let workout = await ctx.prisma.workout.create({
        data: {
          name,
          startTime,
          endTime,
          bodyweight,
          notes,
          userId,
        },
      });

      if (workout && exercises.length > 0) {
        await Promise.all(
          exercises.map((exercise) => {
            if (exercise.exerciseType === "Strength") {
              return ctx.prisma.exercise.create({
                data: {
                  name: exercise.name,
                  category: exercise.category,
                  exerciseType: exercise.exerciseType,
                  unilateral: exercise.unilateral,
                  workout: {
                    connect: {
                      id: workout.id,
                    },
                  },
                  strengthSets: {
                    createMany: {
                      data: exercise.strengthSets as StrengthSetInput[],
                    },
                  },
                },
              });
            } else if (exercise.exerciseType === "Cardio") {
              return ctx.prisma.exercise.create({
                data: {
                  name: exercise.name,
                  category: exercise.category,
                  exerciseType: exercise.exerciseType,
                  unilateral: exercise.unilateral,
                  workout: {
                    connect: {
                      id: workout.id,
                    },
                  },
                  cardioSets: {
                    createMany: {
                      data: exercise.cardioSets as CardioSetInput[],
                    },
                  },
                },
              });
            }
          })
        );
      }

      // Re-fetch the workout after the exercises and sets have been added
      workout = await ctx.prisma.workout.findUniqueOrThrow({
        where: { id: workout.id },
        include: {
          exercises: {
            include: {
              strengthSets: true,
              cardioSets: true,
            },
          },
        },
      });

      if (!workout) {
        return {
          errors: [
            {
              field: "Error while trying to fetch workout.",
              message: "Could not find the specified workout.",
            },
          ],
        };
      }

      return {
        data: workout,
      };
    } catch (err) {
      return {
        errors: [
          {
            field: "Error while trying to create workout.",
            message: err,
          },
        ],
      };
    }
  }
}
