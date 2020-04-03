function hasRole(msg, role) {
  return msg.member.roles.array().filter(x => x.name === role).length > 0;
}
module.exports = hasRole;
