module.exports = function() {
  return Object.assign({},
    require('./hcr.json'),
    require('./otpValidation.json'),
    require('./otpResend.json'),
    require('./deviceRegister.json'),
    require('./biometricsRegister.json'),
    require('./accountCreation.json')
    );
};