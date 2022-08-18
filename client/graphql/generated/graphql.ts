import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch("http://localhost:5000/graphql", {
    method: "POST",
    ...({
  headers: {
    "Apollo-Require-Preflight": "true",
    "Content-Type": "application/json"
  }, 
  credentials: 'include',
}
),
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
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
  avatar: Scalars['String'];
  avatarId: Scalars['String'];
  bio: Scalars['String'];
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
  createdAt: Scalars['DateTime'];
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
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['String'];
  profile: Profile;
  session: Session;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type GoogleOauthHandlerMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type GoogleOauthHandlerMutation = { __typename?: 'Mutation', googleOauthHandler: { __typename?: 'SessionResponse', data?: { __typename?: 'TokenResponse', access_token: string, id_token: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser?: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, email: string, username: string, profile: { __typename?: 'Profile', id: string, bio: string, avatar: string, avatarId: string }, session: { __typename?: 'Session', userId: string, valid: boolean, userAgent: string, createdAt: any, updatedAt: any } } | null };


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
      (variables?: GoogleOauthHandlerMutationVariables) => fetcher<GoogleOauthHandlerMutation, GoogleOauthHandlerMutationVariables>(GoogleOauthHandlerDocument, variables)(),
      options
    );
useGoogleOauthHandlerMutation.fetcher = (variables: GoogleOauthHandlerMutationVariables) => fetcher<GoogleOauthHandlerMutation, GoogleOauthHandlerMutationVariables>(GoogleOauthHandlerDocument, variables);
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
      fetcher<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, variables),
      options
    );

useGetCurrentUserQuery.getKey = (variables?: GetCurrentUserQueryVariables) => variables === undefined ? ['GetCurrentUser'] : ['GetCurrentUser', variables];
;

useGetCurrentUserQuery.fetcher = (variables?: GetCurrentUserQueryVariables) => fetcher<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, variables);