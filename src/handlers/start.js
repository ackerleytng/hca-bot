import sendMessage from '../common/sendMessage.js';
import { createOrUpdate } from '../common/database.js';

// Unused for now
const menu = [
  [{
    text: 'Set/Change Name',
    callback_data: 'name'
  }],
  [{
    text: 'Set/Change Patient ID',
    callback_data: 'patientId'
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
    'State': 'START_SENT_PATIENT_ID_REQ'
  });
  return await sendMessage(
    chatId, `Hello ${name}, what is the patient's HCA ID number?`);
};

export const doStartSetPatientId = async (chatId, text) => {
  const patientId = Number(text);

  await createOrUpdate(chatId, {
    'Patient ID': patientId,
    'State': null
  });
  return await sendMessage(
    chatId, 'Thank you for registering! HCA will be using this chat to provide you with updates.');
};
