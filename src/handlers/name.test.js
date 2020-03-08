import sendMessage from '../common/sendMessage.js';
import { createOrUpdate } from '../common/database.js';

import { setName, doSetName } from './name.js';

jest.mock('../common/sendMessage.js');
jest.mock('../common/database.js');

test('setName', async () => {
  const chatId = 1234;
  await setName(chatId);

  expect(sendMessage).toBeCalledWith(chatId, 'What is your name?');
  expect(createOrUpdate).toBeCalledWith(chatId, {'State': 'SENT_NAME_REQ'});
})

test('doSetName', async () => {
  const chatId = 1234;
  await doSetName(chatId, 'Apple');

  expect(createOrUpdate).toBeCalledWith(chatId, {
    'Name': 'Apple',
    'State': null
  });
  expect(sendMessage).toBeCalledWith(chatId, 'Hello Apple!');
})
