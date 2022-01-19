process.env["NTBA_FIX_319"] = 1;

const TelegramBot = require("node-telegram-bot-api");
const config = require("./config.js");
const axios = require("axios");

// replace the value below with the Telegram token you receive from @BotFather
const token = config.TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

let date = new Date();
sendDate = date.toLocaleString("id-ID", {
  weekday: "long", // long, short, narrow
  day: "numeric", // numeric, 2-digit
  year: "numeric", // numeric, 2-digit
  month: "long", // numeric, 2-digit, long, short, narrow
  hour: "numeric", // numeric, 2-digit
  minute: "numeric", // numeric, 2-digit
  second: "numeric", // numeric, 2-digit
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const pesanMasuk = msg.text;
  const firstName = msg.from.first_name;
  const username = msg.from.username;

  axios({
    url: `https://api-sv2.simsimi.net/v2/?text=${pesanMasuk}&lc=id&cf=true`,
    method: "GET",
  })
    .then((resp) => {
      resp.data.messages.map((el) => {
        const pesanTerkirim = el.text;
        const aktivitasPesan = `PENGGUNA: ${firstName}\nUSERNAME: @${username}\n\nPESAN MASUK: ${pesanMasuk}\nPESAN TERKIRIM: ${pesanTerkirim}\n\nTANGGAL: ${sendDate}`;
        bot.sendMessage(
          chatId,
          pesanTerkirim.replace(/SimiSimi/g, "Fiki Si Paling Ganteng")
        );
        bot.sendMessage(config.USER_ID, aktivitasPesan);
      });
    })
    .catch(function (error) {
      bot.sendMessage(chatId, "BOTNya mungkin sedang error");
    });
});
