function isAuthorized(msg) {
  return (
    process.argv.includes("unsafe") || msg.guild.id === "661804149129871371"
  );
}

module.exports = isAuthorized;
