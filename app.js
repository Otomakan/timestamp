var express= require('express');
var app = express();
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

var monthNamesShort = ['Jan', 'Feb', "Mar", "Apr","May","June", "July", "Aug", "Sept","Oct","Nov", "Dec"];

app.get(/[1-9]{5}[^A-Za-z]/, function (req, res){
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

app.get(/^[/](([0-2][0-9])|[1-9])([%]20|[-])(January|Jan|Feb|Mar|Apr|Aug|Sept|Pct|Nov|Dec|February|March|April|May|June|July|August|September|October|November|December)([%]20|[-])[0-9]{4}$/, 
    function(req, res){
    console.log('natural Date');
    var result = {};
    var day;
    var month;
    var year;

    var input = req.originalUrl.split('');
    input.shift();

    if(/[0-9]/.test(input[1])){
        day=parseInt(input[0].concat(input[1])); 
    }
    else{
        day=parseInt(input[0]);
    }
    month= input.slice(',').join('').match(/[A-Z]|[a-z]/g).join('');
    year=parseInt(input.slice(',').join('').match(/[0-9]{4}(?=$)/).join(''));


   

    result['natural']= day+' '+month+' '+year;
    result['unix']= new Date(year, monthNum(month), day).getTime();
   

     res.send(result);

});


app.get('/', function(req, res){
    res.send( 'Hello world. this is the time Stamp appplication I developped. to use it simply add a unix date in the path or a normal date and we will translate it for you into a JSON object')
})

app.get('*', function(req, res){
    res.send({natural:null, unix:null});
})

app.listen(process.env.PORT || 5000,function(){
    console.log('example app listening on port 5000');
})

function monthNum(input){
    for(p in monthNames){
        if(monthNames[p]==input){
            return p;
        }
    }
     for(p in monthNamesShort){
        if(monthNamesShort[p]==input){
            return p;
        }
}
}