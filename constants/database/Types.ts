import type { Users, Channels } from '@prisma/client'

export interface TypeUsers extends Users {
  avatarURL?: string;
}

export interface TypeChannels extends Channels {
    recipients: Array<Users>;
}