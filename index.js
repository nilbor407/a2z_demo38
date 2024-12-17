var express = require("express");
var bodyparser = require("body-parser");
var mysql = require("mysql");
require("dotenv").config();

var app = express();
app.use(bodyparser.urlencoded({extended:true}));

var conn = mysql.createConnection({
    "host":"bzukt9btfxivrvhgpe9e-mysql.services.clever-cloud.com",
    "user":"ul0w0nbjm8u8owbp",
    "password":"mdClr6zw93uGe9wUXhg0",
    "database":"bzukt9btfxivrvhgpe9e"
});

app.get("/",function(req,res){
    res.render("mobile_form.ejs");
});

app.post("/save_mobile",function(req,res)
{
    var d = req.body;
    var sql = `INSERT INTO mobile (mobile_name, mobile_price, mobile_qty) VALUES ('${d.mobile_name}','${d.mobile_price}','${d.mobile_qty}')`;
    conn.query(sql);
    // res.send(req.body);
    res.redirect("/");
});

app.get("/mobile_list",function(req,res)
{
    var sql = `SELECT * FROM mobile`;
    conn.query(sql,function(err,data){
        var obj = {"mobiles":data};
        res.render("mobile_list.ejs",obj);
    })
});


app.listen(process.env.PORT || 1000);



// CREATE TABLE mobile(mobile_id INT PRIMARY KEY AUTO_INCREMENT, mobile_name VARCHAR(100), mobile_price INT, mobile_qty INT)