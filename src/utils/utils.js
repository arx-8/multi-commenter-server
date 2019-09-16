// @ts-check
module.exports = {
  getUnixTime: () => {
    return Math.round(new Date().getTime() / 1000)
  },
  /**
   * @returns {import("../types/app").EnvValues}
   */
  getEnvValues: () => {
    const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY
    const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET

    // validate
    if (!TWITTER_CONSUMER_KEY || !TWITTER_CONSUMER_SECRET) {
      throw new Error(
        "Error: Found undefined env values! Check the server settings."
      )
    }

    return {
      TWITTER_CONSUMER_KEY,
      TWITTER_CONSUMER_SECRET,
    }
  },
}
