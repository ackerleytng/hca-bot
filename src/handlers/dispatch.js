import sendMessage from '../common/sendMessage.js';
import sendDebugMessage from '../common/sendDebugMessage.js';
import { getByChatId } from '../common/database.js';
import parse from '../common/parse.js';
import commands from './commands.js';


const lookup = {
  SENT_NAME_REQ: commands.doSetName,
  SENT_PATIENT_NAME_REQ: commands.doSetPatientName,
  SENT_HAH_NUM_REQ: commands.doSetHahNum,
  START_SENT_NAME_REQ: commands.doStartSetName,
  START_SENT_PATIENT_NAME_REQ: commands.doStartSetPatientName,
  START_SENT_HAH_NUM_REQ: commands.doStartSetHahNum,
};

const catchAllMessage = (text) => `Not sure what you mean with ${text}. If you have any comments or messages, please contact ${coordinatorName} @ ${coordinatorPhoneNumber} on ${coordinatorContactPlatforms}. Thank you!`;

const handleReply = async (chatId, text) => {
  const record = await getByChatId(chatId);
  const state = record.fields['State'];

  if (state) {
    const fn = lookup[state];

    if (!fn) {
      await sendDebugMessage(`Invalid state ${state}!`);
    } else {
      await fn(chatId, text);
    }
  } else {
    await sendMessage(chatId, catchAllMessage(text));
  }
};

const validCommand = (command) =>
      Object.keys(commands).includes(command);

const dispatch = async (body) => {
  if (body && body.message) {
    const chatId = body.message.chat.id;
    const text = body.message.text;
    const parsed = parse(text);
    const { command } = parsed;

    if (command) {
      if (!validCommand(command)) {
        await sendMessage(chatId, catchAllMessage(text));
      } else {
        await commands[command](chatId, parsed);
      }
    } else {
      await handleReply(chatId, text);
    }
  }

  return {
    body,
  };
}

export default dispatch;
