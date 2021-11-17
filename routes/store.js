var express = require('express');
var router = express.Router();
var request = require('request');
//const mysql      = require('mysql');
const connection	 = require("../dbconnection.js");

router.get('/', function(req, res) {
    res.render('description', { title: 'daily 테이블에 데이터 저장', des: 'store/<종목코드>로 요청보내세요. (ibm, shop.trt, tsco.lon)' });
});

// /store/:symbolname 으로 들어오면 해당 symbol의 data를 db에 저장함
router.get('/:symbol', function(req, res) { //db에서 select문으로 화면에 보여주기 (추가필요)
    const apiKey = 'ZO8S591P8HTYI8LV'
    const requestUrl = 'https://www.alphavantage.co/query?' 
    let symbolname = req.params.symbol;
    let queryParams = `function=TIME_SERIES_DAILY&outputsize=compact&symbol=${symbolname}&apikey=${apiKey}`
    
    request(
        {
            url : requestUrl + queryParams,
            method : "GET",
            json: true
        },
        function(error, response, body) {
            if (error) {throw new Error(error);}

            const allDateData = body['Time Series (Daily)'];
            const alldatelist = Object.keys(allDateData);
            const dateList = alldatelist.splice(0, 3); //데이터 몇개만 넣어보기
            //console.log(allDateData[dateList[0]]["5. volume"]);
            
            // Query to insert multiple rows
            let query = `INSERT IGNORE INTO daily (symbol, date, volume) VALUES ?;`;
            // Values to be inserted
            let values = [];
            for (var i = 0; i<dateList.length; i++) {
                values.push([symbolname, dateList[i], allDateData[dateList[i]]["5. volume"]]);
            }
            console.log(values[0]);
            
            // Executing the query
            connection.query(query, [values], (err, rows) => {
                if (err) throw err;
                console.log(`${symbolname} : All Rows Inserted !`);
                res.send(`${symbolname} : All Rows Inserted !`);
            }); 
        }
    )
});


module.exports = router;

