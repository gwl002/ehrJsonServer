module.exports = function() {
  return Object.assign({},
    require('./system.json'),
	require('./allergyadr.json'),
	require('./dispensing.json'),
    require('./hci.json'),
    require('./hcp.json'),
    require('./pppdoctor.json'),
    require('./basicSearch.json'),
    require('./ehrdoctor.json')
    );
};