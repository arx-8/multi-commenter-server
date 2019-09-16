// @ts-check
const OAuth2 = require("oauth").OAuth2

/**
 * @param {import("./src/types").Event<{}>} event
 * @param {import("./src/types").Response} response
 */
module.exports = (event, response) => {
  console.log("*********************************************")

  // env values
  const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY
  const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET

  if (!TWITTER_CONSUMER_KEY || !TWITTER_CONSUMER_SECRET) {
    response.status(500).succeed({
      message: "Error: No env values! Check the server settings.",
    })
    return
  }

  let str = ""
  str += JSON.stringify(
    new OAuth2(
      TWITTER_CONSUMER_KEY,
      TWITTER_CONSUMER_SECRET,
      "https://api.twitter.com/",
      undefined,
      "oauth2/token",
      undefined
    )
  )
  str += "::::::"
  str += JSON.stringify("hello")

  response.status(200).succeed(str)
}
