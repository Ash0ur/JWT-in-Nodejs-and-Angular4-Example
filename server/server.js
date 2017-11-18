var express       = require('express'),
    bodyParser    = require('body-parser'),
    cookieParser  = require('cookie-parser'),    
    jwt           = require('jsonwebtoken'),
    path          = require('path'),
    mongoose      = require('mongoose'),    
    port          = 3200,
    app           = express(),

    User          = require('./models/user');

app.set('views',path.resolve(__dirname,'../client/dist'));
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);
app.use(express.static(path.resolve(__dirname,'../client/dist')));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect('mongodb://Ashour:1234@ds141474.mlab.com:41474/meanapp1',{useMongoClient:true},(err)=>{
    if(err)
        console.log('mongoose.connect() failed');
    connection = mongoose.connection;
    mongoose.Promise = global.Promise;
    mongoose.connection.on('error',(err)=>{
        console.log('error connecting to MongoDB: '+err);
    });
    mongoose.connection.once('open',()=>{
        console.log('connected to mongodb');
    })

});



app.get('/addtheuser',(req,res)=>{
    var user = new User({
        email:'aa@bb.com',
        password:'12345'
    });

    user.save((err,user)=>{
        if(err) 
            console.log(err);
        else{
            console.log('user is added');
            res.json({result:'success',message:'user is added'});
        }
    });
});

app.post('/login',(req,res)=>{
    var email = req.body.email;
    var password = req.body.password;
    //console.log(req.body);
    User.findOne({email:email},(err,user)=>{
       // console.log(user);
        if(err){
            console.log(err);
             res.json({error:err})
        }else if(user == null){
            console.log('user not found');
            res.json({result:'error',message:'Invalid username or password'})
        }else{
            
            var theToken = jwt.sign({email:email},'secret');
            res.cookie('jwt_Token',theToken,{httpOnly:true});
            return res.json({
                result:'success',
                message:'token created',
                token:theToken
            });
        }
    })
});

app.get('/dashboard',function(req,res){
    //console.log(req.cookies.jwt_Token);
        try{   
            var decoded = jwt.verify(req.cookies.jwt_Token,'secret');
            console.log(decoded);
            return res.json({result:'token verified'});
        }catch(err){
            console.log('err: '+err);
            return res.json({result:'Invalid token'});
        }



});


app.get('/*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../client/dist/index.html'));
})

app.listen(port,(err)=>{
    console.log('listening on '+ port);
});


