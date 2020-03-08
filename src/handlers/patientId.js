import sendMessage from '../common/sendMessage.js';
import { createOrUpdate } from '../common/database.js';

export const setPatientId = async (chatId) => {
  await createOrUpdate(chatId, {
    'State': 'SENT_PATIENT_ID_REQ'
  });
  return await sendMessage(
    chatId,
    'What is the patient\'s HCA ID number?'
  );
};

export const doSetPatientId = async (chatId, text) => {
  const patientId = Number(text);

  if (patientId) {
    await createOrUpdate(chatId, {
      'Patient ID': patientId,
      'State': null
    });
    return await sendMessage(
      chatId,
      `The patient's HCA ID has been set to ${patientId}!`
    );
  } else {
    return await sendMessage(
      chatId,
      'The patient\'s HCA ID must be a number!'
    );
  }
};
