import { listRecords } from '../common/database.js';

const listUsers = async () => {
  const users = await listRecords();

  return users.map((r) => ({
    // If value is null, the entire key/value pair will be left out
    name: r.fields["Name"],
    patientId: r.fields["Patient ID"],
    chatId: r.fields["Chat ID"],
  }))
}

export default listUsers;
