/**
 * local executer
 */
import { config } from "dotenv"
config()

import handler from "./handler"

const main = async () => {
  const dummyEvent = {
    body: {
      callback_url: "http://localhost",
    },
    headers: {} as any,
    method: "POST" as const,
    query: undefined as never,
    path: "/",
  }

  const dummyResponse = {
    statusCode: 500,
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
  console.log(dummyResponse)
}
main()
