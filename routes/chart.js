var express = require('express');
var router = express.Router();
var request = require('request');
//const mysql      = require('mysql');
const connection	 = require("../dbconnection.js");

router.get('/', function(req, res) {
    res.render('description', { title: 'symbol 차트 그리기', des: 'chart/<종목코드>로 요청보내세요. (ibm, bab, baba)' });
});

router.get('/:symbol/:option', function(req, res) { 
    //res.send(req.params.symbolname);
    var symbolname = req.params.symbol;
    var optionname = req.params.option;

    console.log(optionname);
    var datas = [] ; //
    connection.query(`SELECT date,${optionname} from ${symbolname}`, (err, results) => { //symbol 테이블 데이터 전체 (OBJECT)
        if (err) throw err;
        //console.log(results[0].open);
        console.log(results.length);
        //res.json(results);
        datas.push(results);
        //console.log("type", typeof datas);
        res.render('draw', {title : symbolname, option: optionname, datas : results })
    });
  });
  //top100, 실시간 급등(실시간으로 받아오는 어떤거있는지 찾아보기)
  module.exports = router;