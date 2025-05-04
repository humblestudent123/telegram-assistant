const TelegramBot = require('node-telegram-bot-api');

// Токен, который ты получил от BotFather
const token = '8182542916:AAGck_QwOWBRDo7J7y_xczpWe8kbmQsKlUM';

// Создаем бота с использованием polling (опрос сервера Telegram)
const bot = new TelegramBot(token, { polling: true });

const path = require('path');









//более точные логи
bot.on("polling_error", (error) => {
  console.log("Polling error:", error);
});










// Логирование для отладки
console.log('Бот запущен...');






// пример вывода 
// bot.onText(/\/запрос/, (msg) => {
//   const chatId = msg.chat.id;
//   bot.sendMessage(chatId, 'запрос выполнен');
// }); 

// пример не рабочего кода
// bot.onText(/\/картинка/, (msg) => {
//   const chatId = msg.chat.id;
//   bot.sendMessage(chatId, 'держи', './image/spongeBob.jpg');
// }); 




// bot.onText(/\/картинка/, (msg) => {
//   const chatId = msg.chat.id;
//   bot.sendPhoto(chatId, './image/Patrick.jpg', {
//     caption: 'Держи!'
//   });



//   bot.sendPhoto(chatId, './image/spongeBob.jpg', {
//     caption: 'Держи!'
//   });
// });



//нужен массив с картинками
const images = [
  './images/Patrick.jpg',
  './images/spongeBob.jpg'
]






function getRandomImage() {
  const index = Math.floor(Math.random() * images.length);
  return images[index];
}

// Обработчик команды /картинка
bot.onText(/\/picture/, (msg) => {
  const chatId = msg.chat.id;
  const imagePath = getRandomImage();

  bot.sendPhoto(chatId, path.resolve(imagePath), {
    // caption: 'Держи! Хочешь ещё?'
  });
});


















bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Привет! Что хочешь сделать?', {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Картинку!', callback_data: 'get_picture' }],
        [{ text: 'Помощь', callback_data: 'get_help' }]
      ]
    }
  });
});

















bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  if (data === 'get_picture') {
    const imagePath = path.resolve(__dirname, getRandomImage());
    bot.sendPhoto(chatId, imagePath, {
      caption: 'Вот картинка!',
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Ещё одну!', callback_data: 'get_picture' }],
          [{ text: 'Вернуться назад', callback_data: '' }]
        ]
      }
    });
  }

  if (data === 'get_help') {
    bot.sendMessage(chatId, 'Вот список команд:\n/start\n/help\n/picture');
  }

  bot.answerCallbackQuery(query.id); // обязательно — иначе крутилка не исчезнет
});







bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;








  if (data === 'go_back') {
    bot.sendMessage(chatId, 'Что хочешь сделать?', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Картинку!', callback_data: 'get_picture' }],
          [{ text: 'Помощь', callback_data: 'get_help' }]
        ]
      }
    });
  }







  if (data === 'get_picture') {
    const imagePath = path.resolve(__dirname, getRandomImage());
    bot.sendPhoto(chatId, imagePath, {
      caption: 'Вот картинка!',
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Вернуться назад', callback_data: 'go_back' }]
        ]
      }
    });
  }

  if (data === 'get_help') {
    bot.sendMessage(chatId, 'Вот список команд:\n/start\n/help\n/picture');
  }

  bot.answerCallbackQuery(query.id); // обязательно — иначе крутилка не исчезнет
});