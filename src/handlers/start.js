import sendMessage from '../common/sendMessage.js';
import { createOrUpdate } from '../common/database.js';

// Unused for now
const menu = [
  [{
    text: 'Set/Change Name',
    callback_data: 'name'
  }],
  [{
    text: 'Set/Change HAH Number',
    callback_data: 'hahNum'
  }],
];


export const start = async (chatId) => {
  await createOrUpdate(chatId, {
    'State': 'START_SENT_NAME_REQ'
  });
  return await sendMessage(chatId, 'Hello! How do I address you?');
};


export const doStartSetName = async (chatId, name) => {
  await createOrUpdate(chatId, {
    'Name': name,
    'State': 'START_SENT_PATIENT_NAME_REQ'
  });
  return await sendMessage(
    chatId,
    `Hi ${name}, what is the patient's name? `
  );
};

export const doStartSetPatientName = async (chatId, name) => {
  await createOrUpdate(chatId, {
    'Patient Name': name,
    'State': 'START_SENT_HAH_NUM_REQ'
  });
  return await sendMessage(
    chatId,
    `What is ${name}'s HAH Number? (You can find it on the front of your blue file)`
  );
};

export const doStartSetHahNum = async (chatId, text) => {
  const hahNum = Number(text);

  if (hahNum) {
    await createOrUpdate(chatId, {
      'HAH Number': hahNum,
      'State': null
    });
    return await sendMessage(
      chatId, 'Thank you for registering! HCA will be using this chat to provide you with updates.');
  } else {
    return await sendMessage(
      chatId,
      'The patient\'s HAH number must be a number! Please enter the HAH number.'
    );
  }
};
