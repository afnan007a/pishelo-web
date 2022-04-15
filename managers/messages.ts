import * as api from '@/clients/apiPublic'
import type { TypeChannels, TypeMessages } from "@/constants/database/Types";

const messagesCache = {}

export function getMessagesCache() {
    return messagesCache
}

export async function fetchMessages({
  channelid,
  excludeCache = false,
}): Promise<Array<TypeMessages>> {
  return new Promise(async (res, rej) => {
    const cacheattempt = messagesCache[channelid];
    if (cacheattempt && !excludeCache) {
      res(cacheattempt);
      return;
    }

    const messages = await api.messagesMany(channelid);
    messagesCache[channelid] = messages
    res(messages);
  });
}