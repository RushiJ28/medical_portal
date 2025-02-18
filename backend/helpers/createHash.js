const bcrypt = require("bcrypt"); //library used to store hash password in DB and not the plain password text.

const sailtRounds = 10;

async function createHash(password) {
  return bcrypt
    .hash(password, sailtRounds)
    .then((hash) => {
      console.log(hash);
      return hash;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}

module.exports = createHash;
