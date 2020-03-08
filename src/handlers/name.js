import sendMessage from '../common/sendMessage.js';
import { createOrUpdate } from '../common/database.js';

export const setName = async (chatId) => {
  await createOrUpdate(chatId, {
    'State': 'SENT_NAME_REQ'
  });
  return await sendMessage(chatId, 'What is your name?');
};

export const doSetName = async (chatId, name) => {
  await createOrUpdate(chatId, {
    'Name': name,
    'State': null
  });
  return await sendMessage(chatId, `Hello ${name}!`);
};
