import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { customFetcher } from '../fetcher';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type CardioSet = {
  __typename?: 'CardioSet';
  caloriesBurned?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  distance?: Maybe<Scalars['String']['output']>;
  exercise: Exercise;
  exerciseId: Scalars['ID']['output'];
  id: Scalars['Int']['output'];
  minutes?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  seconds?: Maybe<Scalars['String']['output']>;
  setNumber?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type CardioSetInput = {
  caloriesBurned?: InputMaybe<Scalars['String']['input']>;
  distance?: InputMaybe<Scalars['String']['input']>;
  minutes?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  seconds?: InputMaybe<Scalars['String']['input']>;
  setNumber?: InputMaybe<Scalars['Int']['input']>;
};

export type CurrCardioSet = {
  caloriesBurned?: InputMaybe<Scalars['String']['input']>;
  distance?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  minutes?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  seconds?: InputMaybe<Scalars['String']['input']>;
  setNumber?: InputMaybe<Scalars['Int']['input']>;
};

export type CurrExercises = {
  cardioSets?: InputMaybe<Array<CurrCardioSet>>;
  category: Scalars['String']['input'];
  exerciseType: Scalars['String']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  strengthSets?: InputMaybe<Array<CurrStrengthSet>>;
  unilateral?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CurrStrengthSet = {
  id?: InputMaybe<Scalars['Int']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  reps?: InputMaybe<Scalars['String']['input']>;
  setNumber?: InputMaybe<Scalars['Int']['input']>;
  weight?: InputMaybe<Scalars['String']['input']>;
};

export type Exercise = {
  __typename?: 'Exercise';
  cardioSets: Array<CardioSet>;
  category: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  exerciseType: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  strengthSets: Array<StrengthSet>;
  unilateral?: Maybe<Scalars['Boolean']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  workout: Workout;
  workoutId: Scalars['Int']['output'];
};

export type ExercisesInput = {
  cardioSets?: InputMaybe<Array<CardioSetInput>>;
  category: Scalars['String']['input'];
  exerciseType: Scalars['String']['input'];
  name: Scalars['String']['input'];
  strengthSets?: InputMaybe<Array<StrengthSetInput>>;
  unilateral?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Food = {
  __typename?: 'Food';
  calories: Scalars['Int']['output'];
  carbohydrate: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  fat: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  mealName: Scalars['String']['output'];
  name: Scalars['String']['output'];
  numOfServings: Scalars['Float']['output'];
  nutrition: Array<Nutrition>;
  nutritionId: Scalars['ID']['output'];
  protein: Scalars['Float']['output'];
  servingSize: Scalars['String']['output'];
  sodium: Scalars['Float']['output'];
  sugar: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type FoodFieldError = {
  __typename?: 'FoodFieldError';
  field: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type FoodInput = {
  calories: Scalars['Int']['input'];
  carbohydrate: Scalars['Float']['input'];
  fat: Scalars['Float']['input'];
  mealName: Scalars['String']['input'];
  name: Scalars['String']['input'];
  numOfServings: Scalars['Float']['input'];
  protein: Scalars['Float']['input'];
  servingSize: Scalars['String']['input'];
  sodium: Scalars['Float']['input'];
  sugar: Scalars['Float']['input'];
};

export type FoodResponse = {
  __typename?: 'FoodResponse';
  data?: Maybe<Food>;
  errors?: Maybe<Array<FoodFieldError>>;
};

export type FoodResponseIterable = {
  __typename?: 'FoodResponseIterable';
  data?: Maybe<Array<Food>>;
  errors?: Maybe<Array<FoodFieldError>>;
};

export type FoodResponseSimple = {
  __typename?: 'FoodResponseSimple';
  data?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<FoodFieldError>>;
};

export type FoodResponseSuccess = {
  __typename?: 'FoodResponseSuccess';
  errors?: Maybe<Array<FoodFieldError>>;
  message?: Maybe<Scalars['String']['output']>;
};

export type FoodsInput = {
  calories: Scalars['Int']['input'];
  carbohydrate: Scalars['Float']['input'];
  fat: Scalars['Float']['input'];
  mealName: Scalars['String']['input'];
  name: Scalars['String']['input'];
  numOfServings: Scalars['Float']['input'];
  protein: Scalars['Float']['input'];
  servingSize: Scalars['String']['input'];
  sodium: Scalars['Float']['input'];
  sugar: Scalars['Float']['input'];
};

export type Goals = {
  __typename?: 'Goals';
  calories?: Maybe<Scalars['Int']['output']>;
  carbohydrate?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  currentWeight?: Maybe<Scalars['Float']['output']>;
  dailySteps: Scalars['Int']['output'];
  fat?: Maybe<Scalars['Int']['output']>;
  goalWeight?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  protein?: Maybe<Scalars['Int']['output']>;
  startingWeight?: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['ID']['output'];
};

export type GoalsFieldError = {
  __typename?: 'GoalsFieldError';
  field: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type GoalsInput = {
  calories?: InputMaybe<Scalars['Int']['input']>;
  carbohydrate?: InputMaybe<Scalars['Int']['input']>;
  currentWeight?: InputMaybe<Scalars['Float']['input']>;
  dailySteps?: InputMaybe<Scalars['Int']['input']>;
  fat?: InputMaybe<Scalars['Int']['input']>;
  goalWeight?: InputMaybe<Scalars['Float']['input']>;
  protein?: InputMaybe<Scalars['Int']['input']>;
  startingWeight?: InputMaybe<Scalars['Float']['input']>;
};

export type GoalsResponse = {
  __typename?: 'GoalsResponse';
  data?: Maybe<Goals>;
  errors?: Maybe<Array<GoalsFieldError>>;
};

export type LogoutUserResponse = {
  __typename?: 'LogoutUserResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addFood: FoodResponse;
  addFoodsv2: FoodResponseSimple;
  addNutrition: NutritionResponse;
  addNutritionWithFood: NutritionResponse;
  addNutritionWithFoods: NutritionResponse;
  createUser: UserResponse;
  createWorkout: WorkoutResponse;
  deleteExercise: Scalars['Boolean']['output'];
  deleteFoodFromMealByDate: FoodResponseSuccess;
  deleteWorkout: Scalars['Boolean']['output'];
  editWorkout: WorkoutResponse;
  finishUserSetup: UserResponse;
  googleOauthHandler: SessionResponse;
  loginUserWithEmailAndPassword: UserResponse;
  logoutUser: LogoutUserResponse;
  updateUser: UserResponse;
  upsertUserGoals: GoalsResponse;
};


export type MutationAddFoodArgs = {
  date: Scalars['DateTime']['input'];
  foodInput: FoodInput;
  nutritionId: Scalars['Int']['input'];
};


export type MutationAddFoodsv2Args = {
  foodInput: Array<FoodInput>;
  nutritionId: Scalars['Int']['input'];
};


export type MutationAddNutritionArgs = {
  nutritionInput: NutritionInput;
};


export type MutationAddNutritionWithFoodArgs = {
  foods: FoodsInput;
  nutritionInput: NutritionInput;
};


export type MutationAddNutritionWithFoodsArgs = {
  foods: Array<FoodsInput>;
  nutritionInput: NutritionInput;
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationCreateWorkoutArgs = {
  bodyweight?: InputMaybe<Scalars['Float']['input']>;
  endTime: Scalars['String']['input'];
  exercises?: InputMaybe<Array<ExercisesInput>>;
  name: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  startTime: Scalars['String']['input'];
};


export type MutationDeleteExerciseArgs = {
  exerciseId: Scalars['Float']['input'];
};


export type MutationDeleteFoodFromMealByDateArgs = {
  date?: InputMaybe<Scalars['DateTime']['input']>;
  foodId: Scalars['Int']['input'];
  mealName: Scalars['String']['input'];
};


export type MutationDeleteWorkoutArgs = {
  workoutId: Scalars['Float']['input'];
};


export type MutationEditWorkoutArgs = {
  bodyweight?: InputMaybe<Scalars['Float']['input']>;
  endTime: Scalars['String']['input'];
  exercises?: InputMaybe<Array<CurrExercises>>;
  name: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  startTime: Scalars['String']['input'];
  workoutId: Scalars['Float']['input'];
};


export type MutationFinishUserSetupArgs = {
  currentWeight: Scalars['Float']['input'];
  gender: Scalars['String']['input'];
  goalWeight: Scalars['Float']['input'];
  weightGoal: Scalars['String']['input'];
};


export type MutationGoogleOauthHandlerArgs = {
  code: Scalars['String']['input'];
};


export type MutationLoginUserWithEmailAndPasswordArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  email: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationUpsertUserGoalsArgs = {
  goalsInput: GoalsInput;
};

export type Nutrition = {
  __typename?: 'Nutrition';
  calories?: Maybe<Scalars['Int']['output']>;
  carbohydrate?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  date: Scalars['DateTime']['output'];
  fat?: Maybe<Scalars['Int']['output']>;
  foods: Array<Food>;
  id: Scalars['ID']['output'];
  protein?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['ID']['output'];
};

export type NutritionFieldError = {
  __typename?: 'NutritionFieldError';
  field: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type NutritionInput = {
  calories?: InputMaybe<Scalars['Int']['input']>;
  carbohydrate?: InputMaybe<Scalars['Int']['input']>;
  date: Scalars['DateTime']['input'];
  fat?: InputMaybe<Scalars['Int']['input']>;
  protein?: InputMaybe<Scalars['Int']['input']>;
};

export type NutritionResponse = {
  __typename?: 'NutritionResponse';
  data?: Maybe<Nutrition>;
  errors?: Maybe<Array<NutritionFieldError>>;
};

export type NutritionResponseIterable = {
  __typename?: 'NutritionResponseIterable';
  data?: Maybe<Array<Nutrition>>;
  errors?: Maybe<Array<NutritionFieldError>>;
};

export type Profile = {
  __typename?: 'Profile';
  avatar?: Maybe<Scalars['String']['output']>;
  avatarId?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  user: Array<User>;
  userId: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getCurrentUser?: Maybe<UserResponse>;
  getCurrentUsersFood: FoodResponseIterable;
  getCurrentUsersFoodByDate: FoodResponseIterable;
  getCurrentUsersGoals: GoalsResponse;
  getCurrentUsersNutrition: NutritionResponseIterable;
  getCurrentUsersNutritionByDate: NutritionResponse;
  getCurrentUsersRemainingCaloriesByDate: Scalars['Int']['output'];
  getUsersWorkoutByDate: WorkoutResponse;
  getUsersWorkouts: WorkoutResponseIterable;
};


export type QueryGetCurrentUsersFoodByDateArgs = {
  date?: InputMaybe<Scalars['DateTime']['input']>;
};


export type QueryGetCurrentUsersNutritionByDateArgs = {
  date?: InputMaybe<Scalars['DateTime']['input']>;
};


export type QueryGetCurrentUsersRemainingCaloriesByDateArgs = {
  date?: InputMaybe<Scalars['DateTime']['input']>;
};


export type QueryGetUsersWorkoutByDateArgs = {
  date?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Session = {
  __typename?: 'Session';
  createdAt: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: Array<User>;
  userAgent: Scalars['String']['output'];
  userId: Scalars['String']['output'];
  valid: Scalars['Boolean']['output'];
};

export type SessionFieldError = {
  __typename?: 'SessionFieldError';
  field: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type SessionResponse = {
  __typename?: 'SessionResponse';
  data?: Maybe<TokenResponse>;
  errors?: Maybe<Array<SessionFieldError>>;
};

export type StrengthSet = {
  __typename?: 'StrengthSet';
  createdAt: Scalars['DateTime']['output'];
  exercise: Exercise;
  exerciseId: Scalars['ID']['output'];
  id: Scalars['Int']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  reps?: Maybe<Scalars['String']['output']>;
  setNumber?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  weight?: Maybe<Scalars['String']['output']>;
};

export type StrengthSetInput = {
  notes?: InputMaybe<Scalars['String']['input']>;
  reps?: InputMaybe<Scalars['String']['input']>;
  setNumber?: InputMaybe<Scalars['Int']['input']>;
  weight?: InputMaybe<Scalars['String']['input']>;
};

export type TokenResponse = {
  __typename?: 'TokenResponse';
  access_token: Scalars['String']['output'];
  id_token: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  gender: Scalars['String']['output'];
  hasGoals: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  profile?: Maybe<Profile>;
  session?: Maybe<Session>;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type UserFieldError = {
  __typename?: 'UserFieldError';
  field: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  data?: Maybe<User>;
  errors?: Maybe<Array<UserFieldError>>;
};

export type Workout = {
  __typename?: 'Workout';
  bodyweight?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTime']['output'];
  endTime: Scalars['String']['output'];
  exercises: Array<Exercise>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  startTime: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type WorkoutFieldError = {
  __typename?: 'WorkoutFieldError';
  field: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type WorkoutResponse = {
  __typename?: 'WorkoutResponse';
  data?: Maybe<Workout>;
  errors?: Maybe<WorkoutFieldError>;
};

export type WorkoutResponseIterable = {
  __typename?: 'WorkoutResponseIterable';
  data?: Maybe<Array<Workout>>;
  errors?: Maybe<Array<WorkoutFieldError>>;
};

export type AddFoodMutationVariables = Exact<{
  foodInput: FoodInput;
  date: Scalars['DateTime']['input'];
  nutritionId: Scalars['Int']['input'];
}>;


export type AddFoodMutation = { __typename?: 'Mutation', addFood: { __typename?: 'FoodResponse', errors?: Array<{ __typename?: 'FoodFieldError', field: string, message: string }> | null, data?: { __typename?: 'Food', id: string, createdAt: any, updatedAt: any, name: string, mealName: string, numOfServings: number, servingSize: string, calories: number, protein: number, fat: number, carbohydrate: number, sugar: number, sodium: number, userId: string, nutritionId: string } | null } };

export type AddNutritionMutationVariables = Exact<{
  nutritionInput: NutritionInput;
}>;


export type AddNutritionMutation = { __typename?: 'Mutation', addNutrition: { __typename?: 'NutritionResponse', errors?: Array<{ __typename?: 'NutritionFieldError', field: string, message: string }> | null, data?: { __typename?: 'Nutrition', id: string, createdAt: any, updatedAt: any, date: any, calories?: number | null, protein?: number | null, fat?: number | null, carbohydrate?: number | null, userId: string } | null } };

export type AddNutritionWithFoodsMutationVariables = Exact<{
  foods: Array<FoodsInput> | FoodsInput;
  nutritionInput: NutritionInput;
}>;


export type AddNutritionWithFoodsMutation = { __typename?: 'Mutation', addNutritionWithFoods: { __typename?: 'NutritionResponse', errors?: Array<{ __typename?: 'NutritionFieldError', field: string, message: string }> | null, data?: { __typename?: 'Nutrition', id: string, createdAt: any, updatedAt: any, date: any, calories?: number | null, protein?: number | null, fat?: number | null, carbohydrate?: number | null, userId: string } | null } };

export type CreateUserMutationVariables = Exact<{
  password: Scalars['String']['input'];
  email: Scalars['String']['input'];
  username: Scalars['String']['input'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserResponse', data?: { __typename?: 'User', username: string, email: string, id: string, profile?: { __typename?: 'Profile', id: string, bio?: string | null, avatar?: string | null } | null } | null, errors?: Array<{ __typename?: 'UserFieldError', field: string, message: string }> | null } };

export type CreateWorkoutMutationVariables = Exact<{
  exercises: Array<ExercisesInput> | ExercisesInput;
  endTime: Scalars['String']['input'];
  startTime: Scalars['String']['input'];
  name: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  bodyweight?: InputMaybe<Scalars['Float']['input']>;
}>;


export type CreateWorkoutMutation = { __typename?: 'Mutation', createWorkout: { __typename?: 'WorkoutResponse', errors?: { __typename?: 'WorkoutFieldError', field: string, message: string } | null, data?: { __typename?: 'Workout', id: number, createdAt: any, updatedAt: any, name: string, startTime: string, endTime: string, bodyweight?: number | null, notes?: string | null, userId: string, exercises: Array<{ __typename?: 'Exercise', id: number, createdAt: any, updatedAt: any, name: string, category: string, exerciseType: string, unilateral?: boolean | null, workoutId: number, strengthSets: Array<{ __typename?: 'StrengthSet', id: number, createdAt: any, updatedAt: any, setNumber?: number | null, weight?: string | null, reps?: string | null, notes?: string | null, exerciseId: string }>, cardioSets: Array<{ __typename?: 'CardioSet', id: number, createdAt: any, updatedAt: any, setNumber?: number | null, minutes?: string | null, seconds?: string | null, distance?: string | null, caloriesBurned?: string | null, notes?: string | null, exerciseId: string }> }> } | null } };

export type DeleteExerciseMutationVariables = Exact<{
  exerciseId: Scalars['Float']['input'];
}>;


export type DeleteExerciseMutation = { __typename?: 'Mutation', deleteExercise: boolean };

export type DeleteFoodFromMealByDateMutationVariables = Exact<{
  mealName: Scalars['String']['input'];
  foodId: Scalars['Int']['input'];
  date?: InputMaybe<Scalars['DateTime']['input']>;
}>;


export type DeleteFoodFromMealByDateMutation = { __typename?: 'Mutation', deleteFoodFromMealByDate: { __typename?: 'FoodResponseSuccess', message?: string | null, errors?: Array<{ __typename?: 'FoodFieldError', field: string, message: string }> | null } };

export type DeleteWorkoutMutationVariables = Exact<{
  workoutId: Scalars['Float']['input'];
}>;


export type DeleteWorkoutMutation = { __typename?: 'Mutation', deleteWorkout: boolean };

export type EditWorkoutMutationVariables = Exact<{
  endTime: Scalars['String']['input'];
  startTime: Scalars['String']['input'];
  name: Scalars['String']['input'];
  workoutId: Scalars['Float']['input'];
  bodyweight?: InputMaybe<Scalars['Float']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  exercises?: InputMaybe<Array<CurrExercises> | CurrExercises>;
}>;


export type EditWorkoutMutation = { __typename?: 'Mutation', editWorkout: { __typename?: 'WorkoutResponse', errors?: { __typename?: 'WorkoutFieldError', field: string, message: string } | null, data?: { __typename?: 'Workout', id: number, createdAt: any, updatedAt: any, name: string, startTime: string, endTime: string, bodyweight?: number | null, notes?: string | null, userId: string, exercises: Array<{ __typename?: 'Exercise', id: number, createdAt: any, updatedAt: any, name: string, category: string, exerciseType: string, unilateral?: boolean | null, workoutId: number, strengthSets: Array<{ __typename?: 'StrengthSet', id: number, createdAt: any, updatedAt: any, setNumber?: number | null, weight?: string | null, reps?: string | null, notes?: string | null, exerciseId: string }>, cardioSets: Array<{ __typename?: 'CardioSet', id: number, createdAt: any, updatedAt: any, setNumber?: number | null, minutes?: string | null, seconds?: string | null, distance?: string | null, caloriesBurned?: string | null, notes?: string | null, exerciseId: string }> }> } | null } };

export type FinishUserSetupMutationVariables = Exact<{
  goalWeight: Scalars['Float']['input'];
  currentWeight: Scalars['Float']['input'];
  gender: Scalars['String']['input'];
  weightGoal: Scalars['String']['input'];
}>;


export type FinishUserSetupMutation = { __typename?: 'Mutation', finishUserSetup: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'UserFieldError', field: string, message: string }> | null, data?: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, email: string, username: string, hasGoals: boolean, gender: string } | null } };

export type GoogleOauthHandlerMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type GoogleOauthHandlerMutation = { __typename?: 'Mutation', googleOauthHandler: { __typename?: 'SessionResponse', data?: { __typename?: 'TokenResponse', access_token: string, id_token: string } | null, errors?: Array<{ __typename?: 'SessionFieldError', field: string, message: string }> | null } };

export type LoginUserWithEmailAndPasswordMutationVariables = Exact<{
  password: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type LoginUserWithEmailAndPasswordMutation = { __typename?: 'Mutation', loginUserWithEmailAndPassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'UserFieldError', field: string, message: string }> | null, data?: { __typename?: 'User', username: string, email: string, updatedAt: any, createdAt: any, id: string, profile?: { __typename?: 'Profile', avatar?: string | null, bio?: string | null, id: string, avatarId?: string | null } | null } | null } };

export type LogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutation = { __typename?: 'Mutation', logoutUser: { __typename?: 'LogoutUserResponse', message: string, success: boolean } };

export type UpdateUserMutationVariables = Exact<{
  password: Scalars['String']['input'];
  email: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  username: Scalars['String']['input'];
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'UserFieldError', field: string, message: string }> | null, data?: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, email: string, username: string, hasGoals: boolean, gender: string } | null } };

export type UpsertUserGoalsMutationVariables = Exact<{
  goalsInput: GoalsInput;
}>;


export type UpsertUserGoalsMutation = { __typename?: 'Mutation', upsertUserGoals: { __typename?: 'GoalsResponse', errors?: Array<{ __typename?: 'GoalsFieldError', field: string, message: string }> | null, data?: { __typename?: 'Goals', id: string, createdAt: any, updatedAt: any, startingWeight?: number | null, currentWeight?: number | null, goalWeight?: number | null, calories?: number | null, protein?: number | null, fat?: number | null, carbohydrate?: number | null, userId: string } | null } };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser?: { __typename?: 'UserResponse', data?: { __typename?: 'User', id: string, email: string, username: string, hasGoals: boolean, gender: string, profile?: { __typename?: 'Profile', avatar?: string | null, bio?: string | null, id: string } | null, session?: { __typename?: 'Session', userId: string, valid: boolean, userAgent: string, createdAt: any, updatedAt: any } | null } | null } | null };

export type GetCurrentUsersFoodByDateQueryVariables = Exact<{
  date?: InputMaybe<Scalars['DateTime']['input']>;
}>;


export type GetCurrentUsersFoodByDateQuery = { __typename?: 'Query', getCurrentUsersFoodByDate: { __typename?: 'FoodResponseIterable', errors?: Array<{ __typename?: 'FoodFieldError', field: string, message: string }> | null, data?: Array<{ __typename?: 'Food', id: string, createdAt: any, updatedAt: any, name: string, mealName: string, numOfServings: number, servingSize: string, calories: number, protein: number, fat: number, carbohydrate: number, sugar: number, sodium: number, userId: string, nutritionId: string }> | null } };

export type GetCurrentUsersGoalsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUsersGoalsQuery = { __typename?: 'Query', getCurrentUsersGoals: { __typename?: 'GoalsResponse', errors?: Array<{ __typename?: 'GoalsFieldError', field: string, message: string }> | null, data?: { __typename?: 'Goals', id: string, createdAt: any, updatedAt: any, startingWeight?: number | null, currentWeight?: number | null, dailySteps: number, goalWeight?: number | null, calories?: number | null, protein?: number | null, fat?: number | null, carbohydrate?: number | null } | null } };

export type GetCurrentUsersRemainingCaloriesByDateQueryVariables = Exact<{
  date?: InputMaybe<Scalars['DateTime']['input']>;
}>;


export type GetCurrentUsersRemainingCaloriesByDateQuery = { __typename?: 'Query', getCurrentUsersRemainingCaloriesByDate: number };

export type GetUsersWorkoutByDateQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersWorkoutByDateQuery = { __typename?: 'Query', getUsersWorkoutByDate: { __typename?: 'WorkoutResponse', errors?: { __typename?: 'WorkoutFieldError', field: string, message: string } | null, data?: { __typename?: 'Workout', id: number, createdAt: any, updatedAt: any, name: string, startTime: string, endTime: string, bodyweight?: number | null, notes?: string | null, userId: string, exercises: Array<{ __typename?: 'Exercise', id: number, createdAt: any, updatedAt: any, name: string, category: string, exerciseType: string, unilateral?: boolean | null, workoutId: number }> } | null } };

export type GetCurrentUsersNutritionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUsersNutritionQuery = { __typename?: 'Query', getCurrentUsersNutrition: { __typename?: 'NutritionResponseIterable', errors?: Array<{ __typename?: 'NutritionFieldError', field: string, message: string }> | null, data?: Array<{ __typename?: 'Nutrition', id: string, createdAt: any, updatedAt: any, calories?: number | null, protein?: number | null, fat?: number | null, carbohydrate?: number | null, userId: string }> | null } };

export type GetCurrentUsersNutritionByDateQueryVariables = Exact<{
  date?: InputMaybe<Scalars['DateTime']['input']>;
}>;


export type GetCurrentUsersNutritionByDateQuery = { __typename?: 'Query', getCurrentUsersNutritionByDate: { __typename?: 'NutritionResponse', errors?: Array<{ __typename?: 'NutritionFieldError', field: string, message: string }> | null, data?: { __typename?: 'Nutrition', id: string, createdAt: any, updatedAt: any, date: any, calories?: number | null, protein?: number | null, fat?: number | null, carbohydrate?: number | null, userId: string } | null } };

export type GetUsersWorkoutsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersWorkoutsQuery = { __typename?: 'Query', getUsersWorkouts: { __typename?: 'WorkoutResponseIterable', errors?: Array<{ __typename?: 'WorkoutFieldError', field: string, message: string }> | null, data?: Array<{ __typename?: 'Workout', id: number, createdAt: any, updatedAt: any, name: string, startTime: string, endTime: string, bodyweight?: number | null, notes?: string | null, userId: string, exercises: Array<{ __typename?: 'Exercise', id: number, createdAt: any, updatedAt: any, name: string, category: string, exerciseType: string, unilateral?: boolean | null, workoutId: number, strengthSets: Array<{ __typename?: 'StrengthSet', id: number, createdAt: any, updatedAt: any, setNumber?: number | null, weight?: string | null, reps?: string | null, notes?: string | null, exerciseId: string }>, cardioSets: Array<{ __typename?: 'CardioSet', id: number, createdAt: any, updatedAt: any, setNumber?: number | null, minutes?: string | null, seconds?: string | null, distance?: string | null, caloriesBurned?: string | null, notes?: string | null, exerciseId: string }> }> }> | null } };


export const AddFoodDocument = /*#__PURE__*/ `
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
    `;
export const useAddFoodMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AddFoodMutation, TError, AddFoodMutationVariables, TContext>) =>
    useMutation<AddFoodMutation, TError, AddFoodMutationVariables, TContext>(
      ['AddFood'],
      (variables?: AddFoodMutationVariables) => customFetcher<AddFoodMutation, AddFoodMutationVariables>(AddFoodDocument, variables)(),
      options
    );
useAddFoodMutation.fetcher = (variables: AddFoodMutationVariables, options?: RequestInit['headers']) => customFetcher<AddFoodMutation, AddFoodMutationVariables>(AddFoodDocument, variables, options);
export const AddNutritionDocument = /*#__PURE__*/ `
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
    `;
export const useAddNutritionMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AddNutritionMutation, TError, AddNutritionMutationVariables, TContext>) =>
    useMutation<AddNutritionMutation, TError, AddNutritionMutationVariables, TContext>(
      ['AddNutrition'],
      (variables?: AddNutritionMutationVariables) => customFetcher<AddNutritionMutation, AddNutritionMutationVariables>(AddNutritionDocument, variables)(),
      options
    );
useAddNutritionMutation.fetcher = (variables: AddNutritionMutationVariables, options?: RequestInit['headers']) => customFetcher<AddNutritionMutation, AddNutritionMutationVariables>(AddNutritionDocument, variables, options);
export const AddNutritionWithFoodsDocument = /*#__PURE__*/ `
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
    `;
export const useAddNutritionWithFoodsMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AddNutritionWithFoodsMutation, TError, AddNutritionWithFoodsMutationVariables, TContext>) =>
    useMutation<AddNutritionWithFoodsMutation, TError, AddNutritionWithFoodsMutationVariables, TContext>(
      ['AddNutritionWithFoods'],
      (variables?: AddNutritionWithFoodsMutationVariables) => customFetcher<AddNutritionWithFoodsMutation, AddNutritionWithFoodsMutationVariables>(AddNutritionWithFoodsDocument, variables)(),
      options
    );
useAddNutritionWithFoodsMutation.fetcher = (variables: AddNutritionWithFoodsMutationVariables, options?: RequestInit['headers']) => customFetcher<AddNutritionWithFoodsMutation, AddNutritionWithFoodsMutationVariables>(AddNutritionWithFoodsDocument, variables, options);
export const CreateUserDocument = /*#__PURE__*/ `
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
    `;
export const useCreateUserMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateUserMutation, TError, CreateUserMutationVariables, TContext>) =>
    useMutation<CreateUserMutation, TError, CreateUserMutationVariables, TContext>(
      ['CreateUser'],
      (variables?: CreateUserMutationVariables) => customFetcher<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, variables)(),
      options
    );
useCreateUserMutation.fetcher = (variables: CreateUserMutationVariables, options?: RequestInit['headers']) => customFetcher<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, variables, options);
export const CreateWorkoutDocument = /*#__PURE__*/ `
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
    `;
export const useCreateWorkoutMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateWorkoutMutation, TError, CreateWorkoutMutationVariables, TContext>) =>
    useMutation<CreateWorkoutMutation, TError, CreateWorkoutMutationVariables, TContext>(
      ['CreateWorkout'],
      (variables?: CreateWorkoutMutationVariables) => customFetcher<CreateWorkoutMutation, CreateWorkoutMutationVariables>(CreateWorkoutDocument, variables)(),
      options
    );
useCreateWorkoutMutation.fetcher = (variables: CreateWorkoutMutationVariables, options?: RequestInit['headers']) => customFetcher<CreateWorkoutMutation, CreateWorkoutMutationVariables>(CreateWorkoutDocument, variables, options);
export const DeleteExerciseDocument = /*#__PURE__*/ `
    mutation DeleteExercise($exerciseId: Float!) {
  deleteExercise(exerciseId: $exerciseId)
}
    `;
export const useDeleteExerciseMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteExerciseMutation, TError, DeleteExerciseMutationVariables, TContext>) =>
    useMutation<DeleteExerciseMutation, TError, DeleteExerciseMutationVariables, TContext>(
      ['DeleteExercise'],
      (variables?: DeleteExerciseMutationVariables) => customFetcher<DeleteExerciseMutation, DeleteExerciseMutationVariables>(DeleteExerciseDocument, variables)(),
      options
    );
useDeleteExerciseMutation.fetcher = (variables: DeleteExerciseMutationVariables, options?: RequestInit['headers']) => customFetcher<DeleteExerciseMutation, DeleteExerciseMutationVariables>(DeleteExerciseDocument, variables, options);
export const DeleteFoodFromMealByDateDocument = /*#__PURE__*/ `
    mutation DeleteFoodFromMealByDate($mealName: String!, $foodId: Int!, $date: DateTime) {
  deleteFoodFromMealByDate(mealName: $mealName, foodId: $foodId, date: $date) {
    errors {
      field
      message
    }
    message
  }
}
    `;
export const useDeleteFoodFromMealByDateMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteFoodFromMealByDateMutation, TError, DeleteFoodFromMealByDateMutationVariables, TContext>) =>
    useMutation<DeleteFoodFromMealByDateMutation, TError, DeleteFoodFromMealByDateMutationVariables, TContext>(
      ['DeleteFoodFromMealByDate'],
      (variables?: DeleteFoodFromMealByDateMutationVariables) => customFetcher<DeleteFoodFromMealByDateMutation, DeleteFoodFromMealByDateMutationVariables>(DeleteFoodFromMealByDateDocument, variables)(),
      options
    );
useDeleteFoodFromMealByDateMutation.fetcher = (variables: DeleteFoodFromMealByDateMutationVariables, options?: RequestInit['headers']) => customFetcher<DeleteFoodFromMealByDateMutation, DeleteFoodFromMealByDateMutationVariables>(DeleteFoodFromMealByDateDocument, variables, options);
export const DeleteWorkoutDocument = /*#__PURE__*/ `
    mutation DeleteWorkout($workoutId: Float!) {
  deleteWorkout(workoutId: $workoutId)
}
    `;
export const useDeleteWorkoutMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteWorkoutMutation, TError, DeleteWorkoutMutationVariables, TContext>) =>
    useMutation<DeleteWorkoutMutation, TError, DeleteWorkoutMutationVariables, TContext>(
      ['DeleteWorkout'],
      (variables?: DeleteWorkoutMutationVariables) => customFetcher<DeleteWorkoutMutation, DeleteWorkoutMutationVariables>(DeleteWorkoutDocument, variables)(),
      options
    );
useDeleteWorkoutMutation.fetcher = (variables: DeleteWorkoutMutationVariables, options?: RequestInit['headers']) => customFetcher<DeleteWorkoutMutation, DeleteWorkoutMutationVariables>(DeleteWorkoutDocument, variables, options);
export const EditWorkoutDocument = /*#__PURE__*/ `
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
    `;
export const useEditWorkoutMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<EditWorkoutMutation, TError, EditWorkoutMutationVariables, TContext>) =>
    useMutation<EditWorkoutMutation, TError, EditWorkoutMutationVariables, TContext>(
      ['EditWorkout'],
      (variables?: EditWorkoutMutationVariables) => customFetcher<EditWorkoutMutation, EditWorkoutMutationVariables>(EditWorkoutDocument, variables)(),
      options
    );
useEditWorkoutMutation.fetcher = (variables: EditWorkoutMutationVariables, options?: RequestInit['headers']) => customFetcher<EditWorkoutMutation, EditWorkoutMutationVariables>(EditWorkoutDocument, variables, options);
export const FinishUserSetupDocument = /*#__PURE__*/ `
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
    `;
export const useFinishUserSetupMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<FinishUserSetupMutation, TError, FinishUserSetupMutationVariables, TContext>) =>
    useMutation<FinishUserSetupMutation, TError, FinishUserSetupMutationVariables, TContext>(
      ['FinishUserSetup'],
      (variables?: FinishUserSetupMutationVariables) => customFetcher<FinishUserSetupMutation, FinishUserSetupMutationVariables>(FinishUserSetupDocument, variables)(),
      options
    );
useFinishUserSetupMutation.fetcher = (variables: FinishUserSetupMutationVariables, options?: RequestInit['headers']) => customFetcher<FinishUserSetupMutation, FinishUserSetupMutationVariables>(FinishUserSetupDocument, variables, options);
export const GoogleOauthHandlerDocument = /*#__PURE__*/ `
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
    `;
export const useGoogleOauthHandlerMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<GoogleOauthHandlerMutation, TError, GoogleOauthHandlerMutationVariables, TContext>) =>
    useMutation<GoogleOauthHandlerMutation, TError, GoogleOauthHandlerMutationVariables, TContext>(
      ['googleOauthHandler'],
      (variables?: GoogleOauthHandlerMutationVariables) => customFetcher<GoogleOauthHandlerMutation, GoogleOauthHandlerMutationVariables>(GoogleOauthHandlerDocument, variables)(),
      options
    );
useGoogleOauthHandlerMutation.fetcher = (variables: GoogleOauthHandlerMutationVariables, options?: RequestInit['headers']) => customFetcher<GoogleOauthHandlerMutation, GoogleOauthHandlerMutationVariables>(GoogleOauthHandlerDocument, variables, options);
export const LoginUserWithEmailAndPasswordDocument = /*#__PURE__*/ `
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
    `;
export const useLoginUserWithEmailAndPasswordMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<LoginUserWithEmailAndPasswordMutation, TError, LoginUserWithEmailAndPasswordMutationVariables, TContext>) =>
    useMutation<LoginUserWithEmailAndPasswordMutation, TError, LoginUserWithEmailAndPasswordMutationVariables, TContext>(
      ['LoginUserWithEmailAndPassword'],
      (variables?: LoginUserWithEmailAndPasswordMutationVariables) => customFetcher<LoginUserWithEmailAndPasswordMutation, LoginUserWithEmailAndPasswordMutationVariables>(LoginUserWithEmailAndPasswordDocument, variables)(),
      options
    );
useLoginUserWithEmailAndPasswordMutation.fetcher = (variables: LoginUserWithEmailAndPasswordMutationVariables, options?: RequestInit['headers']) => customFetcher<LoginUserWithEmailAndPasswordMutation, LoginUserWithEmailAndPasswordMutationVariables>(LoginUserWithEmailAndPasswordDocument, variables, options);
export const LogoutUserDocument = /*#__PURE__*/ `
    mutation LogoutUser {
  logoutUser {
    message
    success
  }
}
    `;
export const useLogoutUserMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<LogoutUserMutation, TError, LogoutUserMutationVariables, TContext>) =>
    useMutation<LogoutUserMutation, TError, LogoutUserMutationVariables, TContext>(
      ['LogoutUser'],
      (variables?: LogoutUserMutationVariables) => customFetcher<LogoutUserMutation, LogoutUserMutationVariables>(LogoutUserDocument, variables)(),
      options
    );
useLogoutUserMutation.fetcher = (variables?: LogoutUserMutationVariables, options?: RequestInit['headers']) => customFetcher<LogoutUserMutation, LogoutUserMutationVariables>(LogoutUserDocument, variables, options);
export const UpdateUserDocument = /*#__PURE__*/ `
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
    `;
export const useUpdateUserMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>) =>
    useMutation<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>(
      ['UpdateUser'],
      (variables?: UpdateUserMutationVariables) => customFetcher<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, variables)(),
      options
    );
useUpdateUserMutation.fetcher = (variables: UpdateUserMutationVariables, options?: RequestInit['headers']) => customFetcher<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, variables, options);
export const UpsertUserGoalsDocument = /*#__PURE__*/ `
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
    `;
export const useUpsertUserGoalsMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpsertUserGoalsMutation, TError, UpsertUserGoalsMutationVariables, TContext>) =>
    useMutation<UpsertUserGoalsMutation, TError, UpsertUserGoalsMutationVariables, TContext>(
      ['UpsertUserGoals'],
      (variables?: UpsertUserGoalsMutationVariables) => customFetcher<UpsertUserGoalsMutation, UpsertUserGoalsMutationVariables>(UpsertUserGoalsDocument, variables)(),
      options
    );
useUpsertUserGoalsMutation.fetcher = (variables: UpsertUserGoalsMutationVariables, options?: RequestInit['headers']) => customFetcher<UpsertUserGoalsMutation, UpsertUserGoalsMutationVariables>(UpsertUserGoalsDocument, variables, options);
export const GetCurrentUserDocument = /*#__PURE__*/ `
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
    `;
export const useGetCurrentUserQuery = <
      TData = GetCurrentUserQuery,
      TError = unknown
    >(
      variables?: GetCurrentUserQueryVariables,
      options?: UseQueryOptions<GetCurrentUserQuery, TError, TData>
    ) =>
    useQuery<GetCurrentUserQuery, TError, TData>(
      variables === undefined ? ['GetCurrentUser'] : ['GetCurrentUser', variables],
      customFetcher<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, variables),
      options
    );
useGetCurrentUserQuery.document = GetCurrentUserDocument;


useGetCurrentUserQuery.getKey = (variables?: GetCurrentUserQueryVariables) => variables === undefined ? ['GetCurrentUser'] : ['GetCurrentUser', variables];
;

useGetCurrentUserQuery.fetcher = (variables?: GetCurrentUserQueryVariables, options?: RequestInit['headers']) => customFetcher<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, variables, options);
export const GetCurrentUsersFoodByDateDocument = /*#__PURE__*/ `
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
    `;
export const useGetCurrentUsersFoodByDateQuery = <
      TData = GetCurrentUsersFoodByDateQuery,
      TError = unknown
    >(
      variables?: GetCurrentUsersFoodByDateQueryVariables,
      options?: UseQueryOptions<GetCurrentUsersFoodByDateQuery, TError, TData>
    ) =>
    useQuery<GetCurrentUsersFoodByDateQuery, TError, TData>(
      variables === undefined ? ['GetCurrentUsersFoodByDate'] : ['GetCurrentUsersFoodByDate', variables],
      customFetcher<GetCurrentUsersFoodByDateQuery, GetCurrentUsersFoodByDateQueryVariables>(GetCurrentUsersFoodByDateDocument, variables),
      options
    );
useGetCurrentUsersFoodByDateQuery.document = GetCurrentUsersFoodByDateDocument;


useGetCurrentUsersFoodByDateQuery.getKey = (variables?: GetCurrentUsersFoodByDateQueryVariables) => variables === undefined ? ['GetCurrentUsersFoodByDate'] : ['GetCurrentUsersFoodByDate', variables];
;

useGetCurrentUsersFoodByDateQuery.fetcher = (variables?: GetCurrentUsersFoodByDateQueryVariables, options?: RequestInit['headers']) => customFetcher<GetCurrentUsersFoodByDateQuery, GetCurrentUsersFoodByDateQueryVariables>(GetCurrentUsersFoodByDateDocument, variables, options);
export const GetCurrentUsersGoalsDocument = /*#__PURE__*/ `
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
    `;
export const useGetCurrentUsersGoalsQuery = <
      TData = GetCurrentUsersGoalsQuery,
      TError = unknown
    >(
      variables?: GetCurrentUsersGoalsQueryVariables,
      options?: UseQueryOptions<GetCurrentUsersGoalsQuery, TError, TData>
    ) =>
    useQuery<GetCurrentUsersGoalsQuery, TError, TData>(
      variables === undefined ? ['GetCurrentUsersGoals'] : ['GetCurrentUsersGoals', variables],
      customFetcher<GetCurrentUsersGoalsQuery, GetCurrentUsersGoalsQueryVariables>(GetCurrentUsersGoalsDocument, variables),
      options
    );
useGetCurrentUsersGoalsQuery.document = GetCurrentUsersGoalsDocument;


useGetCurrentUsersGoalsQuery.getKey = (variables?: GetCurrentUsersGoalsQueryVariables) => variables === undefined ? ['GetCurrentUsersGoals'] : ['GetCurrentUsersGoals', variables];
;

useGetCurrentUsersGoalsQuery.fetcher = (variables?: GetCurrentUsersGoalsQueryVariables, options?: RequestInit['headers']) => customFetcher<GetCurrentUsersGoalsQuery, GetCurrentUsersGoalsQueryVariables>(GetCurrentUsersGoalsDocument, variables, options);
export const GetCurrentUsersRemainingCaloriesByDateDocument = /*#__PURE__*/ `
    query GetCurrentUsersRemainingCaloriesByDate($date: DateTime) {
  getCurrentUsersRemainingCaloriesByDate(date: $date)
}
    `;
export const useGetCurrentUsersRemainingCaloriesByDateQuery = <
      TData = GetCurrentUsersRemainingCaloriesByDateQuery,
      TError = unknown
    >(
      variables?: GetCurrentUsersRemainingCaloriesByDateQueryVariables,
      options?: UseQueryOptions<GetCurrentUsersRemainingCaloriesByDateQuery, TError, TData>
    ) =>
    useQuery<GetCurrentUsersRemainingCaloriesByDateQuery, TError, TData>(
      variables === undefined ? ['GetCurrentUsersRemainingCaloriesByDate'] : ['GetCurrentUsersRemainingCaloriesByDate', variables],
      customFetcher<GetCurrentUsersRemainingCaloriesByDateQuery, GetCurrentUsersRemainingCaloriesByDateQueryVariables>(GetCurrentUsersRemainingCaloriesByDateDocument, variables),
      options
    );
useGetCurrentUsersRemainingCaloriesByDateQuery.document = GetCurrentUsersRemainingCaloriesByDateDocument;


useGetCurrentUsersRemainingCaloriesByDateQuery.getKey = (variables?: GetCurrentUsersRemainingCaloriesByDateQueryVariables) => variables === undefined ? ['GetCurrentUsersRemainingCaloriesByDate'] : ['GetCurrentUsersRemainingCaloriesByDate', variables];
;

useGetCurrentUsersRemainingCaloriesByDateQuery.fetcher = (variables?: GetCurrentUsersRemainingCaloriesByDateQueryVariables, options?: RequestInit['headers']) => customFetcher<GetCurrentUsersRemainingCaloriesByDateQuery, GetCurrentUsersRemainingCaloriesByDateQueryVariables>(GetCurrentUsersRemainingCaloriesByDateDocument, variables, options);
export const GetUsersWorkoutByDateDocument = /*#__PURE__*/ `
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
    `;
export const useGetUsersWorkoutByDateQuery = <
      TData = GetUsersWorkoutByDateQuery,
      TError = unknown
    >(
      variables?: GetUsersWorkoutByDateQueryVariables,
      options?: UseQueryOptions<GetUsersWorkoutByDateQuery, TError, TData>
    ) =>
    useQuery<GetUsersWorkoutByDateQuery, TError, TData>(
      variables === undefined ? ['GetUsersWorkoutByDate'] : ['GetUsersWorkoutByDate', variables],
      customFetcher<GetUsersWorkoutByDateQuery, GetUsersWorkoutByDateQueryVariables>(GetUsersWorkoutByDateDocument, variables),
      options
    );
useGetUsersWorkoutByDateQuery.document = GetUsersWorkoutByDateDocument;


useGetUsersWorkoutByDateQuery.getKey = (variables?: GetUsersWorkoutByDateQueryVariables) => variables === undefined ? ['GetUsersWorkoutByDate'] : ['GetUsersWorkoutByDate', variables];
;

useGetUsersWorkoutByDateQuery.fetcher = (variables?: GetUsersWorkoutByDateQueryVariables, options?: RequestInit['headers']) => customFetcher<GetUsersWorkoutByDateQuery, GetUsersWorkoutByDateQueryVariables>(GetUsersWorkoutByDateDocument, variables, options);
export const GetCurrentUsersNutritionDocument = /*#__PURE__*/ `
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
    `;
export const useGetCurrentUsersNutritionQuery = <
      TData = GetCurrentUsersNutritionQuery,
      TError = unknown
    >(
      variables?: GetCurrentUsersNutritionQueryVariables,
      options?: UseQueryOptions<GetCurrentUsersNutritionQuery, TError, TData>
    ) =>
    useQuery<GetCurrentUsersNutritionQuery, TError, TData>(
      variables === undefined ? ['GetCurrentUsersNutrition'] : ['GetCurrentUsersNutrition', variables],
      customFetcher<GetCurrentUsersNutritionQuery, GetCurrentUsersNutritionQueryVariables>(GetCurrentUsersNutritionDocument, variables),
      options
    );
useGetCurrentUsersNutritionQuery.document = GetCurrentUsersNutritionDocument;


useGetCurrentUsersNutritionQuery.getKey = (variables?: GetCurrentUsersNutritionQueryVariables) => variables === undefined ? ['GetCurrentUsersNutrition'] : ['GetCurrentUsersNutrition', variables];
;

useGetCurrentUsersNutritionQuery.fetcher = (variables?: GetCurrentUsersNutritionQueryVariables, options?: RequestInit['headers']) => customFetcher<GetCurrentUsersNutritionQuery, GetCurrentUsersNutritionQueryVariables>(GetCurrentUsersNutritionDocument, variables, options);
export const GetCurrentUsersNutritionByDateDocument = /*#__PURE__*/ `
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
    `;
export const useGetCurrentUsersNutritionByDateQuery = <
      TData = GetCurrentUsersNutritionByDateQuery,
      TError = unknown
    >(
      variables?: GetCurrentUsersNutritionByDateQueryVariables,
      options?: UseQueryOptions<GetCurrentUsersNutritionByDateQuery, TError, TData>
    ) =>
    useQuery<GetCurrentUsersNutritionByDateQuery, TError, TData>(
      variables === undefined ? ['GetCurrentUsersNutritionByDate'] : ['GetCurrentUsersNutritionByDate', variables],
      customFetcher<GetCurrentUsersNutritionByDateQuery, GetCurrentUsersNutritionByDateQueryVariables>(GetCurrentUsersNutritionByDateDocument, variables),
      options
    );
useGetCurrentUsersNutritionByDateQuery.document = GetCurrentUsersNutritionByDateDocument;


useGetCurrentUsersNutritionByDateQuery.getKey = (variables?: GetCurrentUsersNutritionByDateQueryVariables) => variables === undefined ? ['GetCurrentUsersNutritionByDate'] : ['GetCurrentUsersNutritionByDate', variables];
;

useGetCurrentUsersNutritionByDateQuery.fetcher = (variables?: GetCurrentUsersNutritionByDateQueryVariables, options?: RequestInit['headers']) => customFetcher<GetCurrentUsersNutritionByDateQuery, GetCurrentUsersNutritionByDateQueryVariables>(GetCurrentUsersNutritionByDateDocument, variables, options);
export const GetUsersWorkoutsDocument = /*#__PURE__*/ `
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
    `;
export const useGetUsersWorkoutsQuery = <
      TData = GetUsersWorkoutsQuery,
      TError = unknown
    >(
      variables?: GetUsersWorkoutsQueryVariables,
      options?: UseQueryOptions<GetUsersWorkoutsQuery, TError, TData>
    ) =>
    useQuery<GetUsersWorkoutsQuery, TError, TData>(
      variables === undefined ? ['GetUsersWorkouts'] : ['GetUsersWorkouts', variables],
      customFetcher<GetUsersWorkoutsQuery, GetUsersWorkoutsQueryVariables>(GetUsersWorkoutsDocument, variables),
      options
    );
useGetUsersWorkoutsQuery.document = GetUsersWorkoutsDocument;


useGetUsersWorkoutsQuery.getKey = (variables?: GetUsersWorkoutsQueryVariables) => variables === undefined ? ['GetUsersWorkouts'] : ['GetUsersWorkouts', variables];
;

useGetUsersWorkoutsQuery.fetcher = (variables?: GetUsersWorkoutsQueryVariables, options?: RequestInit['headers']) => customFetcher<GetUsersWorkoutsQuery, GetUsersWorkoutsQueryVariables>(GetUsersWorkoutsDocument, variables, options);