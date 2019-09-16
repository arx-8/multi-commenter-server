// @ts-check
/**
 * @param {import("./src/types/request").UnuboServerlessEvent} event
 * @param {import("./src/types/response").UnuboServerlessResponse} response
 * @returns {Promise<void>}
 */
module.exports = async (event, response) => {
  try {
    switch (event.body.path) {
      case "/auth/create":
        await require("./src/handlers/auth").create(event, response)
        break

      case "/statuses/create":
        await require("./src/handlers/statuses").create(event, response)
        break

      default:
        response.status(404).succeed("404 Not Found")
        break
    }
  } catch (error) {
    console.log(error)

    if (!!error.statusCode && !!error.data) {
      // Twitter API error
      response.status(error.statusCode).succeed({
        message: error.data,
      })
      return
    }

    // Note: 実装の簡略化のため、validate error も見分けず 500 error にしてしまっている
    response.status(500).succeed({
      message: error.message,
    })
  }
}
