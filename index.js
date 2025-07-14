const TelegramBot = require("node-telegram-bot-api");
const token = '8043985076:AAGM41iqrsXyJY8bBNKS9SpIknwJHOnY4lw';

const bot = new TelegramBot(token, {polling: true});

const bootstrap = () => {
    bot.on("message", async msg => {
        const chatId = msg.chat.id;
        const text = msg.text;

        if (text === '/start') {
            await bot.sendMessage(
              chatId,
              'Sammi.ac platformasida bor kurslarni sotib olishingiz mumkin',
              {
                reply_markup: {
                  keyboard: [
                    [
                      {
                        text: "Kurslarni ko'rish",
                        web_app: {
                          url: 'https://sammi.ac',
                        },
                      },
                    ],
                  ],
                  resize_keyboard: true,
                },
              }
            );
          }          
    })
}

bootstrap();