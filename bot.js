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







// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Привет! Я твой бот.');
});

// Логирование для отладки
console.log('Бот запущен...');



bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'вот список доступных команд: /start, /help ворволыфвфылвлфилофивьфивфыви');
  // bot.sendMessage(chatId, '/start')
}); 



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
    caption: 'Держи! Хочешь ещё?'
  });
});






// Обработчик команды /помощь
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendPhoto(chatId, path.resolve(), {
    caption: 'как я могу вам помочь?'
  });
});

