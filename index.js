process.env["NTBA_FIX_319"] = 1;

/**
 * Import configuration from .env
 */
require("dotenv").config();

/**
 * Node.js Telegram Bot API
 * https://github.com/yagop/node-telegram-bot-api
 */
const TelegramBot = require("node-telegram-bot-api");

/**
 * Promise based HTTP client for the browser and node.js
 * https://github.com/axios/axios
 */
const axios = require("axios");

/**
 * Moment Timezone
 * https://github.com/moment/moment-timezone
 */
const moment = require("moment-timezone");
moment.tz.setDefault(process.env.BOT_TIMEZONE).locale(process.env.BOT_LANG);

/**
 * Create a bot that uses 'polling' to fetch new updates
 */
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

/**
 * Listen for any kind of message. There are different kinds of
 * messages.
 */
bot.on("message", (msg) => {
  /**
   * Retrieving Message ID
   */
  const chatId = msg.chat.id;

  /**
   * Retrieve incoming messages
   */
  const pesanMasuk = msg.text;

  /**
   * Retrieve the user's full name (first name + last name)
   */
  const fullName = `${msg.from.first_name}${msg.from.last_name ? ` ${msg.from.last_name}` : ""}`;

  /**
   * Retrieve the user's username
   */
  const username = msg.from.username;

  /**
   * Retrieve the date when the user sent the message
   */
  const chatDate = moment(msg.date * 1000).format("DD/MM/YY HH:mm:ss");

  /**
   * Fetching data from SimSimi API
   */
  axios({
    url: `${process.env.API_URL}?text=${pesanMasuk}&lc=${process.env.BOT_LANG}&cf=true`,
    method: "GET",
  })
    .then((resp) => {
      for (const el of resp.data.messages) {
        /**
         * Display data from api
         */
        const pesanTerkirim = el.text.replace(/simi(?!\w)/g, "fiki");

        /**
         * Sending messages to users
         */
        bot.sendMessage(chatId, pesanTerkirim);

        /**
         * Retrieve activity log
         */
        console.log(
          `
--------------------
ID: ${msg.from.id}
NAME: ${fullName}
USERNAME: ${username}
         
CHAT: ${pesanMasuk}
REPLY: ${pesanTerkirim}
DATE: ${chatDate}
--------------------
          `
        );
      }
    })

    /**
     * Log error and send an error message to user
     */
    .catch((error) => {
      console.error(error);
      bot.sendMessage(chatId, "Oops! Sepertinya terjadi kesalahan, coba lagi nanti.");
    });
});
