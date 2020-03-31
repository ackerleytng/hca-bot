import sendMessage from '../common/sendMessage.js';
import { createOrUpdate } from '../common/database.js';

export const setPatientName = async (chatId) => {
  await createOrUpdate(chatId, {
    'State': 'SENT_PATIENT_NAME_REQ'
  });
  return await sendMessage(chatId, 'What is the patient\'s name?');
};

export const doSetPatientName = async (chatId, name) => {
  await createOrUpdate(chatId, {
    'Patient Name': name,
    'State': null
  });
  return await sendMessage(chatId, `The patient's name is set to ${name}!`);
};
