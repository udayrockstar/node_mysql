var express   =    require("express");
var mysql     =    require('mysql');
var app       =    express();
app.set('view engine', 'jade');

var path = require('path');

var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'user',
    debug    :  false
});

function handle_database(req,res) {
    
    pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   

        console.log('connected as id ' + connection.threadId);
        
        connection.query("select * from test",function(err,rows){
            connection.release();
            if(!err) {
                //res.json(rows);
            	//console.log(rows);
                //res.render('test', {rows:rows});
            	//return rows;
            }           
        });

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
  });
}

/*app.get("/",function(req,res){-
        handle_database(req,res);
//res.render('test',{title:'Hosamani',message:'Here is the Message!'});
	
});*/

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/test.html'),{});
});

app.get('/test', function(req, res) {
	var val = {title:'Hosamani',message:'Here is the Message!'};
	 pool.getConnection(function(err,connection){
	        if (err) {
	          connection.release();
	          res.json({"code" : 100, "status" : "Error in connection database"});
	          return;
	        }   

	        console.log('connected as id ' + connection.threadId);
	        
	        connection.query("select * from test",function(err,rows){
	            connection.release();
	            if(!err) {
	            	//res.send(rows);
	            	res.render("test",{rows:rows});
	            }           
	        });
	
	 });
});


app.post('/save',function(req, res){
	console.log(req);	
});

app.get('/about', function(req, res) {
	//var val = {title:'Hosamani',message:'Here is the Message!'};
   //return val;
	res.send("Inside node right now");
});


app.listen(3000);