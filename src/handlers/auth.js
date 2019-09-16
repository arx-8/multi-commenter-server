// @ts-check
const { getEnvValues } = require("../utils/utils")
const { fetchAuthenticateUrl } = require("../dataLayer/api")

module.exports = {
  /**
   * @param {import("../types/request").UnuboServerlessEvent<import("../types/request").AuthCreateRequestBody>} event
   * @param {import("../types/response").UnuboServerlessResponse} response
   * @returns {Promise<void>}
   */
  create: async (event, response) => {
    const { TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET } = getEnvValues()
    const { callback_url } = validate(event.body)

    const oauthUrl = await fetchAuthenticateUrl(
      TWITTER_CONSUMER_KEY,
      TWITTER_CONSUMER_SECRET,
      callback_url
    )

    response.status(200).succeed({
      authenticate_url: oauthUrl,
    })
  },
}

/**
 * @param {import("../types/request").AuthCreateRequestBody} eventBody
 * @returns {import("../types/request").ValidatedRequestBody<import("../types/request").AuthCreateRequestBody>} validated request body
 */
const validate = (eventBody) => {
  const callback_url = eventBody.callback_url
  if (!callback_url || !callback_url.startsWith("http")) {
    throw new Error(
      `Error: Invalid request body. callback_url=${callback_url || "undefined"}`
    )
  }

  return {
    callback_url,
  }
}
