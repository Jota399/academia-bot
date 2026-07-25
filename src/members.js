const fs = require('fs');
const path = require('path');

const membersPath = path.join(__dirname, '../config/members.json');

function loadMembers() {
  try {
    return JSON.parse(fs.readFileSync(membersPath, 'utf8'));
  } catch (err) {
    return {};
  }
}

function saveMembers(members) {
  fs.writeFileSync(membersPath, JSON.stringify(members, null, 2));
}

function linkMember(authorId, alias) {
  const members = loadMembers();
  members[authorId] = alias;
  saveMembers(members);
}

function getAliasForAuthor(authorId) {
  const members = loadMembers();
  return members[authorId] || null;
}

module.exports = { linkMember, getAliasForAuthor };
