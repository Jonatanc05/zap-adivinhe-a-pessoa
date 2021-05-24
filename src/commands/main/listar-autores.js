const zapAuthors = require("../../services/zap-authors")

const zapAuthorsMsg = `AUTORES:\n${
    zapAuthors.map((author) => `\`${author}\``).join(", ")
}`

module.exports = { 
    name: "Listar autores",
    description: "Lista autores das mensagens do Zap", 
    usage: "list", 
    command: "list",
    accessible: "Membros", 
    category: "Utilidade", 
run: async (client, message, args) => {
    message.channel.send(zapAuthorsMsg)
}
}