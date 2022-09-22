import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { customFetcher } from '../fetcher';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type CardioSet = {
  __typename?: 'CardioSet';
  caloriesBurned?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  distance?: Maybe<Scalars['String']>;
  exercise: Exercise;
  exerciseId: Scalars['ID'];
  id: Scalars['ID'];
  minutes?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  seconds?: Maybe<Scalars['String']>;
  setNumber?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['DateTime'];
};

export type CardioSetInput = {
  caloriesBurned?: InputMaybe<Scalars['String']>;
  distance?: InputMaybe<Scalars['String']>;
  minutes?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  seconds?: InputMaybe<Scalars['String']>;
  setNumber?: InputMaybe<Scalars['Int']>;
};

export type Exercise = {
  __typename?: 'Exercise';
  cardioSets: Array<CardioSet>;
  category: Scalars['String'];
  createdAt: Scalars['DateTime'];
  exerciseType: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  strengthSets: Array<StrengthSet>;
  unilateral?: Maybe<Scalars['Boolean']>;
  updatedAt: Scalars['DateTime'];
  workout: Workout;
  workoutId: Scalars['Int'];
};

export type ExercisesInput = {
  cardioSets?: InputMaybe<Array<CardioSetInput>>;
  category: Scalars['String'];
  exerciseType: Scalars['String'];
  name: Scalars['String'];
  strengthSets?: InputMaybe<Array<StrengthSetInput>>;
  unilateral?: InputMaybe<Scalars['Boolean']>;
};

export type Goals = {
  __typename?: 'Goals';
  calories?: Maybe<Scalars['Int']>;
  carbohydrate?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  currentWeight?: Maybe<Scalars['Float']>;
  fat?: Maybe<Scalars['Int']>;
  goalWeight?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  protein?: Maybe<Scalars['Int']>;
  startingWeight?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['ID'];
};

export type GoalsFieldError = {
  __typename?: 'GoalsFieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type GoalsInput = {
  calories?: InputMaybe<Scalars['Int']>;
  carbohydrate?: InputMaybe<Scalars['Int']>;
  currentWeight?: InputMaybe<Scalars['Float']>;
  fat?: InputMaybe<Scalars['Int']>;
  goalWeight?: InputMaybe<Scalars['Float']>;
  protein?: InputMaybe<Scalars['Int']>;
  startingWeight?: InputMaybe<Scalars['Float']>;
};

export type GoalsResponse = {
  __typename?: 'GoalsResponse';
  data?: Maybe<Goals>;
  errors?: Maybe<Array<GoalsFieldError>>;
};

export type LogoutUserResponse = {
  __typename?: 'LogoutUserResponse';
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: UserResponse;
  createWorkout: WorkoutResponse;
  googleOauthHandler: SessionResponse;
  loginUserWithEmailAndPassword: UserResponse;
  logoutUser: LogoutUserResponse;
  upsertUserGoals: GoalsResponse;
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationCreateWorkoutArgs = {
  bodyweight?: InputMaybe<Scalars['Float']>;
  endTime: Scalars['String'];
  exercises?: InputMaybe<Array<ExercisesInput>>;
  name: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  startTime: Scalars['String'];
};


export type MutationGoogleOauthHandlerArgs = {
  code: Scalars['String'];
};


export type MutationLoginUserWithEmailAndPasswordArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpsertUserGoalsArgs = {
  goalsInput: GoalsInput;
};

export type Profile = {
  __typename?: 'Profile';
  avatar?: Maybe<Scalars['String']>;
  avatarId?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  user: Array<User>;
  userId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getCurrentUser?: Maybe<UserResponse>;
  getCurrentUsersGoals: GoalsResponse;
  getUsersWorkouts: WorkoutResponseIterable;
};

export type Session = {
  __typename?: 'Session';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user: Array<User>;
  userAgent: Scalars['String'];
  userId: Scalars['String'];
  valid: Scalars['Boolean'];
};

export type SessionFieldError = {
  __typename?: 'SessionFieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type SessionResponse = {
  __typename?: 'SessionResponse';
  data?: Maybe<TokenResponse>;
  errors?: Maybe<Array<SessionFieldError>>;
};

export type StrengthSet = {
  __typename?: 'StrengthSet';
  createdAt: Scalars['DateTime'];
  exercise: Exercise;
  exerciseId: Scalars['ID'];
  id: Scalars['ID'];
  notes?: Maybe<Scalars['String']>;
  reps?: Maybe<Scalars['String']>;
  setNumber?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['DateTime'];
  weight?: Maybe<Scalars['String']>;
};

export type StrengthSetInput = {
  notes?: InputMaybe<Scalars['String']>;
  reps?: InputMaybe<Scalars['String']>;
  setNumber?: InputMaybe<Scalars['Int']>;
  weight?: InputMaybe<Scalars['String']>;
};

export type TokenResponse = {
  __typename?: 'TokenResponse';
  access_token: Scalars['String'];
  id_token: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['String'];
  profile?: Maybe<Profile>;
  session?: Maybe<Session>;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserFieldError = {
  __typename?: 'UserFieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  data?: Maybe<User>;
  errors?: Maybe<Array<UserFieldError>>;
};

export type Workout = {
  __typename?: 'Workout';
  bodyweight?: Maybe<Scalars['Float']>;
  createdAt: Scalars['DateTime'];
  endTime: Scalars['String'];
  exercises: Array<Exercise>;
  id: Scalars['ID'];
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  startTime: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
};

export type WorkoutFieldError = {
  __typename?: 'WorkoutFieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type WorkoutResponse = {
  __typename?: 'WorkoutResponse';
  data?: Maybe<Workout>;
  errors?: Maybe<Array<WorkoutFieldError>>;
};

export type WorkoutResponseIterable = {
  __typename?: 'WorkoutResponseIterable';
  data?: Maybe<Array<Workout>>;
  errors?: Maybe<Array<WorkoutFieldError>>;
};

export type CreateUserMutationVariables = Exact<{
  password: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserResponse', data?: { __typename?: 'User', username: string, email: string, id: string, profile?: { __typename?: 'Profile', id: string, bio?: string | null, avatar?: string | null } | null } | null, errors?: Array<{ __typename?: 'UserFieldError', field: string, message: string }> | null } };

export type CreateWorkoutMutationVariables = Exact<{
  exercises: Array<ExercisesInput> | ExercisesInput;
  endTime: Scalars['String'];
  startTime: Scalars['String'];
  name: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  bodyweight?: InputMaybe<Scalars['Float']>;
}>;


export type CreateWorkoutMutation = { __typename?: 'Mutation', createWorkout: { __typename?: 'WorkoutResponse', errors?: Array<{ __typename?: 'WorkoutFieldError', field: string, message: string }> | null, data?: { __typename?: 'Workout', id: string, createdAt: any, updatedAt: any, name: string, startTime: string, endTime: string, bodyweight?: number | null, notes?: string | null, userId: string, exercises: Array<{ __typename?: 'Exercise', id: string, createdAt: any, updatedAt: any, name: string, category: string, exerciseType: string, unilateral?: boolean | null, workoutId: number, strengthSets: Array<{ __typename?: 'StrengthSet', id: string, createdAt: any, updatedAt: any, setNumber?: number | null, weight?: string | null, reps?: string | null, notes?: string | null, exerciseId: string }>, cardioSets: Array<{ __typename?: 'CardioSet', id: string, createdAt: any, updatedAt: any, setNumber?: number | null, minutes?: string | null, seconds?: string | null, distance?: string | null, caloriesBurned?: string | null, notes?: string | null, exerciseId: string }> }> } | null } };

export type GoogleOauthHandlerMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type GoogleOauthHandlerMutation = { __typename?: 'Mutation', googleOauthHandler: { __typename?: 'SessionResponse', data?: { __typename?: 'TokenResponse', access_token: string, id_token: string } | null, errors?: Array<{ __typename?: 'SessionFieldError', field: string, message: string }> | null } };

export type LoginUserWithEmailAndPasswordMutationVariables = Exact<{
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type LoginUserWithEmailAndPasswordMutation = { __typename?: 'Mutation', loginUserWithEmailAndPassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'UserFieldError', field: string, message: string }> | null, data?: { __typename?: 'User', username: string, email: string, updatedAt: any, createdAt: any, id: string, profile?: { __typename?: 'Profile', avatar?: string | null, bio?: string | null, id: string, avatarId?: string | null } | null } | null } };

export type LogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutation = { __typename?: 'Mutation', logoutUser: { __typename?: 'LogoutUserResponse', message: string, success: boolean } };

export type UpsertUserGoalsMutationVariables = Exact<{
  goalsInput: GoalsInput;
}>;


export type UpsertUserGoalsMutation = { __typename?: 'Mutation', upsertUserGoals: { __typename?: 'GoalsResponse', errors?: Array<{ __typename?: 'GoalsFieldError', field: string, message: string }> | null, data?: { __typename?: 'Goals', id: string, createdAt: any, updatedAt: any, startingWeight?: number | null, currentWeight?: number | null, goalWeight?: number | null, calories?: number | null, protein?: number | null, fat?: number | null, carbohydrate?: number | null, userId: string } | null } };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser?: { __typename?: 'UserResponse', data?: { __typename?: 'User', id: string, email: string, username: string, profile?: { __typename?: 'Profile', avatar?: string | null, bio?: string | null, id: string } | null, session?: { __typename?: 'Session', userId: string, valid: boolean, userAgent: string, createdAt: any, updatedAt: any } | null } | null } | null };

export type GetCurrentUsersGoalsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUsersGoalsQuery = { __typename?: 'Query', getCurrentUsersGoals: { __typename?: 'GoalsResponse', errors?: Array<{ __typename?: 'GoalsFieldError', field: string, message: string }> | null, data?: { __typename?: 'Goals', id: string, createdAt: any, updatedAt: any, startingWeight?: number | null, currentWeight?: number | null, goalWeight?: number | null, calories?: number | null, protein?: number | null, fat?: number | null, carbohydrate?: number | null } | null } };

export type GetUsersWorkoutsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersWorkoutsQuery = { __typename?: 'Query', getUsersWorkouts: { __typename?: 'WorkoutResponseIterable', errors?: Array<{ __typename?: 'WorkoutFieldError', field: string, message: string }> | null, data?: Array<{ __typename?: 'Workout', id: string, createdAt: any, updatedAt: any, name: string, startTime: string, endTime: string, bodyweight?: number | null, notes?: string | null, userId: string, exercises: Array<{ __typename?: 'Exercise', id: string, createdAt: any, updatedAt: any, name: string, category: string, exerciseType: string, unilateral?: boolean | null, workoutId: number, strengthSets: Array<{ __typename?: 'StrengthSet', id: string, createdAt: any, updatedAt: any, setNumber?: number | null, weight?: string | null, reps?: string | null, notes?: string | null, exerciseId: string }>, cardioSets: Array<{ __typename?: 'CardioSet', id: string, createdAt: any, updatedAt: any, setNumber?: number | null, minutes?: string | null, seconds?: string | null, distance?: string | null, caloriesBurned?: string | null, notes?: string | null, exerciseId: string }> }> }> | null } };


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