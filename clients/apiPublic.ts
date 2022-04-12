import { serverAddress } from "@/constants/development";
import { supabase } from "@/clients/supabasePublic";
import querystring from "querystring";
import type { Users, Channels } from "@prisma/client";
import type { TypeChannels, TypeMessages } from "@/constants/database/Types";
import { logIt } from ".";

async function apifetch(
  path: string,
  { json = true, params = {}, method = "GET", body = {}, authenticated = true }
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    const authModule = supabase.auth;

    var authTokenFetch = "";
    if (authenticated) {
      const authSession = authModule.session();
      if (authSession) authTokenFetch = authSession.access_token;
    }

    let finalparams = "";
    if (Object.keys(params).length != 0)
      finalparams = querystring.stringify(params);

    let finaloptions: any = {
      method: method.toUpperCase(),
    };
    if (Object.keys(body).length != 0)
      finaloptions["body"] = JSON.stringify(body);

    // Start fetching
    const starttime = Date.now();
    logIt(`API Starting to fetch "${path}"`, {
      level: "info",
      source: "api_handler",
      raw: {
        path: path,
        params: params,
        options: finaloptions,
      },
    });

    await fetch(
      `${serverAddress}/api${path}?accessToken=${authTokenFetch}${
        finalparams ? `&${finalparams}` : ""
      }`,
      finaloptions
    )
      .then(async (response) => {
        let finalresponse;

        logIt(`API Queued to be processed for "${path}"`, {
          level: "info",
          source: "api_handler",
          raw: {
            rawresponse: response,
            path: path,
            params: params,
            options: finaloptions,
          },
        });

        try {
          if (json) finalresponse = await response.json();
          else finalresponse = response["arrayBuffer"]();
        } catch (e) {
          logIt(`API Failed to parse response for "${path}"`, {
            level: "error",
            source: "api_handler",
            raw: {
              rawresponse: response,
              path: path,
              params: params,
              options: finaloptions,
            },
          });
          reject(e);
        }
        if (!(finalresponse?.success) && json) {
          logIt(
            `API Endpoint Failure for "${path}": ${
              finalresponse?.reason || "Unknown Error"
            }`,
            {
              level: "error",
              source: "api_handler",
              raw: { finalresponse },
            }
          );
          return reject(finalresponse);
        }
        logIt(
          `API Endpoint Success for "${path}": ${
            finalresponse?.code || "Unknown Success Code"
          } - Took ${Date.now() - starttime}ms`,
          {
            level: "success",
            source: "api_handler",
            raw: { finalresponse },
          }
        );
        // ga.event({
        //   action: "api_call-done",
        //   params: {
        //     path: path,
        //     params: JSON.stringify(params),
        //     options: JSON.stringify(finaloptions),
        //     response: JSON.stringify(finalresponse),
        //     timetofetch: `${Date.now() - starttime}ms`,
        //   },
        // });
        // NProgress.done(true);
        resolve(json ? finalresponse?.data : finalresponse);
      })
      .catch((err) => {
        console.error(err);
        logIt(`API Endpoint Failure for "${path}": ${err || "Unknown Error"}`, {
          level: "error",
          source: "api_handler",
          raw: {
            path: path,
            error: err,
          },
        });
        // ga.event({
        //   action: "api_call-failure_generic",
        //   params: {
        //     path: path,
        //     error: err,
        //   },
        // });
        reject(err);
      });
  });
}

export async function checkIfAuth(): Promise<any> {
  const authModule = supabase.auth;
  const user = authModule.user();

  if (user) {
    return user;
  } else {
    return false;
  }
}

export const userSignup = async({ email, password, username }):Promise<any> => {
  return new Promise(async (res, rej) => {
    const dt = await apifetch("/auth/signup", {
      method: "POST",
      body: {
        email: email,
        password: password,
        username: username,
      },
    }).catch((err) => {
      rej(err)
      return
    })
    res(dt)
  });
}

export const userData = async (): Promise<Users> => {
  return new Promise(async (res, rej) => {
    const dt = await apifetch("/user/me", {
      method: "GET",
    }).catch((err) => {
      rej(err);
      return;
    });
    res(dt);
  });
};

export const userDataMany = async (usersid:Array<string>): Promise<Array<Users>> => {
  return new Promise(async (res, rej) => {

    const usersparsed = usersid.join(",");

    const dt = await apifetch("/user/fetch/many", {
      method: "GET",
      params: {
        id: usersparsed,
      },
    }).catch((err) => {
      rej(err);
      return;
    });
    res(dt);
  });
};


export const conversationData = async (): Promise<Array<TypeChannels>> => {
  return new Promise(async (res, rej) => {
    const dt = await apifetch("/channels/conversations", {
      method: "GET",
    }).catch((err) => {
      rej(err);
      return;
    });
    res(dt);
  });
};

export const messagesMany = async (channelid): Promise<Array<TypeMessages>> => {
  return new Promise(async (res, rej) => {
    const dt = await apifetch(`/channels/${channelid}/messages`, {
      method: "GET",
    }).catch((err) => {
      rej(err);
      return;
    });
    res(dt);
  });
};

export const sendMessage = async (channelid, messageContent): Promise<Array<TypeMessages>> => {
  return new Promise(async (res, rej) => {
    const dt = await apifetch(`/channels/${channelid}/messages`, {
      method: "POST",
      body: {
        content: messageContent,
      }
    }).catch((err) => {
      rej(err);
      return;
    });
    res(dt);
  });
};