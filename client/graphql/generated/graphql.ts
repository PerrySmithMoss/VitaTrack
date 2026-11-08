/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
import type * as Types from './schema';

import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
import {
  useMutation,
  useQuery,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';
import { customFetcher } from '../fetcher';
export type AddFoodMutationVariables = Exact<{
  foodInput: Types.FoodInput;
  date: unknown;
  nutritionId: number;
}>;

export type AddFoodMutation = {
  addFood: {
    errors: Array<{ field: string; message: string }> | null;
    data: {
      id: string;
      createdAt: unknown;
      updatedAt: unknown;
      name: string;
      mealName: string;
      numOfServings: number;
      servingSize: string;
      calories: number;
      protein: number;
      fat: number;
      carbohydrate: number;
      sugar: number;
      sodium: number;
      userId: string;
      nutritionId: string;
    } | null;
  };
};

export type AddNutritionMutationVariables = Exact<{
  nutritionInput: Types.NutritionInput;
}>;

export type AddNutritionMutation = {
  addNutrition: {
    errors: Array<{ field: string; message: string }> | null;
    data: {
      id: string;
      createdAt: unknown;
      updatedAt: unknown;
      date: unknown;
      calories: number | null;
      protein: number | null;
      fat: number | null;
      carbohydrate: number | null;
      userId: string;
    } | null;
  };
};

export type AddNutritionWithFoodsMutationVariables = Exact<{
  foods: Array<Types.FoodsInput> | Types.FoodsInput;
  nutritionInput: Types.NutritionInput;
}>;

export type AddNutritionWithFoodsMutation = {
  addNutritionWithFoods: {
    errors: Array<{ field: string; message: string }> | null;
    data: {
      id: string;
      createdAt: unknown;
      updatedAt: unknown;
      date: unknown;
      calories: number | null;
      protein: number | null;
      fat: number | null;
      carbohydrate: number | null;
      userId: string;
    } | null;
  };
};

export type CreateUserMutationVariables = Exact<{
  password: string;
  email: string;
  username: string;
}>;

export type CreateUserMutation = {
  createUser: {
    data: {
      username: string;
      email: string;
      id: string;
      profile: { id: string; bio: string | null; avatar: string | null } | null;
    } | null;
    errors: Array<{ field: string; message: string }> | null;
  };
};

export type CreateWorkoutMutationVariables = Exact<{
  exercises: Array<Types.ExercisesInput> | Types.ExercisesInput;
  endTime: string;
  startTime: string;
  name: string;
  notes?: string | null | undefined;
  bodyweight?: number | null | undefined;
}>;

export type CreateWorkoutMutation = {
  createWorkout: {
    errors: { field: string; message: string } | null;
    data: {
      id: number;
      createdAt: unknown;
      updatedAt: unknown;
      name: string;
      startTime: string;
      endTime: string;
      bodyweight: number | null;
      notes: string | null;
      userId: string;
      exercises: Array<{
        id: number;
        createdAt: unknown;
        updatedAt: unknown;
        name: string;
        category: string;
        exerciseType: string;
        unilateral: boolean | null;
        workoutId: number;
        strengthSets: Array<{
          id: number;
          createdAt: unknown;
          updatedAt: unknown;
          setNumber: number | null;
          weight: string | null;
          reps: string | null;
          notes: string | null;
          exerciseId: string;
        }>;
        cardioSets: Array<{
          id: number;
          createdAt: unknown;
          updatedAt: unknown;
          setNumber: number | null;
          minutes: string | null;
          seconds: string | null;
          distance: string | null;
          caloriesBurned: string | null;
          notes: string | null;
          exerciseId: string;
        }>;
      }>;
    } | null;
  };
};

export type DeleteExerciseMutationVariables = Exact<{
  exerciseId: number;
}>;

export type DeleteExerciseMutation = { deleteExercise: boolean };

export type DeleteFoodFromMealByDateMutationVariables = Exact<{
  mealName: string;
  foodId: number;
  date?: unknown;
}>;

export type DeleteFoodFromMealByDateMutation = {
  deleteFoodFromMealByDate: {
    message: string | null;
    errors: Array<{ field: string; message: string }> | null;
  };
};

export type DeleteWorkoutMutationVariables = Exact<{
  workoutId: number;
}>;

export type DeleteWorkoutMutation = { deleteWorkout: boolean };

export type EditWorkoutMutationVariables = Exact<{
  endTime: string;
  startTime: string;
  name: string;
  workoutId: number;
  bodyweight?: number | null | undefined;
  notes?: string | null | undefined;
  exercises?:
    Array<Types.CurrExercises> | Types.CurrExercises | null | undefined;
}>;

export type EditWorkoutMutation = {
  editWorkout: {
    errors: { field: string; message: string } | null;
    data: {
      id: number;
      createdAt: unknown;
      updatedAt: unknown;
      name: string;
      startTime: string;
      endTime: string;
      bodyweight: number | null;
      notes: string | null;
      userId: string;
      exercises: Array<{
        id: number;
        createdAt: unknown;
        updatedAt: unknown;
        name: string;
        category: string;
        exerciseType: string;
        unilateral: boolean | null;
        workoutId: number;
        strengthSets: Array<{
          id: number;
          createdAt: unknown;
          updatedAt: unknown;
          setNumber: number | null;
          weight: string | null;
          reps: string | null;
          notes: string | null;
          exerciseId: string;
        }>;
        cardioSets: Array<{
          id: number;
          createdAt: unknown;
          updatedAt: unknown;
          setNumber: number | null;
          minutes: string | null;
          seconds: string | null;
          distance: string | null;
          caloriesBurned: string | null;
          notes: string | null;
          exerciseId: string;
        }>;
      }>;
    } | null;
  };
};

export type FinishUserSetupMutationVariables = Exact<{
  goalWeight: number;
  currentWeight: number;
  gender: string;
  weightGoal: string;
}>;

export type FinishUserSetupMutation = {
  finishUserSetup: {
    errors: Array<{ field: string; message: string }> | null;
    data: {
      id: string;
      createdAt: unknown;
      updatedAt: unknown;
      email: string;
      username: string;
      hasGoals: boolean;
      gender: string;
    } | null;
  };
};

export type GoogleOauthHandlerMutationVariables = Exact<{
  code: string;
}>;

export type GoogleOauthHandlerMutation = {
  googleOauthHandler: {
    data: { access_token: string; id_token: string } | null;
    errors: Array<{ field: string; message: string }> | null;
  };
};

export type LoginUserWithEmailAndPasswordMutationVariables = Exact<{
  password: string;
  email: string;
}>;

export type LoginUserWithEmailAndPasswordMutation = {
  loginUserWithEmailAndPassword: {
    errors: Array<{ field: string; message: string }> | null;
    data: {
      username: string;
      email: string;
      updatedAt: unknown;
      createdAt: unknown;
      id: string;
      profile: {
        avatar: string | null;
        bio: string | null;
        id: string;
        avatarId: string | null;
      } | null;
    } | null;
  };
};

export type LogoutUserMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutUserMutation = {
  logoutUser: { message: string; success: boolean };
};

export type UpdateUserMutationVariables = Exact<{
  password: string;
  email: string;
  gender: string;
  username: string;
}>;

export type UpdateUserMutation = {
  updateUser: {
    errors: Array<{ field: string; message: string }> | null;
    data: {
      id: string;
      createdAt: unknown;
      updatedAt: unknown;
      email: string;
      username: string;
      hasGoals: boolean;
      gender: string;
    } | null;
  };
};

export type UpsertUserGoalsMutationVariables = Exact<{
  goalsInput: Types.GoalsInput;
}>;

export type UpsertUserGoalsMutation = {
  upsertUserGoals: {
    errors: Array<{ field: string; message: string }> | null;
    data: {
      id: string;
      createdAt: unknown;
      updatedAt: unknown;
      startingWeight: number | null;
      currentWeight: number | null;
      goalWeight: number | null;
      calories: number | null;
      protein: number | null;
      fat: number | null;
      carbohydrate: number | null;
      userId: string;
    } | null;
  };
};

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetCurrentUserQuery = {
  getCurrentUser: {
    data: {
      id: string;
      email: string;
      username: string;
      hasGoals: boolean;
      gender: string;
      profile: { avatar: string | null; bio: string | null; id: string } | null;
      session: {
        userId: string;
        valid: boolean;
        userAgent: string;
        createdAt: unknown;
        updatedAt: unknown;
      } | null;
    } | null;
  } | null;
};

export type GetCurrentUsersFoodByDateQueryVariables = Exact<{
  date?: unknown;
}>;

export type GetCurrentUsersFoodByDateQuery = {
  getCurrentUsersFoodByDate: {
    errors: Array<{ field: string; message: string }> | null;
    data: Array<{
      id: string;
      createdAt: unknown;
      updatedAt: unknown;
      name: string;
      mealName: string;
      numOfServings: number;
      servingSize: string;
      calories: number;
      protein: number;
      fat: number;
      carbohydrate: number;
      sugar: number;
      sodium: number;
      userId: string;
      nutritionId: string;
    }> | null;
  };
};

export type GetCurrentUsersGoalsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetCurrentUsersGoalsQuery = {
  getCurrentUsersGoals: {
    errors: Array<{ field: string; message: string }> | null;
    data: {
      id: string;
      createdAt: unknown;
      updatedAt: unknown;
      startingWeight: number | null;
      currentWeight: number | null;
      dailySteps: number;
      goalWeight: number | null;
      calories: number | null;
      protein: number | null;
      fat: number | null;
      carbohydrate: number | null;
    } | null;
  };
};

export type GetCurrentUsersRemainingCaloriesByDateQueryVariables = Exact<{
  date?: unknown;
}>;

export type GetCurrentUsersRemainingCaloriesByDateQuery = {
  getCurrentUsersRemainingCaloriesByDate: number;
};

export type GetUsersWorkoutByDateQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetUsersWorkoutByDateQuery = {
  getUsersWorkoutByDate: {
    errors: { field: string; message: string } | null;
    data: {
      id: number;
      createdAt: unknown;
      updatedAt: unknown;
      name: string;
      startTime: string;
      endTime: string;
      bodyweight: number | null;
      notes: string | null;
      userId: string;
      exercises: Array<{
        id: number;
        createdAt: unknown;
        updatedAt: unknown;
        name: string;
        category: string;
        exerciseType: string;
        unilateral: boolean | null;
        workoutId: number;
      }>;
    } | null;
  };
};

export type GetCurrentUsersNutritionQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetCurrentUsersNutritionQuery = {
  getCurrentUsersNutrition: {
    errors: Array<{ field: string; message: string }> | null;
    data: Array<{
      id: string;
      createdAt: unknown;
      updatedAt: unknown;
      calories: number | null;
      protein: number | null;
      fat: number | null;
      carbohydrate: number | null;
      userId: string;
    }> | null;
  };
};

export type GetCurrentUsersNutritionByDateQueryVariables = Exact<{
  date?: unknown;
}>;

export type GetCurrentUsersNutritionByDateQuery = {
  getCurrentUsersNutritionByDate: {
    errors: Array<{ field: string; message: string }> | null;
    data: {
      id: string;
      createdAt: unknown;
      updatedAt: unknown;
      date: unknown;
      calories: number | null;
      protein: number | null;
      fat: number | null;
      carbohydrate: number | null;
      userId: string;
    } | null;
  };
};

export type GetUsersWorkoutsQueryVariables = Exact<{ [key: string]: never }>;

export type GetUsersWorkoutsQuery = {
  getUsersWorkouts: {
    errors: Array<{ field: string; message: string }> | null;
    data: Array<{
      id: number;
      createdAt: unknown;
      updatedAt: unknown;
      name: string;
      startTime: string;
      endTime: string;
      bodyweight: number | null;
      notes: string | null;
      userId: string;
      exercises: Array<{
        id: number;
        createdAt: unknown;
        updatedAt: unknown;
        name: string;
        category: string;
        exerciseType: string;
        unilateral: boolean | null;
        workoutId: number;
        strengthSets: Array<{
          id: number;
          createdAt: unknown;
          updatedAt: unknown;
          setNumber: number | null;
          weight: string | null;
          reps: string | null;
          notes: string | null;
          exerciseId: string;
        }>;
        cardioSets: Array<{
          id: number;
          createdAt: unknown;
          updatedAt: unknown;
          setNumber: number | null;
          minutes: string | null;
          seconds: string | null;
          distance: string | null;
          caloriesBurned: string | null;
          notes: string | null;
          exerciseId: string;
        }>;
      }>;
    }> | null;
  };
};

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<
    DocumentTypeDecoration<TResult, TVariables>['__apiType']
  >;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const AddFoodDocument = /*#__PURE__*/ new TypedDocumentString(`
    mutation AddFood($foodInput: FoodInput!, $date: DateTime!, $nutritionId: Int!) {
  addFood(foodInput: $foodInput, date: $date, nutritionId: $nutritionId) {
    errors {
      field
      message
    }
    data {
      id
      createdAt
      updatedAt
      name
      mealName
      numOfServings
      servingSize
      calories
      protein
      fat
      carbohydrate
      sugar
      sodium
      userId
      nutritionId
    }
  }
}
    `);

export const useAddFoodMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    AddFoodMutation,
    TError,
    AddFoodMutationVariables,
    TContext
  >
) => {
  return useMutation<
    AddFoodMutation,
    TError,
    AddFoodMutationVariables,
    TContext
  >({
    mutationKey: ['AddFood'],
    mutationFn: (variables?: AddFoodMutationVariables) =>
      customFetcher<AddFoodMutation, AddFoodMutationVariables>(
        AddFoodDocument,
        variables
      )(),
    ...options,
  });
};

useAddFoodMutation.fetcher = (
  variables: AddFoodMutationVariables,
  options?: RequestInit['headers']
) =>
  customFetcher<AddFoodMutation, AddFoodMutationVariables>(
    AddFoodDocument,
    variables,
    options
  );

export const AddNutritionDocument = /*#__PURE__*/ new TypedDocumentString(`
    mutation AddNutrition($nutritionInput: NutritionInput!) {
  addNutrition(nutritionInput: $nutritionInput) {
    errors {
      field
      message
    }
    data {
      id
      createdAt
      updatedAt
      date
      calories
      protein
      fat
      carbohydrate
      userId
    }
  }
}
    `);

export const useAddNutritionMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    AddNutritionMutation,
    TError,
    AddNutritionMutationVariables,
    TContext
  >
) => {
  return useMutation<
    AddNutritionMutation,
    TError,
    AddNutritionMutationVariables,
    TContext
  >({
    mutationKey: ['AddNutrition'],
    mutationFn: (variables?: AddNutritionMutationVariables) =>
      customFetcher<AddNutritionMutation, AddNutritionMutationVariables>(
        AddNutritionDocument,
        variables
      )(),
    ...options,
  });
};

useAddNutritionMutation.fetcher = (
  variables: AddNutritionMutationVariables,
  options?: RequestInit['headers']
) =>
  customFetcher<AddNutritionMutation, AddNutritionMutationVariables>(
    AddNutritionDocument,
    variables,
    options
  );

export const AddNutritionWithFoodsDocument =
  /*#__PURE__*/ new TypedDocumentString(`
    mutation AddNutritionWithFoods($foods: [FoodsInput!]!, $nutritionInput: NutritionInput!) {
  addNutritionWithFoods(foods: $foods, nutritionInput: $nutritionInput) {
    errors {
      field
      message
    }
    data {
      id
      createdAt
      updatedAt
      date
      calories
      protein
      fat
      carbohydrate
      userId
    }
  }
}
    `);

export const useAddNutritionWithFoodsMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    AddNutritionWithFoodsMutation,
    TError,
    AddNutritionWithFoodsMutationVariables,
    TContext
  >
) => {
  return useMutation<
    AddNutritionWithFoodsMutation,
    TError,
    AddNutritionWithFoodsMutationVariables,
    TContext
  >({
    mutationKey: ['AddNutritionWithFoods'],
    mutationFn: (variables?: AddNutritionWithFoodsMutationVariables) =>
      customFetcher<
        AddNutritionWithFoodsMutation,
        AddNutritionWithFoodsMutationVariables
      >(AddNutritionWithFoodsDocument, variables)(),
    ...options,
  });
};

useAddNutritionWithFoodsMutation.fetcher = (
  variables: AddNutritionWithFoodsMutationVariables,
  options?: RequestInit['headers']
) =>
  customFetcher<
    AddNutritionWithFoodsMutation,
    AddNutritionWithFoodsMutationVariables
  >(AddNutritionWithFoodsDocument, variables, options);

export const CreateUserDocument = /*#__PURE__*/ new TypedDocumentString(`
    mutation CreateUser($password: String!, $email: String!, $username: String!) {
  createUser(password: $password, email: $email, username: $username) {
    data {
      username
      email
      id
      profile {
        id
        bio
        avatar
      }
    }
    errors {
      field
      message
    }
  }
}
    `);

export const useCreateUserMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CreateUserMutation,
    TError,
    CreateUserMutationVariables,
    TContext
  >
) => {
  return useMutation<
    CreateUserMutation,
    TError,
    CreateUserMutationVariables,
    TContext
  >({
    mutationKey: ['CreateUser'],
    mutationFn: (variables?: CreateUserMutationVariables) =>
      customFetcher<CreateUserMutation, CreateUserMutationVariables>(
        CreateUserDocument,
        variables
      )(),
    ...options,
  });
};

useCreateUserMutation.fetcher = (
  variables: CreateUserMutationVariables,
  options?: RequestInit['headers']
) =>
  customFetcher<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument,
    variables,
    options
  );

export const CreateWorkoutDocument = /*#__PURE__*/ new TypedDocumentString(`
    mutation CreateWorkout($exercises: [ExercisesInput!]!, $endTime: String!, $startTime: String!, $name: String!, $notes: String, $bodyweight: Float) {
  createWorkout(
    exercises: $exercises
    endTime: $endTime
    startTime: $startTime
    name: $name
    notes: $notes
    bodyweight: $bodyweight
  ) {
    errors {
      field
      message
    }
    data {
      id
      createdAt
      updatedAt
      name
      startTime
      endTime
      bodyweight
      notes
      userId
      exercises {
        id
        createdAt
        updatedAt
        name
        category
        exerciseType
        unilateral
        workoutId
        strengthSets {
          id
          createdAt
          updatedAt
          setNumber
          weight
          reps
          notes
          exerciseId
        }
        cardioSets {
          id
          createdAt
          updatedAt
          setNumber
          minutes
          seconds
          distance
          caloriesBurned
          notes
          exerciseId
        }
      }
    }
  }
}
    `);

export const useCreateWorkoutMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CreateWorkoutMutation,
    TError,
    CreateWorkoutMutationVariables,
    TContext
  >
) => {
  return useMutation<
    CreateWorkoutMutation,
    TError,
    CreateWorkoutMutationVariables,
    TContext
  >({
    mutationKey: ['CreateWorkout'],
    mutationFn: (variables?: CreateWorkoutMutationVariables) =>
      customFetcher<CreateWorkoutMutation, CreateWorkoutMutationVariables>(
        CreateWorkoutDocument,
        variables
      )(),
    ...options,
  });
};

useCreateWorkoutMutation.fetcher = (
  variables: CreateWorkoutMutationVariables,
  options?: RequestInit['headers']
) =>
  customFetcher<CreateWorkoutMutation, CreateWorkoutMutationVariables>(
    CreateWorkoutDocument,
    variables,
    options
  );

export const DeleteExerciseDocument = /*#__PURE__*/ new TypedDocumentString(`
    mutation DeleteExercise($exerciseId: Float!) {
  deleteExercise(exerciseId: $exerciseId)
}
    `);

export const useDeleteExerciseMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    DeleteExerciseMutation,
    TError,
    DeleteExerciseMutationVariables,
    TContext
  >
) => {
  return useMutation<
    DeleteExerciseMutation,
    TError,
    DeleteExerciseMutationVariables,
    TContext
  >({
    mutationKey: ['DeleteExercise'],
    mutationFn: (variables?: DeleteExerciseMutationVariables) =>
      customFetcher<DeleteExerciseMutation, DeleteExerciseMutationVariables>(
        DeleteExerciseDocument,
        variables
      )(),
    ...options,
  });
};

useDeleteExerciseMutation.fetcher = (
  variables: DeleteExerciseMutationVariables,
  options?: RequestInit['headers']
) =>
  customFetcher<DeleteExerciseMutation, DeleteExerciseMutationVariables>(
    DeleteExerciseDocument,
    variables,
    options
  );

export const DeleteFoodFromMealByDateDocument =
  /*#__PURE__*/ new TypedDocumentString(`
    mutation DeleteFoodFromMealByDate($mealName: String!, $foodId: Int!, $date: DateTime) {
  deleteFoodFromMealByDate(mealName: $mealName, foodId: $foodId, date: $date) {
    errors {
      field
      message
    }
    message
  }
}
    `);

export const useDeleteFoodFromMealByDateMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    DeleteFoodFromMealByDateMutation,
    TError,
    DeleteFoodFromMealByDateMutationVariables,
    TContext
  >
) => {
  return useMutation<
    DeleteFoodFromMealByDateMutation,
    TError,
    DeleteFoodFromMealByDateMutationVariables,
    TContext
  >({
    mutationKey: ['DeleteFoodFromMealByDate'],
    mutationFn: (variables?: DeleteFoodFromMealByDateMutationVariables) =>
      customFetcher<
        DeleteFoodFromMealByDateMutation,
        DeleteFoodFromMealByDateMutationVariables
      >(DeleteFoodFromMealByDateDocument, variables)(),
    ...options,
  });
};

useDeleteFoodFromMealByDateMutation.fetcher = (
  variables: DeleteFoodFromMealByDateMutationVariables,
  options?: RequestInit['headers']
) =>
  customFetcher<
    DeleteFoodFromMealByDateMutation,
    DeleteFoodFromMealByDateMutationVariables
  >(DeleteFoodFromMealByDateDocument, variables, options);

export const DeleteWorkoutDocument = /*#__PURE__*/ new TypedDocumentString(`
    mutation DeleteWorkout($workoutId: Float!) {
  deleteWorkout(workoutId: $workoutId)
}
    `);

export const useDeleteWorkoutMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    DeleteWorkoutMutation,
    TError,
    DeleteWorkoutMutationVariables,
    TContext
  >
) => {
  return useMutation<
    DeleteWorkoutMutation,
    TError,
    DeleteWorkoutMutationVariables,
    TContext
  >({
    mutationKey: ['DeleteWorkout'],
    mutationFn: (variables?: DeleteWorkoutMutationVariables) =>
      customFetcher<DeleteWorkoutMutation, DeleteWorkoutMutationVariables>(
        DeleteWorkoutDocument,
        variables
      )(),
    ...options,
  });
};

useDeleteWorkoutMutation.fetcher = (
  variables: DeleteWorkoutMutationVariables,
  options?: RequestInit['headers']
) =>
  customFetcher<DeleteWorkoutMutation, DeleteWorkoutMutationVariables>(
    DeleteWorkoutDocument,
    variables,
    options
  );

export const EditWorkoutDocument = /*#__PURE__*/ new TypedDocumentString(`
    mutation EditWorkout($endTime: String!, $startTime: String!, $name: String!, $workoutId: Float!, $bodyweight: Float, $notes: String, $exercises: [CurrExercises!]) {
  editWorkout(
    endTime: $endTime
    startTime: $startTime
    name: $name
    workoutId: $workoutId
    bodyweight: $bodyweight
    notes: $notes
    exercises: $exercises
  ) {
    errors {
      field
      message
    }
    data {
      id
      createdAt
      updatedAt
      name
      startTime
      endTime
      bodyweight
      notes
      userId
      exercises {
        id
        createdAt
        updatedAt
        name
        category
        exerciseType
        unilateral
        workoutId
        strengthSets {
          id
          createdAt
          updatedAt
          setNumber
          weight
          reps
          notes
          exerciseId
        }
        cardioSets {
          id
          createdAt
          updatedAt
          setNumber
          minutes
          seconds
          distance
          caloriesBurned
          notes
          exerciseId
        }
      }
    }
  }
}
    `);

export const useEditWorkoutMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    EditWorkoutMutation,
    TError,
    EditWorkoutMutationVariables,
    TContext
  >
) => {
  return useMutation<
    EditWorkoutMutation,
    TError,
    EditWorkoutMutationVariables,
    TContext
  >({
    mutationKey: ['EditWorkout'],
    mutationFn: (variables?: EditWorkoutMutationVariables) =>
      customFetcher<EditWorkoutMutation, EditWorkoutMutationVariables>(
        EditWorkoutDocument,
        variables
      )(),
    ...options,
  });
};

useEditWorkoutMutation.fetcher = (
  variables: EditWorkoutMutationVariables,
  options?: RequestInit['headers']
) =>
  customFetcher<EditWorkoutMutation, EditWorkoutMutationVariables>(
    EditWorkoutDocument,
    variables,
    options
  );

export const FinishUserSetupDocument = /*#__PURE__*/ new TypedDocumentString(`
    mutation FinishUserSetup($goalWeight: Float!, $currentWeight: Float!, $gender: String!, $weightGoal: String!) {
  finishUserSetup(
    goalWeight: $goalWeight
    currentWeight: $currentWeight
    gender: $gender
    weightGoal: $weightGoal
  ) {
    errors {
      field
      message
    }
    data {
      id
      createdAt
      updatedAt
      email
      username
      hasGoals
      gender
    }
  }
}
    `);

export const useFinishUserSetupMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    FinishUserSetupMutation,
    TError,
    FinishUserSetupMutationVariables,
    TContext
  >
) => {
  return useMutation<
    FinishUserSetupMutation,
    TError,
    FinishUserSetupMutationVariables,
    TContext
  >({
    mutationKey: ['FinishUserSetup'],
    mutationFn: (variables?: FinishUserSetupMutationVariables) =>
      customFetcher<FinishUserSetupMutation, FinishUserSetupMutationVariables>(
        FinishUserSetupDocument,
        variables
      )(),
    ...options,
  });
};

useFinishUserSetupMutation.fetcher = (
  variables: FinishUserSetupMutationVariables,
  options?: RequestInit['headers']
) =>
  customFetcher<FinishUserSetupMutation, FinishUserSetupMutationVariables>(
    FinishUserSetupDocument,
    variables,
    options
  );

export const GoogleOauthHandlerDocument =
  /*#__PURE__*/ new TypedDocumentString(`
    mutation googleOauthHandler($code: String!) {
  googleOauthHandler(code: $code) {
    data {
      access_token
      id_token
    }
    errors {
      field
      message
    }
  }
}
    `);

export const useGoogleOauthHandlerMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    GoogleOauthHandlerMutation,
    TError,
    GoogleOauthHandlerMutationVariables,
    TContext
  >
) => {
  return useMutation<
    GoogleOauthHandlerMutation,
    TError,
    GoogleOauthHandlerMutationVariables,
    TContext
  >({
    mutationKey: ['googleOauthHandler'],
    mutationFn: (variables?: GoogleOauthHandlerMutationVariables) =>
      customFetcher<
        GoogleOauthHandlerMutation,
        GoogleOauthHandlerMutationVariables
      >(GoogleOauthHandlerDocument, variables)(),
    ...options,
  });
};

useGoogleOauthHandlerMutation.fetcher = (
  variables: GoogleOauthHandlerMutationVariables,
  options?: RequestInit['headers']
) =>
  customFetcher<
    GoogleOauthHandlerMutation,
    GoogleOauthHandlerMutationVariables
  >(GoogleOauthHandlerDocument, variables, options);

export const LoginUserWithEmailAndPasswordDocument =
  /*#__PURE__*/ new TypedDocumentString(`
    mutation LoginUserWithEmailAndPassword($password: String!, $email: String!) {
  loginUserWithEmailAndPassword(password: $password, email: $email) {
    errors {
      field
      message
    }
    data {
      profile {
        avatar
        bio
        id
        avatarId
      }
      username
      email
      updatedAt
      createdAt
      id
    }
  }
}
    `);

export const useLoginUserWithEmailAndPasswordMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    LoginUserWithEmailAndPasswordMutation,
    TError,
    LoginUserWithEmailAndPasswordMutationVariables,
    TContext
  >
) => {
  return useMutation<
    LoginUserWithEmailAndPasswordMutation,
    TError,
    LoginUserWithEmailAndPasswordMutationVariables,
    TContext
  >({
    mutationKey: ['LoginUserWithEmailAndPassword'],
    mutationFn: (variables?: LoginUserWithEmailAndPasswordMutationVariables) =>
      customFetcher<
        LoginUserWithEmailAndPasswordMutation,
        LoginUserWithEmailAndPasswordMutationVariables
      >(LoginUserWithEmailAndPasswordDocument, variables)(),
    ...options,
  });
};

useLoginUserWithEmailAndPasswordMutation.fetcher = (
  variables: LoginUserWithEmailAndPasswordMutationVariables,
  options?: RequestInit['headers']
) =>
  customFetcher<
    LoginUserWithEmailAndPasswordMutation,
    LoginUserWithEmailAndPasswordMutationVariables
  >(LoginUserWithEmailAndPasswordDocument, variables, options);

export const LogoutUserDocument = /*#__PURE__*/ new TypedDocumentString(`
    mutation LogoutUser {
  logoutUser {
    message
    success
  }
}
    `);

export const useLogoutUserMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    LogoutUserMutation,
    TError,
    LogoutUserMutationVariables,
    TContext
  >
) => {
  return useMutation<
    LogoutUserMutation,
    TError,
    LogoutUserMutationVariables,
    TContext
  >({
    mutationKey: ['LogoutUser'],
    mutationFn: (variables?: LogoutUserMutationVariables) =>
      customFetcher<LogoutUserMutation, LogoutUserMutationVariables>(
        LogoutUserDocument,
        variables
      )(),
    ...options,
  });
};

useLogoutUserMutation.fetcher = (
  variables?: LogoutUserMutationVariables,
  options?: RequestInit['headers']
) =>
  customFetcher<LogoutUserMutation, LogoutUserMutationVariables>(
    LogoutUserDocument,
    variables,
    options
  );

export const UpdateUserDocument = /*#__PURE__*/ new TypedDocumentString(`
    mutation UpdateUser($password: String!, $email: String!, $gender: String!, $username: String!) {
  updateUser(
    password: $password
    email: $email
    gender: $gender
    username: $username
  ) {
    errors {
      field
      message
    }
    data {
      id
      createdAt
      updatedAt
      email
      username
      hasGoals
      gender
    }
  }
}
    `);

export const useUpdateUserMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    UpdateUserMutation,
    TError,
    UpdateUserMutationVariables,
    TContext
  >
) => {
  return useMutation<
    UpdateUserMutation,
    TError,
    UpdateUserMutationVariables,
    TContext
  >({
    mutationKey: ['UpdateUser'],
    mutationFn: (variables?: UpdateUserMutationVariables) =>
      customFetcher<UpdateUserMutation, UpdateUserMutationVariables>(
        UpdateUserDocument,
        variables
      )(),
    ...options,
  });
};

useUpdateUserMutation.fetcher = (
  variables: UpdateUserMutationVariables,
  options?: RequestInit['headers']
) =>
  customFetcher<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    variables,
    options
  );

export const UpsertUserGoalsDocument = /*#__PURE__*/ new TypedDocumentString(`
    mutation UpsertUserGoals($goalsInput: GoalsInput!) {
  upsertUserGoals(goalsInput: $goalsInput) {
    errors {
      field
      message
    }
    data {
      id
      createdAt
      updatedAt
      startingWeight
      currentWeight
      goalWeight
      calories
      protein
      fat
      carbohydrate
      userId
    }
  }
}
    `);

export const useUpsertUserGoalsMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    UpsertUserGoalsMutation,
    TError,
    UpsertUserGoalsMutationVariables,
    TContext
  >
) => {
  return useMutation<
    UpsertUserGoalsMutation,
    TError,
    UpsertUserGoalsMutationVariables,
    TContext
  >({
    mutationKey: ['UpsertUserGoals'],
    mutationFn: (variables?: UpsertUserGoalsMutationVariables) =>
      customFetcher<UpsertUserGoalsMutation, UpsertUserGoalsMutationVariables>(
        UpsertUserGoalsDocument,
        variables
      )(),
    ...options,
  });
};

useUpsertUserGoalsMutation.fetcher = (
  variables: UpsertUserGoalsMutationVariables,
  options?: RequestInit['headers']
) =>
  customFetcher<UpsertUserGoalsMutation, UpsertUserGoalsMutationVariables>(
    UpsertUserGoalsDocument,
    variables,
    options
  );

export const GetCurrentUserDocument = /*#__PURE__*/ new TypedDocumentString(`
    query GetCurrentUser {
  getCurrentUser {
    data {
      id
      email
      username
      hasGoals
      gender
      profile {
        avatar
        bio
        id
      }
      session {
        userId
        valid
        userAgent
        createdAt
        updatedAt
      }
    }
  }
}
    `);

export const useGetCurrentUserQuery = <
  TData = GetCurrentUserQuery,
  TError = unknown,
>(
  variables?: GetCurrentUserQueryVariables,
  options?: Omit<
    UseQueryOptions<GetCurrentUserQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<GetCurrentUserQuery, TError, TData>['queryKey'];
  }
) => {
  return useQuery<GetCurrentUserQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ['GetCurrentUser']
        : ['GetCurrentUser', variables],
    queryFn: customFetcher<GetCurrentUserQuery, GetCurrentUserQueryVariables>(
      GetCurrentUserDocument,
      variables
    ),
    ...options,
  });
};

useGetCurrentUserQuery.document = GetCurrentUserDocument;

useGetCurrentUserQuery.getKey = (variables?: GetCurrentUserQueryVariables) =>
  variables === undefined ? ['GetCurrentUser'] : ['GetCurrentUser', variables];

useGetCurrentUserQuery.fetcher = (
  variables?: GetCurrentUserQueryVariables,
  options?: RequestInit['headers']
) =>
  customFetcher<GetCurrentUserQuery, GetCurrentUserQueryVariables>(
    GetCurrentUserDocument,
    variables,
    options
  );

export const GetCurrentUsersFoodByDateDocument =
  /*#__PURE__*/ new TypedDocumentString(`
    query GetCurrentUsersFoodByDate($date: DateTime) {
  getCurrentUsersFoodByDate(date: $date) {
    errors {
      field
      message
    }
    data {
      id
      createdAt
      updatedAt
      name
      mealName
      numOfServings
      servingSize
      calories
      protein
      fat
      carbohydrate
      sugar
      sodium
      userId
      nutritionId
    }
  }
}
    `);

export const useGetCurrentUsersFoodByDateQuery = <
  TData = GetCurrentUsersFoodByDateQuery,
  TError = unknown,
>(
  variables?: GetCurrentUsersFoodByDateQueryVariables,
  options?: Omit<
    UseQueryOptions<GetCurrentUsersFoodByDateQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<
      GetCurrentUsersFoodByDateQuery,
      TError,
      TData
    >['queryKey'];
  }
) => {
  return useQuery<GetCurrentUsersFoodByDateQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ['GetCurrentUsersFoodByDate']
        : ['GetCurrentUsersFoodByDate', variables],
    queryFn: customFetcher<
      GetCurrentUsersFoodByDateQuery,
      GetCurrentUsersFoodByDateQueryVariables
    >(GetCurrentUsersFoodByDateDocument, variables),
    ...options,
  });
};

useGetCurrentUsersFoodByDateQuery.document = GetCurrentUsersFoodByDateDocument;

useGetCurrentUsersFoodByDateQuery.getKey = (
  variables?: GetCurrentUsersFoodByDateQueryVariables
) =>
  variables === undefined
    ? ['GetCurrentUsersFoodByDate']
    : ['GetCurrentUsersFoodByDate', variables];

useGetCurrentUsersFoodByDateQuery.fetcher = (
  variables?: GetCurrentUsersFoodByDateQueryVariables,
  options?: RequestInit['headers']
) =>
  customFetcher<
    GetCurrentUsersFoodByDateQuery,
    GetCurrentUsersFoodByDateQueryVariables
  >(GetCurrentUsersFoodByDateDocument, variables, options);

export const GetCurrentUsersGoalsDocument =
  /*#__PURE__*/ new TypedDocumentString(`
    query GetCurrentUsersGoals {
  getCurrentUsersGoals {
    errors {
      field
      message
    }
    data {
      id
      createdAt
      updatedAt
      startingWeight
      currentWeight
      dailySteps
      goalWeight
      calories
      protein
      fat
      carbohydrate
    }
  }
}
    `);

export const useGetCurrentUsersGoalsQuery = <
  TData = GetCurrentUsersGoalsQuery,
  TError = unknown,
>(
  variables?: GetCurrentUsersGoalsQueryVariables,
  options?: Omit<
    UseQueryOptions<GetCurrentUsersGoalsQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<
      GetCurrentUsersGoalsQuery,
      TError,
      TData
    >['queryKey'];
  }
) => {
  return useQuery<GetCurrentUsersGoalsQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ['GetCurrentUsersGoals']
        : ['GetCurrentUsersGoals', variables],
    queryFn: customFetcher<
      GetCurrentUsersGoalsQuery,
      GetCurrentUsersGoalsQueryVariables
    >(GetCurrentUsersGoalsDocument, variables),
    ...options,
  });
};

useGetCurrentUsersGoalsQuery.document = GetCurrentUsersGoalsDocument;

useGetCurrentUsersGoalsQuery.getKey = (
  variables?: GetCurrentUsersGoalsQueryVariables
) =>
  variables === undefined
    ? ['GetCurrentUsersGoals']
    : ['GetCurrentUsersGoals', variables];

useGetCurrentUsersGoalsQuery.fetcher = (
  variables?: GetCurrentUsersGoalsQueryVariables,
  options?: RequestInit['headers']
) =>
  customFetcher<GetCurrentUsersGoalsQuery, GetCurrentUsersGoalsQueryVariables>(
    GetCurrentUsersGoalsDocument,
    variables,
    options
  );

export const GetCurrentUsersRemainingCaloriesByDateDocument =
  /*#__PURE__*/ new TypedDocumentString(`
    query GetCurrentUsersRemainingCaloriesByDate($date: DateTime) {
  getCurrentUsersRemainingCaloriesByDate(date: $date)
}
    `);

export const useGetCurrentUsersRemainingCaloriesByDateQuery = <
  TData = GetCurrentUsersRemainingCaloriesByDateQuery,
  TError = unknown,
>(
  variables?: GetCurrentUsersRemainingCaloriesByDateQueryVariables,
  options?: Omit<
    UseQueryOptions<GetCurrentUsersRemainingCaloriesByDateQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<
      GetCurrentUsersRemainingCaloriesByDateQuery,
      TError,
      TData
    >['queryKey'];
  }
) => {
  return useQuery<GetCurrentUsersRemainingCaloriesByDateQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ['GetCurrentUsersRemainingCaloriesByDate']
        : ['GetCurrentUsersRemainingCaloriesByDate', variables],
    queryFn: customFetcher<
      GetCurrentUsersRemainingCaloriesByDateQuery,
      GetCurrentUsersRemainingCaloriesByDateQueryVariables
    >(GetCurrentUsersRemainingCaloriesByDateDocument, variables),
    ...options,
  });
};

useGetCurrentUsersRemainingCaloriesByDateQuery.document =
  GetCurrentUsersRemainingCaloriesByDateDocument;

useGetCurrentUsersRemainingCaloriesByDateQuery.getKey = (
  variables?: GetCurrentUsersRemainingCaloriesByDateQueryVariables
) =>
  variables === undefined
    ? ['GetCurrentUsersRemainingCaloriesByDate']
    : ['GetCurrentUsersRemainingCaloriesByDate', variables];

useGetCurrentUsersRemainingCaloriesByDateQuery.fetcher = (
  variables?: GetCurrentUsersRemainingCaloriesByDateQueryVariables,
  options?: RequestInit['headers']
) =>
  customFetcher<
    GetCurrentUsersRemainingCaloriesByDateQuery,
    GetCurrentUsersRemainingCaloriesByDateQueryVariables
  >(GetCurrentUsersRemainingCaloriesByDateDocument, variables, options);

export const GetUsersWorkoutByDateDocument =
  /*#__PURE__*/ new TypedDocumentString(`
    query GetUsersWorkoutByDate {
  getUsersWorkoutByDate {
    errors {
      field
      message
    }
    data {
      id
      createdAt
      updatedAt
      name
      startTime
      endTime
      bodyweight
      notes
      userId
      exercises {
        id
        createdAt
        updatedAt
        name
        category
        exerciseType
        unilateral
        workoutId
      }
    }
  }
}
    `);

export const useGetUsersWorkoutByDateQuery = <
  TData = GetUsersWorkoutByDateQuery,
  TError = unknown,
>(
  variables?: GetUsersWorkoutByDateQueryVariables,
  options?: Omit<
    UseQueryOptions<GetUsersWorkoutByDateQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<
      GetUsersWorkoutByDateQuery,
      TError,
      TData
    >['queryKey'];
  }
) => {
  return useQuery<GetUsersWorkoutByDateQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ['GetUsersWorkoutByDate']
        : ['GetUsersWorkoutByDate', variables],
    queryFn: customFetcher<
      GetUsersWorkoutByDateQuery,
      GetUsersWorkoutByDateQueryVariables
    >(GetUsersWorkoutByDateDocument, variables),
    ...options,
  });
};

useGetUsersWorkoutByDateQuery.document = GetUsersWorkoutByDateDocument;

useGetUsersWorkoutByDateQuery.getKey = (
  variables?: GetUsersWorkoutByDateQueryVariables
) =>
  variables === undefined
    ? ['GetUsersWorkoutByDate']
    : ['GetUsersWorkoutByDate', variables];

useGetUsersWorkoutByDateQuery.fetcher = (
  variables?: GetUsersWorkoutByDateQueryVariables,
  options?: RequestInit['headers']
) =>
  customFetcher<
    GetUsersWorkoutByDateQuery,
    GetUsersWorkoutByDateQueryVariables
  >(GetUsersWorkoutByDateDocument, variables, options);

export const GetCurrentUsersNutritionDocument =
  /*#__PURE__*/ new TypedDocumentString(`
    query GetCurrentUsersNutrition {
  getCurrentUsersNutrition {
    errors {
      field
      message
    }
    data {
      id
      createdAt
      updatedAt
      calories
      protein
      fat
      carbohydrate
      userId
    }
  }
}
    `);

export const useGetCurrentUsersNutritionQuery = <
  TData = GetCurrentUsersNutritionQuery,
  TError = unknown,
>(
  variables?: GetCurrentUsersNutritionQueryVariables,
  options?: Omit<
    UseQueryOptions<GetCurrentUsersNutritionQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<
      GetCurrentUsersNutritionQuery,
      TError,
      TData
    >['queryKey'];
  }
) => {
  return useQuery<GetCurrentUsersNutritionQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ['GetCurrentUsersNutrition']
        : ['GetCurrentUsersNutrition', variables],
    queryFn: customFetcher<
      GetCurrentUsersNutritionQuery,
      GetCurrentUsersNutritionQueryVariables
    >(GetCurrentUsersNutritionDocument, variables),
    ...options,
  });
};

useGetCurrentUsersNutritionQuery.document = GetCurrentUsersNutritionDocument;

useGetCurrentUsersNutritionQuery.getKey = (
  variables?: GetCurrentUsersNutritionQueryVariables
) =>
  variables === undefined
    ? ['GetCurrentUsersNutrition']
    : ['GetCurrentUsersNutrition', variables];

useGetCurrentUsersNutritionQuery.fetcher = (
  variables?: GetCurrentUsersNutritionQueryVariables,
  options?: RequestInit['headers']
) =>
  customFetcher<
    GetCurrentUsersNutritionQuery,
    GetCurrentUsersNutritionQueryVariables
  >(GetCurrentUsersNutritionDocument, variables, options);

export const GetCurrentUsersNutritionByDateDocument =
  /*#__PURE__*/ new TypedDocumentString(`
    query GetCurrentUsersNutritionByDate($date: DateTime) {
  getCurrentUsersNutritionByDate(date: $date) {
    errors {
      field
      message
    }
    data {
      id
      createdAt
      updatedAt
      date
      calories
      protein
      fat
      carbohydrate
      userId
    }
  }
}
    `);

export const useGetCurrentUsersNutritionByDateQuery = <
  TData = GetCurrentUsersNutritionByDateQuery,
  TError = unknown,
>(
  variables?: GetCurrentUsersNutritionByDateQueryVariables,
  options?: Omit<
    UseQueryOptions<GetCurrentUsersNutritionByDateQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<
      GetCurrentUsersNutritionByDateQuery,
      TError,
      TData
    >['queryKey'];
  }
) => {
  return useQuery<GetCurrentUsersNutritionByDateQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ['GetCurrentUsersNutritionByDate']
        : ['GetCurrentUsersNutritionByDate', variables],
    queryFn: customFetcher<
      GetCurrentUsersNutritionByDateQuery,
      GetCurrentUsersNutritionByDateQueryVariables
    >(GetCurrentUsersNutritionByDateDocument, variables),
    ...options,
  });
};

useGetCurrentUsersNutritionByDateQuery.document =
  GetCurrentUsersNutritionByDateDocument;

useGetCurrentUsersNutritionByDateQuery.getKey = (
  variables?: GetCurrentUsersNutritionByDateQueryVariables
) =>
  variables === undefined
    ? ['GetCurrentUsersNutritionByDate']
    : ['GetCurrentUsersNutritionByDate', variables];

useGetCurrentUsersNutritionByDateQuery.fetcher = (
  variables?: GetCurrentUsersNutritionByDateQueryVariables,
  options?: RequestInit['headers']
) =>
  customFetcher<
    GetCurrentUsersNutritionByDateQuery,
    GetCurrentUsersNutritionByDateQueryVariables
  >(GetCurrentUsersNutritionByDateDocument, variables, options);

export const GetUsersWorkoutsDocument = /*#__PURE__*/ new TypedDocumentString(`
    query GetUsersWorkouts {
  getUsersWorkouts {
    errors {
      field
      message
    }
    data {
      id
      createdAt
      updatedAt
      name
      startTime
      endTime
      bodyweight
      notes
      userId
      exercises {
        id
        createdAt
        updatedAt
        name
        category
        exerciseType
        unilateral
        workoutId
        strengthSets {
          id
          createdAt
          updatedAt
          setNumber
          weight
          reps
          notes
          exerciseId
        }
        cardioSets {
          id
          createdAt
          updatedAt
          setNumber
          minutes
          seconds
          distance
          caloriesBurned
          notes
          exerciseId
        }
      }
    }
  }
}
    `);

export const useGetUsersWorkoutsQuery = <
  TData = GetUsersWorkoutsQuery,
  TError = unknown,
>(
  variables?: GetUsersWorkoutsQueryVariables,
  options?: Omit<
    UseQueryOptions<GetUsersWorkoutsQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<
      GetUsersWorkoutsQuery,
      TError,
      TData
    >['queryKey'];
  }
) => {
  return useQuery<GetUsersWorkoutsQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ['GetUsersWorkouts']
        : ['GetUsersWorkouts', variables],
    queryFn: customFetcher<
      GetUsersWorkoutsQuery,
      GetUsersWorkoutsQueryVariables
    >(GetUsersWorkoutsDocument, variables),
    ...options,
  });
};

useGetUsersWorkoutsQuery.document = GetUsersWorkoutsDocument;

useGetUsersWorkoutsQuery.getKey = (
  variables?: GetUsersWorkoutsQueryVariables
) =>
  variables === undefined
    ? ['GetUsersWorkouts']
    : ['GetUsersWorkouts', variables];

useGetUsersWorkoutsQuery.fetcher = (
  variables?: GetUsersWorkoutsQueryVariables,
  options?: RequestInit['headers']
) =>
  customFetcher<GetUsersWorkoutsQuery, GetUsersWorkoutsQueryVariables>(
    GetUsersWorkoutsDocument,
    variables,
    options
  );
