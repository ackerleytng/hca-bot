import { testables } from './message.js';
const { validSendMessageRequest, buildMessage } = testables;


test('validSendMessageRequest should work', () => {
  const valid = {
    message: 'Dear {{ Name }}, hope you and {{ Patient Name }} are doing great!',
    chatIds: ['21342', '12345']
  };
  expect(validSendMessageRequest(valid)).toBeTruthy();

  [
    undefined,
    {},
    {message: 'test'},
    {chatIds: ['13453']},
    {
      message: [],
      chatIds: ['13453']
    },
    {
      message: [],
      chatIds: []
    },
    {
      message: 'valid',
      chatIds: 'invalid'
    },
  ].map((v) => expect(validSendMessageRequest(v)).toBeFalsy());
});
