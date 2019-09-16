/**
 * Event
 */
export type Event<TBody extends Body> = {
  body: TBody
  headers: Headers
  method: "POST"
  query: never
  path: string
}

type Body = {
  [key: string]: string
}

type Headers = {
  host: string
  "user-agent": string
  "transfer-encoding": string
  "accept-charset": string
  "accept-encoding": string
  "cdn-loop": string
  "cf-connecting-ip": string
  "cf-ipcountry": string
  "cf-ray": string
  "cf-visitor": string
  "content-type": string
  cookie: string
  "x-call-id": string
  "x-forwarded-for": string
  "x-forwarded-host": string
  "x-forwarded-port": string
  "x-forwarded-proto": string
  "x-original-forwarded-for": string
  "x-original-uri": string
  "x-real-ip": string
  "x-request-id": string
  "x-scheme": string
  "x-start-time": string
}

/**
 * Response
 */
export type Response = {
  status: (httpStatusCode: number) => Response
  succeed: (body: SucceedResponse | FailedResponse) => void
}

type SucceedResponse = {
  authenticate_url: string
}

type FailedResponse = {
  message: string
}
