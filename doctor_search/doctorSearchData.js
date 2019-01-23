module.exports = function() {
  return Object.assign({},
    require('./searchResult.json'),
    require('./hci.json'),
    require('./hcp.json'),
    require('./pppdoctor.json'),
    require('./ppphci.json'),
    require('./ehrdoctor.json'),
    require('./system.json'),
    );
};