// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { resolveHandler, rejectHandler } from "@/clients/api";
import { checkUserToken, getUserDataMany } from "@/clients/api";
import { prismaClient } from "@/clients/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { accessToken, id } = req.query;
  if (!accessToken || !id) return rejectHandler(res, {
    code: "missing/query_missing",
    reason: "Missing query parameters.",
    status: 400,
  });
  const userFromAccToken = await checkUserToken(accessToken);

  // Filter to remove blanks and nulls
  const ids = (id as string).split(",").filter(id => id);
  

  if (!userFromAccToken)
    return rejectHandler(res, {
      code: "rejected/access_forbidden",
      reason: "Access forbidden, user not found.",
      status: 403,
    });

  const userdata = await getUserDataMany(ids);
  prismaClient.$disconnect();

  resolveHandler(res, {
    code: "resolved/success",
    data: userdata,
    status: 200,
  });
}
