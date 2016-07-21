var express     = require('express');
var language    = require('../language/ES');
var F           = require('../controllers/Functions');
var multipart         = require('connect-multiparty');
var multipartMiddleware = multipart();
var Complaint    = require('../controllers/ComplaintsController');
var router      = express.Router();
var TPL         = "index";

module.exports = function(obj, passport){

  router.get('/', function(req, res) {
    var response = F.infoPage(obj,TPL,language,req);
    res.render(TPL, response );
  });
    
  router.post('/save', function ( req , res ){
    var validator = "";
    req.body.date = F.getDateMomment();
    validator = F.validatorForm(req);
    //if (validator.state === 200) {
      Complaint.save(req.body,function(data){
        res.json(data);
      });
    /*}else{
      res.json(validator)
    }*/

  });

    return router;
};