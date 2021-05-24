const zapMessages = require("./zap-messages");

const zapAuthors = Array.from(new Set(zapMessages.map((zapMsg) => zapMsg.author))).sort()

module.exports = zapAuthors
