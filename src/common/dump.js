const dump = async (data) => {
  return await fetch(
    'https://ptsv2.com/t/umrze-1582360124/post',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
}

export default dump;
