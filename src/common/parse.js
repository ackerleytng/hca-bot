const parse = (text) => {
  if (!text) {
    return { text };
  }

  const commandRegex = /^\/(\w+)\s*/;
  const m = text.match(commandRegex);

  let out = { text };

  if (m) {
    out.command = m[1];

    const remainder = text.replace(commandRegex, '');
    if (remainder.length > 0) {
      const args = remainder.split(/\s+/);

      if (args.length > 0) {
        out.args = args
      }
    }
  }

  return out;
}


export default parse;
