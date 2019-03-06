module.exports = function() {
  return Object.assign({},
    require('./hcr.json'),
    require('./allergyadr.json'),
    require('./dispensing.json'),
    require('./system.json'),
    require('./searchResult.json'),
    require('./hci.json'),
    require('./hcp.json'),
    require('./pppdoctor.json'),
    require('./ppphci.json'),
    require('./ehrdoctor.json'),
    require('./db.json'),
    require('./basicSearch.json'),
    require('./advSearch.json'),
    require('./notiHistory.json'),
    );
};