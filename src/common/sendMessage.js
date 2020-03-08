const sendMessage = async (chatId, text, keyboard) => {
  const message = {
    chat_id: chatId,
    text: text
  };

  if (keyboard) {
    message.reply_markup = {
      inline_keyboard: keyboard
    };
  }

  const response = await fetch(
    `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    });

  return await response.json();
}

export default sendMessage;
