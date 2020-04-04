function replyLongMessage(msg, content, maxLength = 1000, separator = "\n") {
  const splitted = content.split(separator);
  let res = [];

  let tmp = "";
  let count = 0;
  for (const s of splitted) {
    if (count >= maxLength) {
      res.push(tmp);
      tmp = "";
      count = 0;
    }
    count += s.length;
    if (s.length > 0) tmp = `${tmp}${separator}${s}`;
  }
  res.push(tmp);

  for (const s of res) {
    msg.reply(s);
  }
}

module.exports = replyLongMessage;
