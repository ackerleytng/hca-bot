import sendMessage from '../common/sendMessage.js';
import { createOrUpdate } from '../common/database.js';

import { setPatientId, doSetPatientId } from './patientId.js';

jest.mock('../common/sendMessage.js');
jest.mock('../common/database.js');

test('setPatientId', async () => {
  const chatId = 1234
  await setPatientId(chatId)

  expect(sendMessage).toBeCalledWith(chatId, 'What is the patient\'s HCA ID number?');
  expect(createOrUpdate).toBeCalledWith(chatId, {'State': 'SENT_PATIENT_ID_REQ'});
})

test('doSetPatientId', async () => {
  const chatId = 1234;
  const patientId = '324234';
  await doSetPatientId(chatId, patientId);

  expect(createOrUpdate).toBeCalledWith(chatId, {
    'Patient ID': Number(patientId),
    'State': null
  });
  expect(sendMessage).toBeCalledWith(chatId, `The patient's HCA ID has been set to ${patientId}!`);
})

test.each(['', 'xxx', '10xx', 'a12'])('doSetPatientId not a number: \'%s\'', async (patientId) => {
  const chatId = 1234;
  await doSetPatientId(chatId, patientId);

  expect(createOrUpdate).not.toBeCalled();
  expect(sendMessage).toBeCalledWith(chatId, 'The patient\'s HCA ID must be a number!');
})
