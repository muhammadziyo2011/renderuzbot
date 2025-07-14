const TelegramBot = require("node-telegram-bot-api");
const token = '8043985076:AAGM41iqrsXyJY8bBNKS9SpIknwJHOnY4lw';

const bot = new TelegramBot(token, { polling: true });

const bootstrap = () => {
  bot.setMyCommands([
    { command: '/start', description: "Kurslar haqida ma'lumot" },
    { command: '/courses', description: "Barcha kurslar" },
  ]);

  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '/start') {
      await bot.sendMessage(
        chatId,
        "Sammi.ac platformasida bor kurslarni sotib olishingiz mumkin",
        {
          reply_markup: {
            keyboard: [
              [
                {
                  text: "Kurslarni ko'rish",
                  web_app: {
                    url: 'https://telegram-new-bot.vercel.app/',
                  },
                },
              ],
            ],
          },
        }
      );
    }

    if (text === '/courses') {
      await bot.sendMessage(
        chatId,
        "Sammi.ac platformasida bor kurslarni sotib olishingiz mumkin",
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Kurslarni ko'rish",
                  web_app: {
                    url: 'https://telegram-new-bot.vercel.app/',
                  },
                },
              ],
            ],
          },
        }
      );
    }

    if (msg.web_app_data?.data) {
      try {
        const data = JSON.parse(msg.web_app_data?.data);

        await bot.sendMessage(
          chatId,
          "Bizga ishonch bildirganingiz uchun raxmat, siz sotib olgan kurslar ro'yhati:"
        );

        for (item of data) {
          await bot.sendPhoto(chatId, item.Image);
          await bot.sendMessage(
            chatId,
            `${item.title} - ${item.quantity}x`
          );
        };

        await bot.sendMessage(
          chatId,
          `Umumiy narx - ${data.reduce((a, c) => a + c.price * c.quantity, 0).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}`
        );
      } catch (error) {
        
      }
    }
  });
};

bootstrap();
