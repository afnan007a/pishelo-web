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
  const authuser = await checkUserToken(accessToken);

  const fetcheduser = await prismaClient.users.findFirst({
    where: {
      userid: authuser.id,
    },
  });
  const channels = await prismaClient.channels.findMany({
    where: {
      members: {
        hasSome: [(fetcheduser?.id as string)],
      },
    },
  });

  let userstofetch:Array<string> = []
  for (const conversation of channels) {
      conversation.members.forEach((convomemberid) => {
          userstofetch.push(convomemberid)
      })
  }
  const usersdata = await prismaClient.users.findMany({
    where: {
      id: {
        in: userstofetch,
      },
    },
  });

  channels.forEach((channel) => {
    for (const memberid of channel.members) {
      const parseduser = usersdata.find((user) => user.id == memberid);
      if (parseduser) {
        channel.members[memberid] = parseduser;
      }
    }
      const recipients = channel.members.filter(authorid => authorid != fetcheduser?.id)
      channel["recipients"] = recipients;
  })
  prismaClient.$disconnect()
  resolveHandler(res, {
    data: channels,
    code: "resolved/success",
    status: 200,
  });
}
