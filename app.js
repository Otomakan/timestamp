var express= require('express');
var app = express();
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

app.get(/[1-9]/, function (req, res){
    var result = {};
    var input = req.originalUrl.split('')
    input.shift()
    input = input.join('');
    var date = new Date(input*1000);
    var year=date.getFullYear().toString();
    console.log(date.getFullYear());
    result['unix']=input;
    result['natural']= date.getDate()+ ' '+monthNames[date.getMonth()]+ ' ' + date.getFullYear();
    
    res.send(result);
})

// app.get(/)

app.listen(8080,function(){
    console.log('example app listening on port 8080');
})