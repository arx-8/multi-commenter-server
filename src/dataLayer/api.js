// @ts-check
const OAuth = require("oauth").OAuth
const { getUnixTime } = require("../utils/utils")

module.exports = {
  /**
   * @see http://creator.cotapon.org/articles/node-js/node_js-oauth-twitter
   *
   * @param {string} consumerKey
   * @param {string} consumerSecret
   * @param {string} authorizeCallback
   * @return {Promise<string>} OAuth authenticate page url
   */
  fetchAuthenticateUrl: (consumerKey, consumerSecret, authorizeCallback) => {
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
      oa.getOAuthRequestToken((error, oauthToken, oauthTokenSecret) => {
        // TODO
        console.log(oauthTokenSecret)

        if (error) {
          reject(error)
          return
        }
        resolve(
          "https://twitter.com/oauth/authenticate?oauth_token=" + oauthToken
        )
      })
    })
  },
}
