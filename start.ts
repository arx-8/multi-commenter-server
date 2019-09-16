/**
 * local executer
 */
import { config } from "dotenv"
config()

import handler from "./handler"
import { AuthCreateRequestBody } from "./src/types/request"
import { FunctionEvent, FunctionContext } from "./src/types/OpenFaaS"

const main = async () => {
  const dummyEvent = new FunctionEvent<AuthCreateRequestBody>({
    body: {
      path: "/auth/create",
      callback_url: "http://localhost",
    },
    headers: {},
  })

  const dummyResponse = new FunctionContext()

  await handler(dummyEvent, dummyResponse, () => {})

  // assert
  console.log(dummyResponse)
}
main()
