
var express = require('express'),
    app= express(),
    http= require("http").Server(app).listen(8081),
    upload = require('express-fileupload');

//const fs = require("fs");

global.fetch = require('node-fetch')
var fs = require('fs');
var bodyParser = require('body-parser');

app.use(upload());
//app.use("/public", express.static(__dirname + "/public"));


app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


console.log('Server started at 8080');
//console.log( http);



app.get('/', function(req,res){
    res.sendFile(__dirname+"/public/index.html");

});




app.post('/', function(req,res){
    var olderfiles = fs.readdirSync('./public//uploads/');
    console.log("request");
    console.log(olderfiles)
    olderfiles.forEach(thisFile =>{
        console.log("request: "+thisFile);
        fs.unlink('./public//uploads/'+thisFile, function(err) {
            if(!err) {
                console.log('file deleted: '+thisFile);
            }
            else
                console.log(err)
        });

    })

    if(req.files){
        var file = req.files.video,
            filename = file.name;
        console.log(file.name);
		
		
		if (Object.keys(req.files).length == 0) {
			return res.status(400).send('No files were uploaded.');
		  }
	
		  file.mv('./public/uploads/' + filename, function (err) {   //require('path').resolve(__dirname, 'uploads/'+file.name)
                if (err) {
                    console.log(err);
                    res.send('error occurs: ' + err);
                } else {
                    
					//res.sendFile(__dirname+"/public/analysis.html?"+filename);
					res.render(__dirname+"/public/analysis.html", {filename:filename});
                }

            })


    }

});

