const { Router } = require('express')
const { dbObjectAsPojo } = require('oracledb')
const oracledb = require('oracledb')

Router.post('/login',(req,res,next)=>{
    param=[req.body.id,req.body.pw]
    db.query('SELECT * FROM CUSTOMER WHERE customer_id= ?',param[0],(err,row)=>{
        if(err)console.log(err)
        if(row.length>0){
            //id가 존재합니다
        }else{
            console.log('id가 존재하지 않습니다.')
        }
    })
    res.end()
})


Router.post('/register',(req,res,next)=>{
    console.log(req.body)
    res.end()
})