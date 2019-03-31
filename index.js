
var express = require('express'),
    app= express(),
    http= require("http").Server(app).listen(process.env.PORT || 8080), //.listen(8081),
    upload = require('express-fileupload');

//const fs = require("fs");
global.fetch = require('node-fetch')
var fs = require('fs');
var bodyParser = require('body-parser');


//var cors = require('cors')

/*var corsOptions = {
    origin: 'http://localhost:8080'
};
var issuesoption = {
    origin: true,
    methods: ['PUT'],
    credentials: true,
};
app.use(cors(corsOptions))

*/

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', false);
    next();
});

//app.use(cors());
//app.use(cors({ origin: true }));


app.use(upload());
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

app.get('/', function(req,res,next ){
    res.sendFile(__dirname+"/public/index.html");

});




app.post('/', function(req,res,next){
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

    //if(req.files){
        var file = req.files.video;
        var videoUrl = req.body.videoUrl;
        if (videoUrl!=''){
            res.render(__dirname + "/public/analysis.html", {filename: videoUrl, source:'url'});

        }
        else if (file)
        {

            var filename = file.name;
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
                    res.render(__dirname + "/public/analysis.html", {filename: filename, source:'uploaded'});
                }

            })
        }


    //}

});

