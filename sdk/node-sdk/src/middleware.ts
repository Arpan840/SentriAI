type Middleware = (
  req: any,
  res: any,
  next: () => void,
) => void;

import type {
  ApiControlConfig,
} from "./types";

import {
  enqueue,
} from "./queue";

export function apiControl(
  config: ApiControlConfig,
): Middleware {

  console.log(
    "SDK initialized with apiKey:",
    config.apiKey,
  );

  return (
    req,
    res,
    next,
  ) => {

    console.log(
      "SDK middleware reached:",
      {
        apiKey:
          config.apiKey,

        method:
          req.method,

        path:
          req.originalUrl,
      },
    );

    const clientUserId =
      config.clientIdResolver?.(
        req,
      ) || null;

    const clientUserIp =
      req.ip ||
      req.socket
        ?.remoteAddress ||
      null;

    const clientIdentifier =
      clientUserId ||
      clientUserIp;

    console.log({
      clientUserId,
      clientUserIp,
      clientIdentifier,
    });

    enqueue({
      apiKey:
        config.apiKey,

      clientUserId,

      clientUserIp,

      clientIdentifier,

      endpoint:
        req.originalUrl,

      method:
        req.method,

      timestamp:
        new Date(),
    });

    next();
  };
}