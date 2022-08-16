import { useMutation, UseMutationOptions } from '@tanstack/react-query';
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

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
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

export type GoogleOauthHandlerMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type GoogleOauthHandlerMutation = { __typename?: 'Mutation', googleOauthHandler: { __typename?: 'SessionResponse', data?: { __typename?: 'TokenResponse', access_token: string, id_token: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };


export const GoogleOauthHandlerDocument = `
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