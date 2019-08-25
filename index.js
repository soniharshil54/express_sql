const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'phpmyadmin',
    password: 'soni',
    database: 'EmployeeDB',
    multipleStatements: true
});

conn.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});




app.get('/',(req, res) => {
  let sql = "SELECT * FROM Employee";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.json({
      results: results
    });
  });
});
 
//route for insert data
app.post('/save',(req, res) => {
  let data = {Name: req.body.Name, EmpCode: req.body.EmpCode,Salary: req.body.Salary};
  let sql = "INSERT INTO Employee SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.json({
      results: results
    });
  });
});
 
//route for update data
app.put('/update',(req, res) => {
  let sql = "UPDATE Employee SET Name='"+req.body.Name+"', EmpCode='"+req.body.EmpCode+"' , Salary='"+req.body.Salary+"' WHERE EmpID="+req.body.EmpID;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});
 
//route for delete data
app.post('/delete',(req, res) => {
  let sql = "DELETE FROM Employee WHERE product_id="+req.body.product_id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/');
  });
});
 
//server listening
app.listen(5000, () => {
  console.log('Server is running at port 5000');
});
