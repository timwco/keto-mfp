var express = require('express');
var router = express.Router();
const mfp = require('mfp');
const moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {

  let date = moment().format('YYYY-MM-DD');
  let calories = (req.query.f * 9) + (req.query.p * 4) + 80;
  console.log(req.query);

  mfp.fetchSingleDate(req.query.u, date, 'all', function(data){

    res.render('index', { 
        data: data, 
        fat: req.query.f, 
        protein: req.query.p,
        calories: calories 
      }
    );

  });

});

module.exports = router;
