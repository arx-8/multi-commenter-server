// @ts-check
const { getEnvValues } = require("../utils/utils")
const { fetchAuthenticateUrl } = require("../dataLayer/api")

module.exports = {
  /**
   * @param {import("../types/request").AuthCreateRequestBody} requestBody
   * @returns {Promise<import("../types/response").AuthCreateResponse>}
   */
  create: async (requestBody) => {
    const { TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET } = getEnvValues()
    const { callback_url } = validate(requestBody)

    const oauthUrl = await fetchAuthenticateUrl(
      TWITTER_CONSUMER_KEY,
      TWITTER_CONSUMER_SECRET,
      callback_url
    )

    return {
      authenticate_url: oauthUrl,
    }
  },
}

/**
 * @param {import("../types/request").AuthCreateRequestBody} requestBody
 * @returns {import("../types/request").ValidatedRequestBody<import("../types/request").AuthCreateRequestBody>} validated request body
 */
const validate = (requestBody) => {
  const callback_url = requestBody.callback_url
  if (!callback_url || !callback_url.startsWith("http")) {
    throw new Error(
      `Error: Invalid request body. callback_url=${callback_url || "undefined"}`
    )
  }

  return {
    callback_url,
  }
}
