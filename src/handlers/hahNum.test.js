import sendMessage from '../common/sendMessage.js';
import { createOrUpdate } from '../common/database.js';

import { setHahNum, doSetHahNum } from './hahNum.js';

jest.mock('../common/sendMessage.js');
jest.mock('../common/database.js');

test('setHahNum', async () => {
  const chatId = 1234
  await setHahNum(chatId)

  const expected = 'What is the patient\'s HAH number? (You can find it on the front of your blue file)';

  expect(sendMessage).toBeCalledWith(chatId, expected);
  expect(createOrUpdate).toBeCalledWith(chatId, {'State': 'SENT_HAH_NUM_REQ'});
})

test('doSetHahNum', async () => {
  const chatId = 1234;
  const hahNum = '324234';
  await doSetHahNum(chatId, hahNum);

  expect(createOrUpdate).toBeCalledWith(chatId, {
    'HAH Number': Number(hahNum),
    'State': null
  });
  expect(sendMessage).toBeCalledWith(chatId, `The patient's HAH number has been set to ${hahNum}!`);
})

test.each(['', 'xxx', '10xx', 'a12'])('doSetHahNum not a number: \'%s\'', async (hahNum) => {
  const chatId = 1234;
  await doSetHahNum(chatId, hahNum);

  expect(createOrUpdate).not.toBeCalled();
  expect(sendMessage).toBeCalledWith(
    chatId,
    'The patient\'s HAH number must be a number! Please enter a number.'
  );
})
