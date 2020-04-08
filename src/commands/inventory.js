async function inventory(msg, player) {
  const res = await player.inventoryToString;
  if (process.argv.includes("ignorePrivateChannels") || !player.privateChannel)
    msg.reply(res, { split: true });
  else {
    const guild = msg.guild;
    const channels = guild.channels;
    const privateChannel = channels.find((x) => x.id === player.privateChannel);
    if (!privateChannel)
      throw `private channel ${player.privateChannel} not found`;
    privateChannel.send(res, { split: true });
  }
}

module.exports = inventory;
