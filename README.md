# HCA Bot

Here's the code for a bot for HCA Hospice Care.

It allows patients and their families to sign up with the telegram bot so for updates from HCA.

## Developing

Starting a wrangler dev server on your dev machine:

```
wrangler dev
```

This allows you to run the code and debug it using `console.log()`.

Once you publish it to workers.dev, it's really difficult to get any feedback since `console.log()` doesn't work.

Another point to note is that cloudflare cuts all the execution threads relating to an endpoint once the main handler returns (200 OK or otherwise).

Hence, any interactions you need to do (calling out to database, replying to the telegram chat, etc) need to complete *before* you return 200 OK to the incoming request from the webhook.

### Note to self: Sending messages to the local dev server

You'll need a chatId that actually exists (12345678 below). The easiest way to get a valid chatId is to set up everything, trigger the bot and look up the chatId in the Airtable.

Another way to do this is to have a debug handler that dumps the incoming body from Telegram to somewhere on the internet. I recommend https://ptsv2.com/, which has a simple, no-auth-required interface for dumping.

To send a message, use something like this, where `/start` is the message Telegram will post to your bot.

```
curl --silent -H 'Content-Type: application/json' -X POST http://localhost:8787/webhook/<some string used as the telegramWebHookToken>/ -d '{"update_id":702475967,"message":{"message_id":122,"from":{"id":12345678,"is_bot":false,"first_name":"Apple","last_name":"Pineapple","username":"applepineapple","language_code":"en"},"chat":{"id":12345678,"first_name":"Apple","last_name":"Pineapple","username":"applepineapple","type":"private"},"date":1582433314,"text":"/start"}}' | jq
```

> This will send a message to chat id 12345678. Hope that Telegram will ensure that bots cannot talk to chats they're not added to, or that chat doesn't actually exist.

## Deployment

There's a bit of a catch-22 because while `wrangler publish` creates the worker, it will validate the code first, which will fail because the secrets have not been installed.

Publishing the secrets first will fail because there is no worker yet.

So the solution is to manually create the worker with the template script using workers.dev's web GUI, then publish the secrets and then `wrangler publish`.

### Secrets

Do

```
./scripts/set-secrets.sh secrets
```

where secrets is a bash-sourceable file of the format

```
telegramWebHookToken=secretGoesHere
telegramBotToken=secretGoesHere
telegramDebugChatId=secretGoesHere
airtableBaseId=secretGoesHere
airtableApiKey=secretGoesHere
```

## Notes

This bot was developed with the primary consideration of having little to no running costs. Being a pilot project for a charity, there was no budget allocated for this project at all.

I chose to use Airtable as the persistent store, because

+ it offers an awesome API for updating the database
+ it provides a nice spreadsheet interface through which HCA can easily do backend updates as necessary
+ and it has a free tier, which is sufficient for the bot's purposes for now (thanks so much Airtable!)

I chose to use workers.dev to run a webhook, because

+ it can run wasm compiled from nodejs - Javascript is a popular language and it would be easier for HCA to find other developer volunteers, if necessary
+ it has a free tier, which is sufficient for the bot's purposes for now (thanks so much Cloudflare!)

I was wrangling with the setup earlier, but after understanding that execution gets cut off the moment the original request has been handled, things became a lot smoother. `wrangler dev` from the `wrangler` cli is probably the best thing since sliced bread for workers.dev introspection.
