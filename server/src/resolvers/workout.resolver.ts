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
  @Field(() => WorkoutFieldError, { nullable: true })
  errors?: WorkoutFieldError;

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

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  unilateral: boolean;

  @Field(() => [StrengthSetInput], { nullable: true })
  strengthSets?: StrengthSetInput[];

  @Field(() => [CardioSetInput], { nullable: true })
  cardioSets?: CardioSetInput[];
}

@InputType()
class CurrExercisesInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  category: string;

  @Field(() => String)
  exerciseType: string;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  unilateral: boolean;

  @Field(() => [CurrStrengthSet], { nullable: true })
  strengthSets?: CurrStrengthSet[];

  @Field(() => [CurrCardioSet], { nullable: true })
  cardioSets?: CurrCardioSet[];
}

@InputType()
class CurrExercises extends CurrExercisesInput {
  @Field(() => Int, {nullable: true})
  id?: number;
}

@InputType()
class StrengthSetInput {
  @Field(() => Int, { nullable: true, defaultValue: 1 })
  setNumber: number;

  @Field(() => String, { nullable: true })
  weight?: string;

  @Field(() => String, { nullable: true })
  reps?: string;

  @Field(() => String, { nullable: true })
  notes?: string;
}

@InputType()
class CurrStrengthSet extends StrengthSetInput {
  @Field(() => Int , {nullable: true})
  id?: number;
}

@InputType()
class CardioSetInput {
  @Field(() => Int, { nullable: true, defaultValue: 1 })
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

@InputType()
class CurrCardioSet extends CardioSetInput {
  @Field(() => Int , {nullable: true})
  id?: number;
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

  @Query(() => WorkoutResponse)
  @UseMiddleware(deserializeUser)
  @UseMiddleware(requireUser)
  async getUsersWorkoutByDate(
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

      let workout;
      if (date == null) {
        // Fetch any nutrition entries for the current date
        let startOfDay = new Date();
        startOfDay.setHours(1, 0, 0, 0);

        let endOfDay = new Date();
        endOfDay.setHours(24, 59, 59, 999);

        workout = await ctx.prisma.workout.findFirst({
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
          include: {
            exercises: true,
          },
        });
      } else {
        // Fetch nutrition entry for the specified day
        let startOfDay = new Date(date);
        startOfDay.setHours(1, 0, 0, 0);

        let endOfDay = new Date(date);
        endOfDay.setHours(24, 59, 59, 999);

        workout = await ctx.prisma.workout.findFirst({
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
          include: {
            exercises: true,
          },
        });
      }
      return {
        data: workout,
      };
    } catch (err) {
      return {
        errors: [
          {
            field: "Error while trying fetch user's workout.",
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
              field: "Bad Request",
              message: "You must login to see this resourse.",
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

  @Mutation(() => WorkoutResponse)
  @UseMiddleware(deserializeUser)
  // The error which is returned from this middleware
  // is causing issues on front-end
  @UseMiddleware(requireUser)
  async editWorkout(
    @Ctx() ctx: PrismaContext,
    @Arg("workoutId") workoutId: number,
    @Arg("name") name: string,
    @Arg("startTime") startTime: string,
    @Arg("endTime") endTime: string,
    @Arg("bodyweight", () => Float, { nullable: true })
    bodyweight: number | null,
    @Arg("notes", () => String, { nullable: true }) notes: string | null,
    @Arg("exercises", () => [CurrExercises], { nullable: true })
    exercises: CurrExercises[]
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

      return await ctx.prisma.$transaction(async (prisma) => {
        const workout = await prisma.workout.update({
          data: { name, startTime, endTime, bodyweight, notes },
          where: { id: workoutId, userId },
        });

        for (const exercise of exercises ?? []) {
          const details = {
            name: exercise.name,
            category: exercise.category,
            exerciseType: exercise.exerciseType,
            unilateral: exercise.unilateral,
          };
          const where = { id: exercise.id, workoutId: workout.id };

          if (exercise.exerciseType === "Strength") {
            const createMany = { data: exercise.strengthSets ?? [] };
            if (exercise.id) {
              await prisma.exercise.update({
                where,
                data: { ...details, strengthSets: { deleteMany: {}, createMany } },
              });
            } else {
              await prisma.exercise.create({
                data: { ...details, workoutId: workout.id, strengthSets: { createMany } },
              });
            }
          } else if (exercise.exerciseType === "Cardio") {
            const createMany = { data: exercise.cardioSets ?? [] };
            if (exercise.id) {
              await prisma.exercise.update({
                where,
                data: { ...details, cardioSets: { deleteMany: {}, createMany } },
              });
            } else {
              await prisma.exercise.create({
                data: { ...details, workoutId: workout.id, cardioSets: { createMany } },
              });
            }
          }
        }

        return {
          data: await prisma.workout.findUniqueOrThrow({
            where: { id: workout.id, userId },
            include: { exercises: { include: { strengthSets: true, cardioSets: true } } },
          }),
        };
      });
    } catch {
      return {
        errors: {
          field: "workout",
          message: "Could not update the specified workout.",
        },
      };
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(deserializeUser)
  @UseMiddleware(requireUser)
  async deleteWorkout(
    @Ctx() ctx: PrismaContext,
    @Arg("workoutId") workoutId: number
  ) {
    const userId = ctx.res.locals.user.id;
    const { count } = await ctx.prisma.workout.deleteMany({
      where: { id: workoutId, userId },
    });
    return count === 1;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(deserializeUser)
  @UseMiddleware(requireUser)
  async deleteExercise(
    @Ctx() ctx: PrismaContext,
    @Arg("exerciseId") exerciseId: number
  ) {
    const userId = ctx.res.locals.user.id;
    const { count } = await ctx.prisma.exercise.deleteMany({
      where: { id: exerciseId, workout: { userId } },
    });
    return count === 1;
  }
}
