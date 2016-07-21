//var email           = require('mandrill-send')('DKbxkiJxNMq4RUvQss02Pg');
var Moment          = require('moment-timezone');
var moment          = require('moment');
var bCrypt          = require('bcrypt-nodejs');
var fs              = require('fs');
var root            = __dirname.toString().replace("controllers", "");
var zone            = 'America/Lima';
var flagLog = 1;
module.exports = {
    notPermission : {
      data  : [],
      state : 403,
      msg   :'You not have permission'
    },
    infoPage : function (obj,TPL,language,req){
      var menu = "";
      if(req.hasOwnProperty("user")){
        if(req.user.menu){
          menu = req.user.menu;
        }
      }
      return { 
          tpl     : TPL, 
          title   : obj.title, 
          url     : obj.url,
          language: language, 
          user    : req.user ? req.user : "",
          menu    : menu,
          response: {}          
      };
    },
    createHash: function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    },
    countObject: function (obj) { var count = 0; for(var prop in obj) { count++; } return count; },
    log: function(string){
      string = typeof(string) == "string" ? string : JSON.stringify(string);
      if(flagLog){
        console.log(process.env.ENVIRONMENT);
        console.log(string);
      }
    },
    isAuthenticated: function (req, res, next) {
      if (!req.isAuthenticated())
        return res.redirect('/login');
      next();
    },
    notIsAuthenticated: function (req, res, next) {
      if (req.isAuthenticated()){
        return res.redirect('/');  
      }
      next();
    },
    verifyAccessRoles:function(TPL,req){
      var access = false;
      if(req.user){
        var menu = req.user.menu;
        if(menu){          
          menu.forEach(function(row){
            row.items.forEach(function(item){              
              if(item.path === TPL){
                access = true;
              }
            });
          });
        }
      }
      return access;
    },
    readFile: function (route, callback){
      fs.readFile(route, 'utf8', function(err, data) {
        callback(err,data);
      });
    },
    writeFile: function (route, content, callback){
      fs.writeFile(route, content, function (err) {
        callback(err);
      });
    },
    validatorForm: function (req){//not used, only greeter module
      req.assert('name', 'Name is required').notEmpty();
      req.assert('email', 'Email is required').notEmpty();

      req.sanitize('name').trim();
      req.sanitize('email').trim();
      req.sanitize('content').trim();

      var errors = req.validationErrors();
      var data = {data:null,state:true};

      if( errors){
        data.state = false;
        data.msg = errors
      }
      return data;
    },

    getDateMomment:function(){
      return Moment().tz(zone).format();
    },
    getDateTimezone:function(date,timezone){
      return Moment(date).tz(timezone).format();
    },
    trim:function(string) {
      string = string.toUpperCase();
    
      string = string.replace(/[Á]/g,'A');
    	string = string.replace(/[É]/g,'E');
    	string = string.replace(/[Í]/g,'I');
    	string = string.replace(/[Ó]/g,'O');
    	string = string.replace(/[Ú]/g,'U');
    	string = string.replace(/[Ñ]/g,'N');
    	string = string.replace(/[Ä]/g,'A');
    	string = string.replace(/[Ë]/g,'E');
    	string = string.replace(/[Ï]/g,'I');
    	string = string.replace(/[Ö]/g,'O');
    	string = string.replace(/[Ü]/g,'U');
    	string = string.replace(/[À]/g,'A');
    	string = string.replace(/[È]/g,'E');
    	string = string.replace(/[Ì]/g,'I');
    	string = string.replace(/[Ò]/g,'O');
    	string = string.replace(/[Ù]/g,'U');
    	string = string.replace(/[Ŝ]/g,'S');
    	string = string.replace(/@/g,'');
    	string = string.replace(/&/g,'S');
    	string = string.replace(/Ã/g,'A');
    	string = string.replace(/©/g,'C');
    	string = string.replace(/±/g,'');

    	var array = string.split("");
    	var str = "";
    	
    	for (var i in array) { 
            if (!/^[A-Z ]+$/.test(array[i])){
                array[i] = " ";
    	    }
    	    str += array[i];
        }
    	string = str;
    	
    	string = string.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');//trim
    	string = string.toLowerCase();
      return string;
    },
    
    firstLetterToUppercase: function (string){
      string = string.toLowerCase();
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    
    randomUser: function (inferior,superior){
     	var numPosibilidades = superior - inferior;
     	var aleat = Math.random() * numPosibilidades;
     	aleat = Math.round(aleat);
     	
     	return parseInt(inferior) + aleat;
    }
}
