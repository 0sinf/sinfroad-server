const bcrypt = require('bcrypt');

module.exports = {
  username : "",
  password : bcrypt.hashSync('', 10),
  sessionKey: ""
}