// @ts-check
const { fetchAuthenticateUrl } = require("../dataLayer/api")

module.exports = {
  /**
   * @param {import("../types/request").UnuboServerlessEvent<import("../types/request").AuthCreateRequestBody>} event
   * @param {import("../types/response").UnuboServerlessResponse} response
   * @returns {Promise<void>}
   */
  create: async (event, response) => {
    // env values
    const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY
    const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET

    // validate env
    if (!TWITTER_CONSUMER_KEY || !TWITTER_CONSUMER_SECRET) {
      response.status(500).succeed({
        message:
          "Error: Found undefined env values! Check the server settings.",
      })
      return
    }

    // validate request
    const callbackUrl = event.body.callback_url
    if (!callbackUrl || !callbackUrl.startsWith("http")) {
      response.status(500).succeed({
        message: `Error: Invalid request body. callbackUrl=${callbackUrl ||
          "undefined"}`,
      })
      return
    }

    const oauthUrl = await fetchAuthenticateUrl(
      TWITTER_CONSUMER_KEY,
      TWITTER_CONSUMER_SECRET,
      callbackUrl
    )

    response.status(200).succeed({
      authenticate_url: oauthUrl,
    })
  },
}
