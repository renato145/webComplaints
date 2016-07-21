var body = $('body');
var URL = window.location.origin;
var USER = USER ? USER : "";
var self = "";
$(function() {

  window.Global = {
    language: LANGUAGE ? LANGUAGE : {},
    init:function(){
      this.initEvents();
      this.bindEvents();
      this.form(); 
      self = this;
    },

    initEvents:function(){
      if ($('select').length > 0) {
          $('select').material_select();
      }
      if ($('.datepicker').length > 0) {
        $('.datepicker').pickadate({
          format: 'mm/dd/yyyy',
          selectMonths: true, // Creates a dropdown to control month
          selectYears: 15 // Creates a dropdown of 15 years to control year
        });
      }
      if ($('.datepickerFormat').length > 0) {
        $('.datepickerFormat').pickadate({
          format: 'yyyy-mm-dd',
          selectMonths: true, // Creates a dropdown to control month
          selectYears: 15 // Creates a dropdown of 15 years to control year
        });
      }
      $(".button-collapse").sideNav();
      $('.parallax').parallax();
    },

    bindEvents:function(){
      $('ul.tabs').tabs();
    },

    resetForm: function (frmID) {
        $("#" + frmID).find("input[type=text],input[type=email],input[type=tel], textarea").val("");
    },

    split: function( val ) {return val.split( /,\s*/ );},
    extractLast: function( term ) {return split( term ).pop();},
    numKeys:function(obj) { var count = 0; for(var prop in obj) { count++; } return count; },
    formatDate: function (date){
      var rdate = new Date(date);
      var dd = rdate.getDate();
      var mm = rdate.getMonth()+1; //January is 0!
      var yyyy = rdate.getFullYear();
      if(dd<10) {
          dd='0'+dd;
      }
      if(mm<10) {
          mm='0'+mm;
      }

      return dd + '/' + mm + '/' + yyyy ;
    },
    formatHour: function (date) {
      date = new Date(date);
      var hours = date.getHours();
      var minutes = date.getMinutes();
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes;
      return strTime;
    },
    adjustClientTimeOffset: function (obj, tz) {
      var server_date = obj.date;
      var server_offset = obj.timeZone;
      var gmt0_date = server_date + (server_offset * 60 * 1000);
      var client_offset_in_ms = tz * 60 * 1000;
      var output_date_to_client = gmt0_date + client_offset_in_ms;

      return output_date_to_client;
    },
    form:function(){
      $( "#form" ).validate({
        rules: {
          name: {
            required: true
          },
          email: {
            required: true
          },
          content: {
            required: true,
          }
        },
        messages: {
          /*name:{
            required: self.language.name_required
          },
          email:{
            required: self.language.email_required
          },
          content:{
            required: self.language.content_required
          }*/
        },
        submitHandler: function() {
          var form = $("#form");
          var data = form.serialize();
          var action = URL + "/save";
          self.sendForm(action,data);
        }
      });
    },
    
    sendForm: function(action,data){
      $('.allScreenLoading').show();
      $.ajax({
          type: "POST",
          url : action,
          data: data
      }).done(function( response ) {
        $('.allScreenLoading').hide();
        var message = self.language.not_saved,
            msg = [];
        if(response.state === 200){
          message = self.language.saved;
          self.resetForm("form");
        }else if( response.state === 400){
          response.data.map(function(item){
            msg.push("<p>"+item.msg+"</p>");
          });
          msg = msg.join("");
          $('.modalText').parent().html(msg);
        }
        $('.modalText').text(message);        
        $('#modalMsg').openModal();
      });    
    }
  },

  window.Global.init();


});
