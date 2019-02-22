module.exports = function() {
  return Object.assign({},
    require('./system.json'),
    require('./searchHcp.json'),
    require('./loadImageCaptcha.json'),
    require('./loadSoundCaptcha.json'),
    require('./checkAuthCode.json'),
    require('./validateHkic.json'),
    require('./checkChnName.json'),
    require('./toUtfChar.json'),
    require('./activateSession.json'),
    require('./sessionTimeOut.json'),
    require('./saveOlesData.json')
    );
};