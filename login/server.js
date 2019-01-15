console.log('starting server ...');

const jsonServer = require('json-server');
const server = jsonServer.create();

const middlewares = jsonServer.defaults();
const port = process.env.PORT || 8002;

var userAuthnDb = require('./db.json');

server.use(jsonServer.bodyParser);
server.use(middlewares);

/*
server.use(jsonServer.rewriter({
  '/api/users': '/users'
}));
*/

server.post('/users/token', (req, res) => {
  sDelimiter = String.fromCharCode(31);

  //Get parameters from HTTP headers
  var authz = req.headers['authorization'];
  if (typeof authz == 'undefined')
    authz = '';
  else
    authz = Base64.decode(authz);
  var clientId = req.headers['x-client-id'];
  if (typeof clientId == 'undefined') clientId = '';
  var clientSecret = req.headers['x-client-secret'];
  if (typeof clientSecret == 'undefined') clientSecret = '';
  console.log("body:",req.body);
  var grantType = req.body['grant_type'];
  var userName = "";
  var password = "";
  var otp = -999999;
  var otpToken = "";
  var bat = "";
  var challengeId = "";
  var challengeSecret = "";

  if (typeof grantType == 'undefined') grantType = '';
  if (grantType == '') {
    authz = authz.substring(0, 128);
  } else if (grantType == 'logon_password') {
  	var param = authz.split(sDelimiter);
  	console.log("logon_password");
    userName = param[0];
    password = param[1];
    authz = param[2];
  } else if (grantType == 'logon_otp') {
  	console.log(authz);
    var param = authz.split(sDelimiter);
    console.log(param);
    otp = param[0];
    otpToken = param[3];
    authz = "";
  } else if (grantType == 'logon_device') {
  	var param = authz.split(sDelimiter);
  	password = param[0];
  	authz = param[1];
  } else if (grantType == 'logon_biometric') {
  	var param = authz.split(sDelimiter);
  	console.log("__ params __",param)
  	bat = param[0];
  	challengeId = param[1];
  	challengeSecret = param[2];
  	authz = "";
  }

console.log('==================================================');
console.log('HTTP headers:');
console.log('-------------');
console.log('Authorization = ' + authz);
console.log('user name = ' + userName);
console.log('password = ' + password);
console.log('otp = ' + otp);
console.log('otp_token = ' + otpToken);
console.log('bat = ' + bat);
console.log('challenge ID = ' + challengeId);
console.log('challenge secret= ' + challengeSecret);
console.log('X-Client-Id = ' + clientId);
console.log('X-Client-Secret = ' + clientSecret);
console.log('==================================================');
console.log('HTTP body:');
console.log('----------');
console.log('grant_type= ' + grantType);
console.log('==================================================');

  if (req.method === 'POST') {
    let result = userAuthnDb.users.token.find(authnRep => {
      return authnRep.tdt == authz && authnRep.clientId == clientId && authnRep.grantType == grantType && 
             authnRep.userName == userName && authnRep.password == password && authnRep.otp == otp &&
             authnRep.otp_token == otpToken && authnRep.bat == bat && authnRep.challengeId == challengeId &&
             authnRep.challengeSecret == challengeSecret
    })
    if (result) {
      let {caseId, tdt, clientId, clientSecret, grantType, userName, password, ...authnRep} = result;
      if (authnRep.response.header != "") {
        res.setHeader('WWW-Authenticate', authnRep.response.header.WWWAuthenticate);
      }
console.log('Case = ' + caseId);
      res.status(authnRep.response.code).jsonp(authnRep.response.body);
    } else {
      res.status(400).jsonp({
        error: "invalid_request",
        errorMsg: "Invalid request"
      });
    }
  }
});

server.post('/users/logonchallenge', (req, res) => {
  sDelimiter = String.fromCharCode(31);

  //Get parameters from HTTP headers
  var authz = req.headers['authorization'];
  if (typeof authz == 'undefined')
    authz = '';
  else {
    authz = Base64.decode(authz);
    authz = authz.substring(0, 128);
  }
  var clientId = req.headers['x-client-id'];
  if (typeof clientId == 'undefined') clientId = '';
  var clientSecret = req.headers['x-client-secret'];
  if (typeof clientSecret == 'undefined') clientSecret = '';

console.log('==================================================');
console.log('HTTP headers:');
console.log('-------------');
console.log('Authorization = ' + authz);
console.log('X-Client-Id = ' + clientId);
console.log('X-Client-Secret = ' + clientSecret);
console.log('==================================================');

  if (req.method === 'POST') {
    let result = userAuthnDb.users.logonchallenge.find(authnRep => {
      return authnRep.tdt == authz && authnRep.clientId == clientId
    })
    if (result) {
      let {caseId, tdt, clientId, clientSecret, ...authnRep} = result;
console.log('Case = ' + caseId);
      res.status(authnRep.response.code).jsonp(authnRep.response.body);
    } else {
      res.status(400).jsonp({
        error: "invalid_request",
        errorMsg: "Invalid request"
      });
    }
  }
});

server.get('/users', (req, res) => {
  if (req.method === 'GET') {
  }
});

//server.use(router);
server.listen(port);


var Base64 = {

	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;

		input = Base64._utf8_encode(input);

		while (i < input.length) {

			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);

			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;

			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}

			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

		}

		return output;
	},

	// public method for decoding
	decode : function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;

		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

		while (i < input.length) {

			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			output = output + String.fromCharCode(chr1);

			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}

		}

		output = Base64._utf8_decode(output);

		return output;

	},

	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	},

	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;

		while ( i < utftext.length ) {

			c = utftext.charCodeAt(i);

			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}

		}

		return string;
	}

}