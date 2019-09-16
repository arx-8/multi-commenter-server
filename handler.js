// @ts-check
const OAuth = require("oauth").OAuth

/**
 * @param {import("./src/types").Event<{}>} event
 * @param {import("./src/types").Response} response
 * @returns {Promise<void>}
 */
module.exports = async (event, response) => {
  console.log("******************UP***********************")
  console.log(event)
  console.log(response)
  console.log("******************DOWN*********************")

  // env values
  const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY
  const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET
  const TWITTER_AUTHORIZE_CALLBACK_URL =
    process.env.TWITTER_AUTHORIZE_CALLBACK_URL

  // validate env
  if (
    !TWITTER_CONSUMER_KEY ||
    !TWITTER_CONSUMER_SECRET ||
    !TWITTER_AUTHORIZE_CALLBACK_URL
  ) {
    response.status(500).succeed({
      message: "Error: Found undefined env values! Check the server settings.",
    })
    return
  }

  // validate request
  // TODO validate request

  const oauthUrl = await auth(
    TWITTER_CONSUMER_KEY,
    TWITTER_CONSUMER_SECRET,
    TWITTER_AUTHORIZE_CALLBACK_URL
  )

  response.status(200).succeed({
    authenticate_url: oauthUrl,
  })
}

/**
 * @see http://creator.cotapon.org/articles/node-js/node_js-oauth-twitter
 *
 * @param {string} consumerKey
 * @param {string} consumerSecret
 * @param {string} authorizeCallback
 * @return {Promise<string>} OAuth authenticate page url
 */
const auth = (consumerKey, consumerSecret, authorizeCallback) => {
  const oa = new OAuth(
    "https://api.twitter.com/oauth/request_token",
    "https://api.twitter.com/oauth/access_token",
    consumerKey,
    consumerSecret,
    "1.0",
    authorizeCallback,
    "HMAC-SHA1"
  )

  return new Promise((resolve, reject) => {
    oa.getOAuthRequestToken((error, oauthToken) => {
      if (error) {
        reject(error)
        return
      }
      resolve(
        "https://twitter.com/oauth/authenticate?oauth_token=" + oauthToken
      )
    })
  })
}
