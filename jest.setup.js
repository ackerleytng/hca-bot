/*
 * Because workers.dev provides secrets as global variables,
 *   we have to fake these variables for some imports in
 *   *.test.js files to work
 */

global.telegramWebHookToken = 'testTelegramWebHookToken';
global.telegramBotToken = 'testTelegramBotToken';
global.telegramDebugChatId = 'testTelegramDebugChatId';
global.airtableBaseId = 'testAirtableBaseId';
global.airtableApiKey = 'testAirtableApiKey';
