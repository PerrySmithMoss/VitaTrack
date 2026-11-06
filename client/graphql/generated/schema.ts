export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: unknown; output: unknown };
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
