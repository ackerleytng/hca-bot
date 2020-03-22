import listUsers from './users.js';
import sendMessage from '../common/sendMessage.js';

const validSendMessageRequest = (body) =>
      (body &&
       body.message && typeof body.message === 'string' && body.message.length > 0 &&
       body.chatIds && Array.isArray(body.chatIds) && body.chatIds.length > 0);

const buildUserLookup = async () => {
  const users = await listUsers();
  return Object.fromEntries(users.map(u => [u.chatId, u]));
};

const buildMessage = (message, user) => message.replace('{{ Name }}', user.name);

const sendAll = async (message, users) => {
  const promises = users.map((u) => sendMessage(u.chatId, buildMessage(message, u)));
  return await Promise.all(promises);
};

const handleMessage = async (body) => {
  if (!validSendMessageRequest(body)) {
    return 'Invalid message!';
  }

  const lookup = await buildUserLookup();
  const validUsers = body.chatIds
        .map((i) => lookup[i])
        .filter(u => u !== undefined);
  return await sendAll(body.message, validUsers);
};

export const testables = {
  validSendMessageRequest,
};
export default handleMessage;
