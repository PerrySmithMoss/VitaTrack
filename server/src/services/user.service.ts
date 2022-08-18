import qs from "qs";
import axios from "axios";
import { config } from "../../config/config";
import prisma from "../lib/prisma";

export async function findUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
}

interface InputFields {
  email: string;
  username: string;
  picture: string;
}

export async function findAndUpdateUser(query: string, fields: InputFields) {
  const { email, username, picture } = fields;

  const upsertedUser = await prisma.user.upsert({
    where: {
      email: query,
    },
    update: {
      username,
      profile: {
        update: {
          avatar: picture,
        },
      },
    },
    create: {
      email,
      username,
      profile: {
        create: {
          avatar: picture,
        },
      },
    },
  });

  return upsertedUser;
}

interface GoogleTokensResult {
  access_token: string;
  expires_in: Number;
  refresh_token: string;
  scope: string;
  id_token: string;
}

export async function getGoogleOAuthTokens({
  code,
}: {
  code: string;
}): Promise<GoogleTokensResult> {
  const url = "https://oauth2.googleapis.com/token";

  const values = {
    code,
    client_id: config.googleClientID,
    client_secret: config.googleClientSecret,
    redirect_uri: config.googleOauthRedirectUrl,
    grant_type: "authorization_code",
  };

  try {
    const res = await axios.post<GoogleTokensResult>(
      url,
      qs.stringify(values),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return res.data;
  } catch (error: any) {
    console.error("Caught error:", error.response.data.error);
    throw new Error(error.message);
  }
}

export async function getGoogleOAuthTokensV2(
  code: string
): Promise<GoogleTokensResult> {
  const url = "https://oauth2.googleapis.com/token";

  const values = {
    code,
    client_id: config.googleClientID,
    client_secret: config.googleClientSecret,
    // redirect_uri: config.googleOauthRedirectUrl,
    redirect_uri: "http://localhost:3000",
    grant_type: "authorization_code",
  };

  try {
    const res = await axios.post<GoogleTokensResult>(
      url,
      qs.stringify(values),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return res.data;
  } catch (error: any) {
    console.error("Caught error:", error.response.data.error);
    throw new Error(error.message);
  }
}

interface GoogleUserResult {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

export async function getGoogleUser({
  id_token,
  access_token,
}: {
  id_token: string;
  access_token: string;
}): Promise<GoogleUserResult> {
  try {
    const res = await axios.get<GoogleUserResult>(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    );
    return res.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
