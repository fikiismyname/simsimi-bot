# What is this bot about?

Telegram bot for chat based on Node JS using API SimSimi by [Me](https://github.com/fikiismyname)

![SimiSimi image](https://simsimi.com/_nuxt/img/simsimi_image.4de3919.png)

# How to deploy?

## Installing requirements

- Clone this repo :

```git
git clone https://github.com/fikiismyname/simsimi-bot.git
cd simsimi-bot
```

> Make sure NodeJS and npm is installed

- Install required npm packages :

```node
npm install
```

## Setting up config file

- Copy example .env.example as .env :
  `cp .env.example .env`

Fill up all the fields. Meaning of each fields are discussed below:

- **BOT_TOKEN** : The telegram bot token that you get from [@BotFather](https://t.me/botfather)
- **BOT_LANG** : This is for bot language settings [Windows Locale Codes](https://id.wikipedia.org/wiki/Windows_Locale_Codes/)
- **BOT_TIMEZONE** : This is your timezone area setting [List of tz database time zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
- **API_URL** : The API URL that you get from [Free Simsimi API](https://simsimi.net/)

# Deploying

- Start the bot by using this command :
  `npm start`

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

<details><summary>Reference & Thanks</summary>

- Moment Timezone: [Github Repo](https://github.com/moment/moment-timezone)
- Free Simsimi API: [Website](https://simsimi.net/)
- Node.js Telegram Bot API: [Github Repo](https://github.com/yagop/node-telegram-bot-api)
- Axios - Promise based HTTP client for the browser and node.js: [Github Repo](https://github.com/axios/axios)
</details>
