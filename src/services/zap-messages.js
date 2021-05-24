const fs = require('fs')
const path = require('path')

const zapMessages = []
const input = fs.readFileSync(path.resolve('input.txt'), 'utf8')

for (let ln of input.split('\n')) {
    if (ln.match(/^\d\d\/\d\d\/\d\d\d\d\s\d\d:\d\d\s-\s.+:/)) {
        const day = ln.substr(0, 2)
        const month = ln.substr(3, 2)
        const date = new Date(`${month}/${day}${ln.substr(5, 11)}`)
        const contentStartIndex = ln.substr(15).indexOf(':') + 17
        const author = ln.substr(19, contentStartIndex - 21)
        const content = ln.substr(contentStartIndex)
        const zapMsg = { date, author, content }
        zapMessages.push(zapMsg)
    } else if (!ln.match(/^\d\d\/\d\d\/\d\d\d\d\s\d\d:\d\d\s-\s/)) {
        zapMessages[zapMessages.length - 1].content += `\n${ln}`
    }
}

module.exports = zapMessages
