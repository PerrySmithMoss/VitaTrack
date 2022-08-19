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

export type LogoutUserResponse = {
  __typename?: 'LogoutUserResponse';
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: UserResponse;
  googleOauthHandler: SessionResponse;
  loginUserWithEmailAndPassword: UserResponse;
  logoutUser: LogoutUserResponse;
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationGoogleOauthHandlerArgs = {
  code: Scalars['String'];
};


export type MutationLoginUserWithEmailAndPasswordArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
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
};

export type Session = {
  __typename?: 'Session';
  createdAt: Scalars['String'];
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

export type TokenResponse = {
  __typename?: 'TokenResponse';
  access_token: Scalars['String'];
  id_token: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['String'];
  profile?: Maybe<Profile>;
  session?: Maybe<Session>;
  updatedAt: Scalars['String'];
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

export type CreateUserMutationVariables = Exact<{
  password: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserResponse', data?: { __typename?: 'User', username: string, email: string, id: string, profile?: { __typename?: 'Profile', id: string, bio?: string | null, avatar?: string | null } | null } | null, errors?: Array<{ __typename?: 'UserFieldError', field: string, message: string }> | null } };

export type GoogleOauthHandlerMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type GoogleOauthHandlerMutation = { __typename?: 'Mutation', googleOauthHandler: { __typename?: 'SessionResponse', data?: { __typename?: 'TokenResponse', access_token: string, id_token: string } | null, errors?: Array<{ __typename?: 'SessionFieldError', field: string, message: string }> | null } };

export type LoginUserWithEmailAndPasswordMutationVariables = Exact<{
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type LoginUserWithEmailAndPasswordMutation = { __typename?: 'Mutation', loginUserWithEmailAndPassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'UserFieldError', field: string, message: string }> | null, data?: { __typename?: 'User', username: string, email: string, updatedAt: string, createdAt: string, id: string, profile?: { __typename?: 'Profile', avatar?: string | null, bio?: string | null, id: string, avatarId?: string | null } | null } | null } };

export type LogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutation = { __typename?: 'Mutation', logoutUser: { __typename?: 'LogoutUserResponse', message: string, success: boolean } };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser?: { __typename?: 'UserResponse', data?: { __typename?: 'User', id: string, email: string, username: string, profile?: { __typename?: 'Profile', avatar?: string | null, bio?: string | null, id: string } | null, session?: { __typename?: 'Session', userId: string, valid: boolean, userAgent: string, createdAt: string, updatedAt: any } | null } | null } | null };


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