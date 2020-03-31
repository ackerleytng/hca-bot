import sendMessage from '../common/sendMessage.js';
import { getByChatId } from '../common/database.js';
import parse from '../common/parse.js';
import commands from './commands.js';


const lookup = {
  SENT_NAME_REQ: commands.doSetName,
  SENT_HAH_NUM_REQ: commands.doSetHahNum,
  START_SENT_NAME_REQ: commands.doStartSetName,
  START_SENT_PATIENT_NAME_REQ: commands.doStartSetPatientName,
  START_SENT_HAH_NUM_REQ: commands.doStartSetHahNum,
};

const handleReply = async (chatId, text) => {
  const record = await getByChatId(chatId);
  const state = record.fields['State'];

  if (state) {
    const fn = lookup[state];

    if (!fn) {
      await sendMessage(chatId, `Invalid state ${state}!`);
    } else {
      await fn(chatId, text);
    }
  } else {
    await sendMessage(
      chatId,
      `Not sure what you mean when you say ${text}!`
    );
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
        await sendMessage(chatId, `Not sure what you meant with ${text}!`);
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
