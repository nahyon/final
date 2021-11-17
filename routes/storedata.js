var express = require('express');
var router = express.Router();
var request = require('request');
//const mysql      = require('mysql');
const connection	 = require("../dbconnection.js");

//symbol DB update
router.get('/', function(req, res) {
    //res.render('description', { title: '<종목코드> 테이블에 data UPDATE !', des: 'storedata/<종목코드>로 요청보내세요. (outputsize = full) (ibm, bab, baba)' });
    
    //db에 저장된 table이름확인
    connection.query(`SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'stock'`, (err, table) => {
        if (err) throw err;
        let tables = [];
        for (var i = 0 ; i<table.length ; i++ ) {
            tables.push(table[i]["TABLE_NAME"]);
        }
        res.send(tables);
    });
    
});

// /storedata/:symbol로 들어오면 해당 symbol의 테이블에 data를 저장함
router.get('/:symbol', function(req, res) { 
    const apiKey = 'ZO8S591P8HTYI8LV'
    const requestUrl = 'https://www.alphavantage.co/query?' 
    let symbolname = req.params.symbol;
    let queryParams = `function=TIME_SERIES_DAILY&outputsize=full&symbol=${symbolname}&apikey=${apiKey}`

    request(
        {
            url : requestUrl + queryParams,
            method : "GET",
            json: true
        },
        function(error, response, body) {
            if (error) {throw new Error(error);}

            const timeseries = body['Time Series (Daily)']; //"Meta Data", "Time Series(daily)" 중 두번째거 저부
            const alldatelist = Object.keys(timeseries); //날짜만
            
            // Query to insert multiple rows
            let query = `INSERT IGNORE INTO ${symbolname}(date, open, high, low, close) VALUES ?;`; //'${symbolname}'랑 차이?

            // Values to be inserted
            let values = [];
            for (var i = 0; i<alldatelist.length; i++) {
                values.push([
                    alldatelist[i], 
                    timeseries[alldatelist[i]]["1. open"],
                    timeseries[alldatelist[i]]["2. high"],
                    timeseries[alldatelist[i]]["3. low"],
                    timeseries[alldatelist[i]]["4. close"]
                ]);
            }
            
            // Executing the query
            connection.query(query, [values], (err, rows) => {
                if (err) throw err;
                //console.log(`${symbolname} : All Rows Inserted !`);
                res.send(`${symbolname} : All Rows Inserted !`);
            }); 
        }
    )
});


module.exports = router;

