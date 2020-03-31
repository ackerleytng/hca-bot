import sendMessage from '../common/sendMessage.js';
import { createOrUpdate } from '../common/database.js';

export const setHahNum = async (chatId) => {
  await createOrUpdate(chatId, {
    'State': 'SENT_HAH_NUM_REQ'
  });
  return await sendMessage(
    chatId,
    'What is the patient\'s HAH number? (You can find it on the front of your blue file)'
  );
};

export const doSetHahNum = async (chatId, text) => {
  const hahNum = Number(text);

  if (hahNum) {
    await createOrUpdate(chatId, {
      'HAH Number': hahNum,
      'State': null
    });
    return await sendMessage(
      chatId,
      `The patient's HAH number has been set to ${hahNum}!`
    );
  } else {
    return await sendMessage(
      chatId,
      'The patient\'s HAH number must be a number! Please enter a number.'
    );
  }
};
