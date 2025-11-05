export const genId = () => {
  let id = '';
  const
    rand1 = `${Math.round(Math.random() * 2**32)}`,
    rand2 = `${Math.round(Math.random() * 2**32)}`;

  const maxLen = Math.max(rand1.length, rand2.length);

  for(let i = 0 ; i < maxLen; i++)
    id += rand1[i] ^ rand2[i];

  return id;
};

