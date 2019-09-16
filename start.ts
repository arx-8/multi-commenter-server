/**
 * local executer
 */
import { config } from "dotenv"
config()

import handler from "./handler"

const dummyResponse = {
  statusCode: 500,
  body: "" as string | Object,

  status: function(httpStatusCode: number) {
    this.statusCode = httpStatusCode
    return this
  },

  succeed: function(body: string | Object) {
    this.body = body
  },
}

handler({} as any, dummyResponse)

console.log(dummyResponse)
