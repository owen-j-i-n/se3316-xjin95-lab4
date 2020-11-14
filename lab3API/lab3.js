

const express = require ('express')
const app = express()
app.use(express.json())
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('./src'))
const morgan = require('morgan')
app.use(morgan('short'))

//cors header
// CORS HEADERS MIDDLEWARE
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
});
  
  app.get('/', function(req, res, next) {
    // Handle the get for this route
  });
  
  app.post('/', function(req, res, next) {
   // Handle the post for this route
  });


app.get('/api/courses', (req, res) =>{
    var json = require('./Lab3-timetable-data.json')
    res.json(json)
})//practice round to show all the courses


function intersect(a, b) {
    var setA = new Set(a);
    var setB = new Set(b);
    var intersection = new Set([...setA].filter(x => setB.has(x)));
    return Array.from(intersection);
  }
  
  app.post("/course_check", (req,res)=>{
    var sub = req.body.catalog_nbr
    var code = req.body.subject
    var json = require('./Lab3-timetable-data.json')
    console.log(code, sub)

        var subcourse = []
        for (i=0; i<json.length;i++){
            if(json[i].subject.toString().toLowerCase()===(sub.toString().toLowerCase())){
                subcourse.push(json[i])
            }
        }
        
        var final = [0]
        for (i=0; i<subcourse.length;i++){
            if(subcourse[i].catalog_nbr.toString().toLowerCase()===((code.toString().toLowerCase()))){
                final = [];
                final.push(subcourse[i])}
        }
        
        var finalResult = 1
        
        if(final != [0]){
            finalResult= [{
                catalog_nbr: final[0].catalog_nbr,
                subject: final[0].subject
        }];
        }
         
                
        res.send(finalResult)
        console.log(finalResult)
})


app.post("/course_search", (req,res)=>{
    var code = req.body.catalog_nbr
    var sub = req.body.subject
    var option = req.body.SSR
    var json = require('./Lab3-timetable-data.json')
    console.log(code, sub, option)

    //get three arrays that contains each input filtered
        var subcourse = []
        for (i=0; i<json.length;i++){
            if(json[i].subject.toString().toLowerCase()===(sub.toString().toLowerCase())){
                subcourse.push(json[i])
            }
        }
    
            var ssrcourse = []
        for (i=0; i<json.length;i++){
            if(json[i].course_info[0].ssr_component.toString().toLowerCase()===(option.toString().toLowerCase())){
                ssrcourse.push(json[i])}
        }
        
            var catacourse = []
            for (i=0; i<json.length;i++){
                if(json[i].catalog_nbr.toString().toLowerCase().includes((code.toString().toLowerCase()))){
                    catacourse.push(json[i])}
            }
        
        var final;
         
        if(sub&&!option&&!code){final= (subcourse)}
        else if(!sub&&option&&!code){final=(ssrcourse)}
        else if(!sub&&!option&&code){final=(catacourse)}
        else if(sub&&!option&&code){final=(intersect(subcourse,catacourse))}
        else if(sub&&option&&!code){final=(intersect(subcourse,ssrcourse))}
        else if(!sub&&option&&code){final=(intersect(catacourse,ssrcourse))}
        else if(sub&&option&&code){
            var a = intersect(subcourse,ssrcourse)
            final=(intersect(a,catacourse))
        }
        var finalList = [];
        for(i=0; i<final.length; i++){
            finalList[i]={
                catalog_nbr: final[i].catalog_nbr,
                subject: final[i].subject,
                ssr_component: final[i].course_info[0].ssr_component
            }
        }
        res.send(finalList)
})

app.listen(3000, () => {
console.log('Listening on 3000...')    
})
