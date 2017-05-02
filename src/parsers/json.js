const parse = (string) => {
  if (string === '') {
    return {};
  }
  return JSON.parse(string);
};

export default parse;
