export const API_STATUS_RECORDS = {
   // success
   ok: 200,
   created: 201,
   accepted: 202,

   // redirection
   'moved-permanently': 301,
   'not-modified': 304,
   'temporary-redirect': 307,

   // client
   'bad-request': 400,
   unauthorized: 401,
   'payment-required': 402,
   forbidden: 403,
   'not-found': 404,
   'method-not-allowed': 405,
   'request-timeout': 408,
   'payload-too-large': 413,
   'unsupported-media-type': 415,
   'unprocessable-entity': 422,

   // server
   'internal-server-error': 500,
   'bad-gateway': 502,
   'service-unavailable': 503,
   'gateway-timeout': 504,
} as const
