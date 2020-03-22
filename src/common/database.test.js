import { listRecords } from './database.js';

const fetchFunction = (returnValue) =>
      () => Promise.resolve({
        json: () => returnValue,
      });


test('listRecords works without pagination', async () => {
  const expected = ["a", "b", "c"];
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => ({records: expected}),
  }));

  const records = await listRecords();
  expect(records).toEqual(expected);
})


test('listRecords works with pagination', async () => {
  const last = ["d", "e", "f"];
  const first = ["a", "b", "c"];
  global.fetch = jest.fn(fetchFunction({records: last}))
    .mockImplementationOnce(fetchFunction({records: first, offset: "someOffset"}));

  const records = await listRecords();
  expect(records).toEqual([...first, ...last]);
})


test('listRecords works with more pagination', async () => {
  const last = ["g", "h", "i"];
  const first = ["a", "b", "c"];
  const second = ["d", "e", "f"];
  global.fetch = jest.fn(fetchFunction({records: last}))
    .mockImplementationOnce(fetchFunction({records: first, offset: "someOffset"}))
    .mockImplementationOnce(fetchFunction({records: second, offset: "someOffset"}));

  const records = await listRecords();
  expect(records).toEqual([...first, ...second, ...last]);
})
