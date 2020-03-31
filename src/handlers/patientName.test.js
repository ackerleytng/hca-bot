import sendMessage from '../common/sendMessage.js';
import { createOrUpdate } from '../common/database.js';

import { setPatientName, doSetPatientName } from './patientName.js';

jest.mock('../common/sendMessage.js');
jest.mock('../common/database.js');

test('setPatientName', async () => {
  const chatId = 1234;
  await setPatientName(chatId);

  expect(sendMessage).toBeCalledWith(chatId, 'What is the patient\'s name?');
  expect(createOrUpdate).toBeCalledWith(chatId, {'State': 'SENT_PATIENT_NAME_REQ'});
})

test('doSetPatientName', async () => {
  const chatId = 1234;
  await doSetPatientName(chatId, 'Apple');

  expect(createOrUpdate).toBeCalledWith(chatId, {
    'Patient Name': 'Apple',
    'State': null
  });
  expect(sendMessage).toBeCalledWith(chatId, 'The patient\'s name is set to Apple!');
})
