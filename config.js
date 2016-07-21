module.exports = {
  "production" : {
    "url" : "",
    "port" : "80",
    "database" : "mongodb://complaints:mierda@ds013014.mlab.com:13014/complaints",
    "certificates": {
      "hsKey": "",
      "hsCert": "",
      "chain":{
        "easyCA0": "",
        "easyCA1": ""
      }
    },
    "forceSSL" : false,
    "secureCookie": false,
    "maxAge": 1000*60*60*8,
    "MCLA" : 9999999
  },
  "localhost" : {
    "url" : "http://localhost:3000/",
    "port" : "3000",
    "database" : "mongodb://complaints:mierda@ds013014.mlab.com:13014/complaints",
    "certificates": {
      "hsKey": "",
      "hsCert": "",
      "chain":{
        "easyCA0": "",
        "easyCA1": ""
      }
    },
    "forceSSL" : false,
    "secureCookie": false,
    "maxAge": 1000*60*60*8,
    "MCLA" : 9999999
  }
}