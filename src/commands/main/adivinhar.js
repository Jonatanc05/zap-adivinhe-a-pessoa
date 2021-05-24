const zapMessages = require("../../services/zap-messages")

module.exports = { 
    name: "Adivinhar",
    description: "Entrega uma mensagem para adivinhar o autor e data", 
    usage: "adv", 
    command: "adv",
    accessible: "Membros", 
    category: "Jogo", 
run: async (client, message, args) => {
    let RandomZapMessageIndex = Math.floor(Math.random() * zapMessages.length);
    let RandomZapMessage = zapMessages[RandomZapMessageIndex];
    message.channel.send(`Adivinhe quem mandou essa mensagem:\n\`${RandomZapMessage.content}\`` + RandomZapMessage.author);

    let score = 0;

    const authorCollector = message.channel.createMessageCollector(m => m.author.id === message.author.id, { max: 1, time: 10000 });
    authorCollector.on('collect', message => {
        if(message.content.toLowerCase() == RandomZapMessage.author.toLowerCase()){
            score += 100;
            message.channel.send("Correto.\nAgora tente adivinhar a data no formato AAAA-MM-DD:" + RandomZapMessage.date.toISOString().slice(0, 10));
            const dateCollector = message.channel.createMessageCollector(m => m.author.id === message.author.id, {  max: 1, time: 10000 });
            dateCollector.on('collect', message => {
                const estimatedDate = new Date(message.content);
                const validDate = estimatedDate.getTime() == estimatedDate.getTime();
                if(validDate){
                    const rightYear = (estimatedDate.getYear() == RandomZapMessage.date.getYear());
                    const rightMonth = ((estimatedDate.getMonth() == RandomZapMessage.date.getMonth()) && rightYear);
                    const rightDay = ((estimatedDate.getDay() == RandomZapMessage.date.getDay()) && rightMonth);
                    score *= (rightYear ? 1.5 : 1) * (rightMonth ? 2 : 1) * (rightDay ? 2.5 : 1);
                    message.channel.send("Ano: " + (rightYear ? ':white_check_mark:' : ':x:') + "\n" +
                                         "Mês: " + (rightMonth ? ':white_check_mark:' : ':x:') + "\n" +
                                         "Dia: " + (rightDay ? ':white_check_mark:' : ':x:') + "\n" +
                                         "Pontuação Final: " + score);
                }else {
                    message.channel.send("Formatação errada de data.");
                }
            })
        } else {
            message.channel.send("Errou, burro burro burro. \n" +
                                 "Quem escreveu foi: " + RandomZapMessage.author);
        }
    })
}
}