var express = require('express');
var router = express.Router();
const mfp = require('mfp');
const moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {

  let date = moment().format('YYYY-MM-DD');
  console.log(date)

  mfp.fetchSingleDate('timwco', date, 'all', function(data){
    console.log(data);
    res.render('index', { data: data });
  });

});

module.exports = router;
