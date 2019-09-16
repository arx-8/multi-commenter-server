// @ts-check
module.exports = {
  getUnixTime: () => {
    return Math.round(new Date().getTime() / 1000)
  },
}
