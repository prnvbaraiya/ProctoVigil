const bcrypt = require("bcrypt");

const cryptingPassword = (password, callback) => {
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return callback(err);

    bcrypt.hash(password, salt, function (err, hash) {
      if (err) return callback(err);
      callback(null, hash);
    });
  });
};

const comparePassword = (plainPass, hashword, callback) => {
  bcrypt.compare(plainPass, hashword, function (err, isPasswordMatch) {
    return err == null ? callback(null, isPasswordMatch) : callback(err);
  });
};

module.exports = { cryptingPassword, comparePassword };
