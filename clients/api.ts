import type { NextApiResponse } from "next";
import { serverVersion } from "@/constants/development";
import { supabase } from "@/clients/supabasePublic";
import type { User } from "@supabase/supabase-js";

export function rejectHandler(
  res: NextApiResponse,
  {
    status = 500,
    code = "unknown/rejected/unknown",
    reason = "A mistake on the server has occurred",
  }
) {
  const finalobj = {
    success: false,
    server: {
      version: serverVersion,
    },
    status: status,
    code: code,
    reason: reason,
  };
  res.status(status).send(finalobj);
  return true;
}

interface Resolvation {
  status?: number;
  code?: string;
  data: Object | any;
}

export function resolveHandler(
  res: NextApiResponse,
  { status = 200, code = "resolved/unknown", data = {} }: Resolvation
) {
  const finalobj = {
    success: true,
    server: {
      version: serverVersion,
    },
    status: status,
    code: code,
    data: data,
  };
  res.status(status).send(finalobj);
  return true;
}

export async function checkUserToken(accessToken: any): Promise<User> {
  return new Promise(async (resolve, reject) => {
    if (!accessToken) {
      reject({ code: 400, message: "Unauthenticated User" });
    }

    const auth = supabase.auth;
    const getuserDetails = await auth.api.getUser(accessToken.toString());
    const user: any = getuserDetails.user;
    if (!user) {
      return reject({
        code: 401,
        message: "Invalid User Authentication Keychain provided.",
      });
    }
    resolve(user);
  });
}