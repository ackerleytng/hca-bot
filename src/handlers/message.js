const validSendMessageRequest = (body) => {
  if (!body.message) {
    return "Invalid message!";
  }
}

const handleMessage = async (body) => {
  if (!body.message) {
    return "Invalid message!";
  }

  return await sendAll(body.message);
}
