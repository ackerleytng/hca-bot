import { listRecords } from '../common/database.js';

const listUsers = async () => {
  const users = await listRecords();

  return users.map((r) => ({
    // If value is null, the entire key/value pair will be left out
    name: r.fields['Name'],
    patientName: r.fields['Patient Name'],
    hahNum: r.fields['HAH Number'],
    chatId: r.fields['Chat ID'],
  }))
};

export default listUsers;
