var http = require("http");
var express = require('express')
const oracledb = require('oracledb')
oracledb.autocommit = true;

var app = express();
var server = http.createServer(app);
var path = require('path');

var bodyParser = require('body-parser');
var config = {
    user: "hr",
    password: "hr",
    connectString: "orcl"
}


app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());


app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/html'));
server = app.listen(4000, () => {
    console.log('server start, port 4000')
})


oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT
oracledb.getConnection(config, (err, conn) =>{
    todoWork(err, conn);
});

app.get('/', function(request, response) {
    response.sendFile(__dirname+'/index.html');
})

app.get('/login', function(request, response) {
    response.sendFile(__dirname+'/html/login.html');
})

app.get('/register', function(request, response) {
    response.sendFile(__dirname+'/html/register.html');
})

app.post("/login", async(req,res)=> {
    const user = new User(req.body);
    const response = await user.login();
    return res.json(response);
});


function todoWork(err, connection) {
    if (err) {
        console.error(err.message);
        return;
    }
    connection.execute("select * from cosmetics", [], function (err, result) {
        if (err) {
            console.error(err.message);
            doRelease(connection);
            return;
        }
        console.log(result.metaData);  //테이블 스키마
        console.log(result.rows);  //데이터
        doRelease(connection);
    });

    
}  

function doRelease(connection) {
    connection.release(function (err) {
        if (err) {
            console.error(err.message);
        }
    });
}
