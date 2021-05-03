const express = require("express");
const app = express();
const port = 3001; // <- 3000에서 다른 숫자로 변경 3306
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql"); // << 새로 추가된 부분

var connection = mysql.createConnection({
    /// 새로 추가된 부분
    host: "localhost",
    user: "root", // mysql에 아이디를 넣는다.
    password: "mysql1234", // mysql의 비밀번호를 넣는다.
    database: "ku_db", //위에서 만든 데이터베이스의 이름을 넣는다.
});

connection.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/text", (req, res) => {
    const user_id = req.body.inText;
    console.log(user_id);
    //////추가 내용/////
    connection.query("INSERT INTO new_table (user_id) values(?)", [user_id]),
    function (err, rows, fields) {
        if (err) {
            console.log("DB저장 실패");
        }else{
            console.log("DB저장 성공");
        }
    };
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});