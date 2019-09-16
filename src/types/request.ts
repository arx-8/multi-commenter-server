type DefinedRoutePath = "/auth/create" | "/statuses/create"

/**
 * Event
 */
export type UnuboServerlessEvent<TBody extends Body = Body> = {
  body: TBody
  headers: Headers
  method: "POST"
  // GET使う予定なし
  query: never
  // リクエストに依らず固定値のようで、役に立たない
  path: "/"
}

type Body = Partial<{
  path: DefinedRoutePath
  [key: string]: string
}>

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

export type AuthCreateRequestBody = Partial<{
  path: DefinedRoutePath
  callback_url: string
}>

export type StatusesCreateRequestBody = Partial<{
  path: DefinedRoutePath
  // TODO
}>
