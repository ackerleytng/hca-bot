import sendMessage from './sendMessage';


const sendDebugMessage = (d) => sendMessage(Number(telegramDebugChatId), JSON.stringify(d));

export default sendDebugMessage;
