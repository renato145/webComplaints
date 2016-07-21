var F               = require('./Functions'),
    Complaints = require('../models/ComplaintsModel');

module.exports = {
  findOne: function(params,callback) {
    var response = {state: 404, data: [] };
    try {
      Complaints.findOne(params, function(err, data) {
        (err) ? response.message = err.toString() : response.state = 200;
        response.data = data;   
        callback(response);
      });
    } catch (err) {
      response.state = 500;
      response.message  = err.toString();
      callback(response);
    }
  },

  find: function(params,callback) {
    var response = {state: 404, data: [] };
    try {
      Complaints.find(params, function(err, data) {
        (err) ? response.message = err.toString() : response.state = 200;
        response.data = data;
        callback(response);
      });
    } catch (err) {
      response.state = 500;
      response.message = err.toString();
      callback(response);
    }
  },

  save: function(params,callback) {    
    var response = {state: 404, data: [] };
    try {
      var newComplaints = new Complaints();
    
      newComplaints.content        = params.content;
      newComplaints.complaint_date = params.complaint_date;
      newComplaints.name           = params.name;          
      newComplaints.email          = params.email;
      newComplaints.code           = params.code;
      newComplaints.date           = params.date;
      newComplaints.state          = 0;

      newComplaints.save(function(err){
        (err) ? response.message = err.toString() : response.state = 200;
        callback(response);
      });
    } catch (err) {
      response.state = 500;
      response.message = err.toString();
      callback(response);
    }
  },

  getReport: function(params,callback) {
    var response = {state: 404, data: [] };
    /*
      var data = {
        date_ini: F.getDateTimezone(params.date_ini + " 00:00:00", params.timezone),
        date_end: F.getDateTimezone(params.date_end + " 23:59:59", params.timezone)
      }
    */
    try {
      Complaints.getReportByDate(params,function(data){
        /*data.map(function(row){
          out +=  row._id+','+
          row.ride_id+','+
          row.driver_id+','+
          row.company_id+','+
          row.amount+','+
          row.ticket +','+
          row.reason +','+
          row.observation.replace(",", ";") +','+
          F.getDateFormat(row.date,timeZone)  +'\n';
        })*/
        response.state = 200;
        response.data = data;
        callback(response);
      });
    } catch (err) {
      response.state = 500;
      response.message = err.toString();
      callback(response);
    }
  }
};
