const tableId = 'Telegram IDs';
const airtableUrl = `https://api.airtable.com/v0/${airtableBaseId}/${tableId}`;
const headers = { Authorization: `Bearer ${airtableApiKey}`, 'Content-Type': 'application/json' }


export const doListRecords = async (offset) => {
  const p = {
    view: 'Grid view',
  }

  if (offset) {
    p.offset = offset
  }

  const params = new URLSearchParams(p);
  const url = `${airtableUrl}?${params.toString()}`;
  const response = await fetch(url, {
    method: 'GET',
    headers
  });

  return response.json();
}

export const listRecords = async () => {
  const records = [];

  let offset = null;
  do {
    const page = await doListRecords(offset);
    records.push(...page.records);
    offset = page.offset;
  } while (offset);

  return records;
}

export const getByChatId = async (chatId) => {
  const params = new URLSearchParams({
    maxRecords: 1,
    view: 'Grid view',
    filterByFormula: `{Chat ID} = ${chatId}`
  });
  const url = `${airtableUrl}?${params.toString()}`;
  const response = await fetch(url, {
    method: 'GET',
    headers
  });

  const data = await response.json();
  const records = data.records;
  return records.length == 0 ? null : records[0];
};

export const create = async (chatId, fields) => {
  const data = { fields: { 'Chat ID': chatId, ...fields } };

  const response = await fetch(airtableUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });

  return await response.json();
};

export const update = async (recordId, fields) => {
  const response = await fetch(`${airtableUrl}/${recordId}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ fields })
  });

  return await response.json();
};

export const createOrUpdate = async (chatId, fields) => {
  const record = await getByChatId(chatId);

  if (record) {
    await update(record.id, fields);
  } else {
    await create(chatId, fields);
  }
};
