const { readdirSync } = require('fs')
const ascii = require('ascii-table')
const path = require('path')

const table = new ascii("Commands")
table.setHeading("Commands", "Load Status")

module.exports = client => {
    const load = dirs => {
        const commands = readdirSync(path.join(__dirname, `../commands/${dirs}/`)).filter(d => d.endsWith(".js"))

        for (let file of commands) {
            let pull = require(`../commands/${dirs}/${file}`)
            if(pull.name) {
                table.addRow(file, '✔️')
                client.commands.set(pull.command, pull);
            } else {
                table.addRow(file, `❌ --> Missing help.name or help.name is not a string`)
                continue;
            }

            if (pull.aliases) {
                pull.aliases.forEach(a => client.aliases.set(a, pull.command))
            }
        }
    }
    
    ["utility", "main"].forEach(c => load(c))
    console.log(table.toString())
}