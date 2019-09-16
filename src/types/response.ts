import { XOR } from "./utils"

/**
 * Response
 */
export type UnuboServerlessResponse = {
  status: (httpStatusCode: number) => UnuboServerlessResponse
  succeed: (body: XOR<SucceedResponse, FailedResponse>) => void
}

export type AuthCreateResponse = {
  authenticate_url: string
}

export type StatusesCreateResponse = {
  // TODO
}

type SucceedResponse = XOR<AuthCreateResponse, StatusesCreateResponse>

type FailedResponse = XOR<
  {
    message: string
  },
  string
>
