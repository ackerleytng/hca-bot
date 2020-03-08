import parse from './parse.js';


test('parse works with commands with no arguments', () => {
  const text = '/start';
  const expected = {
    command: 'start',
    text
  };

  expect(parse(text)).toStrictEqual(expected);
})

test('parse works with commands with 1 argument', () => {
  const text = '/command test';
  const expected = {
    args: ['test'],
    command: 'command',
    text
  };

  expect(parse(text)).toStrictEqual(expected);
})

test('parse works with commands with many arguments', () => {
  const text = '/command test0       test1   test2';
  const expected = {
    args: ['test0', 'test1', 'test2'],
    command: 'command',
    text
  };

  expect(parse(text)).toStrictEqual(expected);
})

test('parse works on non-commands', () => {
  const text = 'John Tan';
  const expected = {
    text
  };

  expect(parse(text)).toStrictEqual(expected);
})

test('parse works on null', () => {
  const text = null;
  const expected = {
    text
  };

  expect(parse(text)).toStrictEqual(expected);
})
