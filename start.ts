/**
 * local executer
 */
import { config } from "dotenv"
config()

import handler from "./handler"
import {
  UnuboServerlessEvent,
  AuthCreateRequestBody,
} from "./src/types/request"

const main = async () => {
  const dummyEvent: UnuboServerlessEvent<AuthCreateRequestBody> = {
    body: {
      path: "/auth/create",
      callback_url: "http://localhost",
    },
    headers: undefined as never,
    method: undefined as never,
    query: undefined as never,
    path: undefined as never,
  }

  const dummyResponse = {
    statusCode: 0,
    body: {} as Object,

    status: function(httpStatusCode: number) {
      this.statusCode = httpStatusCode
      return this
    },

    succeed: function(body: Object) {
      this.body = body
    },
  }

  await handler(dummyEvent, dummyResponse)

  // assert
  console.log(dummyResponse)
}
main()
