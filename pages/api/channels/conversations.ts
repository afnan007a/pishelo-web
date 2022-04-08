// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { checkUserToken, rejectHandler, resolveHandler } from "@/clients/api";
import { prismaClient } from "@/clients/prisma";
import { supabase } from "@/clients/supabase";
import { serverAddress } from "@/constants/development";
import type { NextApiRequest, NextApiResponse } from "next";
import { englishWords } from "@/constants/dictionary";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { channelid, accessToken } = req.query;
  console.log('a')
  const authuser = await checkUserToken(accessToken);

  const fetcheduser = await prismaClient.users.findFirst({
    where: {
      userid: authuser.id,
    },
  });
  const channels = await prismaClient.channels.findMany({
    where: {
      authorsid: {
        hasSome: [(fetcheduser?.id as string)],
      },
    },
  });
  channels.forEach((channel) => {
      const recipients = channel.authorsid.filter(authorid => authorid != fetcheduser?.id)
      channel["recipients"] = recipients;
  })
  prismaClient.$disconnect()
  resolveHandler(res, {
    data: channels,
    code: "resolved/success",
    status: 200,
  });
}
