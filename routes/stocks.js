//stocks/:symbolname으로검색했을 때 json형태 결과 나타나게하기
//SELECT * FROM stock 같은 형식으로 할 것
var express = require('express');
var router = express.Router();
const mysql      = require('mysql');
const connection 		 = require("../dbconnection.js");

router.use(function(req, res, next) {
  next();
});

router.get('/', function(req, res) {
  res.render('description', { title: 'GET stocks/<종목코드>', des: 'stocks/<종목코드>로 요청보내세요. (ibm, shop.trt, tsco.lon)' });
});
/*
GET /stocks/<종목코드> 에 요청을 보내면 json 형식으로 <종목코드>를 포함하여 응답하는 express 프로그램을 작성합니다. 
  요청 예) GET /stocks/APPL
  응답 예) { “stock_name”: “APPL" }
*/
router.get('/:symbol', function(req, res) { //db에서 select문으로 화면에 보여주기 (추가필요)
  //res.send(req.params.symbolname);
  var symbolname = req.params.symbol;
  connection.query(`SELECT * from daily WHERE symbol='${symbolname}'`, (err, results) => {
      if (err) throw err;
      //console.log(results); //results에서 필요데이터뽑아서 json형식의 변수만들어서 res.send? res.json?해야할듯
      console.log(typeof results);
      res.json(results);
  });
});


module.exports = router;