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
  const { channelid, accessToken } = req.query
  const user = await checkUserToken(accessToken);

  const channel = await prismaClient.channels.findFirst({
    where: {
      id: channelid.toString(),
    },
  });
  if (!channel) return rejectHandler(res, {
    code: "rejected/channel_not_found",
    reason: "Channel not found",
    status: 404
  })

  if (req.method == 'POST') {
    const { content } = req.body;

    const createdmessage = await prismaClient.messages.create({
      data: {
        authorid: user.id,
        timestamp: Date.now().toString(),
        content: content,
      },
    });
    const channelafterupdated = await prismaClient.channels.update({
      data: {
        messages: [...channel?.messages, createdmessage.id],
      },
      where: {
        id: channel?.id
      }
    });
    prismaClient.$disconnect();
    resolveHandler(res, {
      code: "resolved/success",
      data: channelafterupdated,
      status: 200,
    });
  }

  if (req.method == 'GET') {
    const messages = await prismaClient.messages.findMany({
      where: {
        id: {
          in: channel!.messages,
        },
      },
    });
    prismaClient.$disconnect();

    resolveHandler(res, {
      code: "resolved/success",
      data: messages,
      status: 200,
    });
    return
  }
}
