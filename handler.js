// @ts-check
/**
 * @param {import("./src/types/request").UnuboServerlessEvent} event
 * @param {import("./src/types/response").UnuboServerlessResponse} response
 * @returns {Promise<void>}
 */
module.exports = async (event, response) => {
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
}
