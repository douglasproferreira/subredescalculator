const express = require('express');

const app = express();

app.use(express.json());

app.use(express.static(__dirname + '/public'));

//console.log(__dirname)

app.get('/', function(req, res){
    res.sendfile('./home.html');
  });
  
var porta = process.env.PORT || 5000;
app.listen(porta);
