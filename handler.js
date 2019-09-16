// @ts-check

/**
 * @type {import("http2").IncomingHttpHeaders}
 */
const COMMON_HEADER = {
  "access-control-allow-headers": "Content-Type",
  "access-control-allow-methods": "POST,OPTIONS",
  "access-control-allow-origin": "*",
}

/**
 * @type {import("./src/types/OpenFaaS").FaaSHandler<
 *    import("./src/types/request").BaseBody,
 *    import("./src/types/response").SuccessResponse
 * >}
 */
module.exports = async (event, response) => {
  try {
    switch (event.body.path) {
      case "/auth/create": {
        const result = await require("./src/handlers/auth").create(event.body)
        response
          .status(200)
          .headers(COMMON_HEADER)
          .succeed(result)
        break
      }

      case "/statuses/create": {
        const result = await require("./src/handlers/statuses").create(
          event.body
        )
        response
          .status(200)
          .headers(COMMON_HEADER)
          .succeed(result)
        break
      }

      default:
        /**
         * for exhaustiveness checking
         * @type {undefined}
         */
        const caseGuard = event.body.path
        response
          .status(404)
          .headers(COMMON_HEADER)
          .fail("404 Not Found")
        break
    }
  } catch (error) {
    console.log(error)

    if (!!error.statusCode && !!error.data) {
      // Twitter API error
      response
        .status(error.statusCode)
        .headers(COMMON_HEADER)
        .fail({
          message: error.data,
        })
      return
    }

    // Note: 実装の簡略化のため、validate error も見分けず 500 error にしてしまっている
    response
      .status(500)
      .headers(COMMON_HEADER)
      .fail({
        message: error.message,
      })
  }
}
