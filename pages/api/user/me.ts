// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { resolveHandler, rejectHandler } from "@/clients/api";
import { checkUserToken, getUserData } from "@/clients/api";
import { prismaClient } from "@/clients/prisma";
import { supabase } from '@/clients/supabase'
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { accessToken } = req.query;
  const userFromAccToken = await checkUserToken(accessToken);

  if (!userFromAccToken)
    return rejectHandler(res, {
      code: "rejected/access_forbidden",
      reason: "Access forbidden, user not found.",
      status: 403
    })

  const userdata = await getUserData(userFromAccToken.id);
  prismaClient.$disconnect()

  resolveHandler(res, {
    code: "resolved/success",
    data: userdata,
    status: 200,
  });
}
