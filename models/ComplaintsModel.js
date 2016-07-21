var config 	 = require('../config'),
	mongoose = require('mongoose'),
	Schema   = mongoose.Schema,
	data 	 = new Schema({
		content    	 : { type: String, default: "not_content" },
		complaint_date : { type: String, default: "not_complaint_date" },
		name         : { type: String, default: "not_name" },	
		email 			 : { type: String, default: "not_email" },		
		code 	 	     : { type: String, require: true },
		state   	   : { type: Number, default: 0 },
		username	   : { type: String, require: true },
		date 		   	 : { type: Date, require: true },
		update 		   : { type: Date, require: true },
		active		   : { type: Boolean, default: true }
	}),

conn = mongoose.createConnection(config[process.env.ENVIRONMENT].database);

module.exports = conn.model('complaints', data);