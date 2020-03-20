const { google } = require("googleapis");
const { client, MessageAttachment } = require("discord.js");

async function findStudent(name) {
  const sheets = google.sheets({
    version: "v4",
    auth: "AIzaSyDtJTwPg78fo1qrZuR4E81HA9oqOkXPSc4"
  });
  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.get(
      {
        spreadsheetId: "1J_DA4dtDvaK6OVCITKo4qQAr6FhVYgoJ1kuSjjFiy18",
        range: "A:C"
      },
      (err, res) => {
        if (err) reject("The API returned an error: " + err);
        const rows = res.data.values;
        const student = rows.filter(x => x[0] === name)[0];
        console.log(student);
        if (!student || student.length === 0) {
          resolve(null);
          return;
        }
        resolve({
          name: student[0],
          description: student[1],
          picture: student[2]
        });
      }
    );
  });
}

async function pnj(msg) {
  const name = msg.content.split(" ")[1];
  if (!name) {
    msg.reply("et le nom fdp ?");
    return;
  }
  const student = await findStudent(name);
  if (!student) {
    msg.reply("Aucun pnj ne correspond à la description");
  } else {
    msg.reply(`${name} ${student.description}`);
    const pic = new MessageAttachment(student.picture, "name.png");
    message.channel.send(pic);
  }
}

module.exports = pnj;
