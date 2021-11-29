var http = require("http");
var express = require('express')
const oracledb = require('oracledb')
oracledb.autocommit = true;

var app = express();
var server = http.createServer(app);
var path = require('path');

app.use(express.static(__dirname+'/public'));

server = app.listen(3000, () => {
    console.log('server start, port 3000')
})


oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

app.get('/', function(request, response) {
    response.sendFile(__dirname+'/index.html');
})

async function getSelect(request, response) {
    let connection
    try {
        connection = await oracledb.getConnection({
            user          : "hr",
            password      : "hr",
            connectString : "orcl"
        })

        const result = await connection.execute(
            `SELECT * 
            FROM COSMETICS`,
        )

        console.log(result)
        response.send(result.rows)
    } catch (error) {
        console.log(error)
    } finally {
        if (connection) {
            try {
                await connection.close()
            } catch (error) {
                console.log(error)
            }
        }
    }
}