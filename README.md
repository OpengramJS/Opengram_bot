# Opengram bot

Simple bot written with [Opengram](https://opengram.dev)

## Features
 - Inline mode search in [Telegram Bots API reference](https://core.telegram.org/bots/api) with pagination
 - User authentication with MongoDB / [Mongoose](https://mongoosejs.com/)
 - Sending id from inline mode
 - Media group handling example with [@opengram/media-group](https://github.com/OpengramJS/media-group)
 - Logging with [winston](https://github.com/winstonjs/winston)
 - Graceful stopping

## Setup

### Clone
```bash
git clone https://github.com/OpengramJS/Opengram_bot.git
cd Opengram_bot
````

### Create `.env` file:

Basic env configuration:

```dotenv
BOT_TOKEN=
MONGODB_URI=mongodb+srv://user:password@domain/dbName
DROP_PENDING_ON_START=true
NODE_ENV=production
```

### Install dependencies (skip for docker)

```bash
npm i
```

### Running 

#### PM2

```bash
pm2 start
```

#### Docker-compose
```bash
docker-compose up -d
```
