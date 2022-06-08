var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true 
}))

mongoose.connect('mongodb://localost:27017/cks-db',{
    useNewUrlParser: true, 
    useUnifiedTopology : true
});

var db  = mongoose.connection;

db.on('error',()=>console.log("Error in connecting to Database"));
db.open('open',()=>console.log("Connected to Database"))

app.post("/contact",(req,res)=>{
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var about = req.body.about;
    var subject = req.body.subject;

    var data = {
        "firstname" : firstname,
        "lastname" : lastname,
        "about" : about,
        "subject" : subject
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    }); 

    return res.redirect('contact.html')
})

app.get("/", (req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('contact.html')
}).listen(3000);

console.log("listening to PORT 3000");