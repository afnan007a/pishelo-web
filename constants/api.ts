import type { Channels, Users } from "@prisma/client";

export const userPublicAllowedData = {
  created_at: {
    public: true,
    private: true,
  },
  username: {
    public: true,
    private: true,
  },
  discriminator: {
    public: true,
    private: true,
  },
  activityMessage: {
    public: true,
    private: true,
  },
  status: {
    public: true,
    private: true,
  },
  userid: {
    public: false,
    private: true,
  },
  lastseen: {
    public: true,
    private: true,
  },
};


export const userPublicFilter = (userData:Users) => {
    const user = userData;
    for (const userkey in user) {
        // userkey = activitystatus, userkeyData = activitystatusData = ""
        for (const allowedkey in userPublicAllowedData) {
            const alloweddata = userPublicAllowedData[allowedkey];
            if (!alloweddata.public) {
                delete user[userkey];
            }
        }
    }
    return user;
}
