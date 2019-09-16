import { XOR } from "./utils"

export type AuthCreateResponse = {
  authenticate_url: string
}

export type StatusesCreateResponse = {
  // TODO
}

export type SuccessResponse = XOR<AuthCreateResponse, StatusesCreateResponse>
