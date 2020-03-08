import sendMessage from '../common/sendMessage.js';


const menu = [
  [{
    text: 'Set/Change Name',
    callback_data: 'name'
  }],
  [{
    text: 'Set/Change Patient ID',
    callback_data: 'patientId'
  }],
];

const start = (body) => {
  const chatId = body.message.chat.id;

  sendMessage(chatId, 'Hello! Please set your name and patient ID number!', menu);

  // sendMessage(chatId, 'Thank you for registering! HCA will be using this chat to provide you with updates.');
};


export default start;
