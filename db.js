var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'fliptest_flip',
  password : 'flip',
  database : 'tmp'
});

connection.connect();

connection.query('SELECT * from test', function(err, rows, fields) {
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.');
});

connection.end();