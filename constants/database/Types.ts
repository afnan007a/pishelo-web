import type { Users, Channels, Messages } from "@prisma/client";

export interface TypeUsers extends Users {
  avatarURL?: string;
}

export interface TypeChannels extends Channels {
    recipients: Array<Users>;
}

export interface TypeMessages extends Messages {
    
}