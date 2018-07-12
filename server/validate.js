const approve = require('approvejs');

exports.validateEmail = {
  required: true,
  email: {
    message: 'Email not valid. Enter other email!'
  }
};
exports.validateName = {
  required: true,
  alpha: true,
  range: {
    min: 1,
    max: 32,
    message: 'Not Valid!'
  }
};
exports.validateMiddleName = {
  ignoreNull: true,
  alpha: true,
  range: {
    min: 1,
    max: 32,
    message: 'middle'
  }
};
exports.validateGender = {
  format: /^male$|^female$/,
};
exports.validateAge = {
  numeric: true,
  range: {
    min: 1,
    max: 99,
    message: 'age'
  }
};


