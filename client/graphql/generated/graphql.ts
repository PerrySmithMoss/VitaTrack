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

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  googleOauthHandler: SessionResponse;
};


export type MutationGoogleOauthHandlerArgs = {
  code: Scalars['String'];
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
  getCurrentUser?: Maybe<User>;
  hello: Scalars['String'];
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

export type SessionResponse = {
  __typename?: 'SessionResponse';
  data?: Maybe<TokenResponse>;
  errors?: Maybe<Array<FieldError>>;
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
  profile: Profile;
  session: Session;
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type GoogleOauthHandlerMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type GoogleOauthHandlerMutation = { __typename?: 'Mutation', googleOauthHandler: { __typename?: 'SessionResponse', data?: { __typename?: 'TokenResponse', access_token: string, id_token: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser?: { __typename?: 'User', id: string, createdAt: string, updatedAt: string, email: string, username: string, profile: { __typename?: 'Profile', id: string, bio?: string | null, avatar?: string | null, avatarId?: string | null }, session: { __typename?: 'Session', userId: string, valid: boolean, userAgent: string, createdAt: string, updatedAt: any } } | null };


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
export const GetCurrentUserDocument = /*#__PURE__*/ `
    query GetCurrentUser {
  getCurrentUser {
    id
    createdAt
    updatedAt
    email
    username
    profile {
      id
      bio
      avatar
      avatarId
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