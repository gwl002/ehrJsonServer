module.exports = function() {
  return Object.assign({},
    require('./hcr.json'),
    require('./allergyadr.json'),
    require('./dispensing.json'),
    require('./system.json'),
    );
};