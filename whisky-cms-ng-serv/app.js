
const express = require('express');
const app = express();
const api = require('./api/v1');
const auth = require('./auth/routes');
const cors = require('cors');
//passport
const passport =require('passport');
const cookieParser =require('cookie-parser');
const session =require('express-session');
const Strategy= require('passport-local').Strategy;
//const { Strategy } = require('passport');
const  User = require ('./auth/models/user');

const mongoose = require('mongoose');
//const bodyParser = require('body-parser');
const connection = mongoose.connection;
app.use(express.json());
app.use(express.urlencoded());
app.use(cors({credentials: true, origin: 'http://localhost:4200'}));
//app.listen(port, () => {console.log(`Example app listening at http://localhost:${port}`)});
const uploadsdir = require('path').join(__dirname, '/uploads');
console.log('upload',uploadsdir);
app.use(express.static(uploadsdir));


app.use(cookieParser());
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: 'my super secret',
	name: 'wisky-cookie'
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user,cb) =>
{cb(null,user);
});
passport.deserializeUser((user,cb)=>{
    cb(null,user);
});

passport.use(new Strategy({
	usernameField: 'username',
	passwordField: 'password'
}, (name, pwd, cb) => {
	User.findOne({ username: name }, (err, user) => {
		if (err) {
			console.error(`could not find ${name} in MongoDB`, err);
		}
		if(user.password !== pwd) {
			console.error(`wrong password for ${name}`);
			cb(null, false);
		} else {
			console.error(`${name} found in MongoDB and authenticated`);
			cb(null, user);
		}
	});
}));
app.use('/api/v1',api);
app.use('/auth', auth);
app.use((req, res) => {
    const err = new Error('404 Not found');
    err.statuts = 404 ;
    res.json(err);   
    });

app.set('port',process.env.port||3000);


mongoose.connect('mongodb://localhost:27017/whiskycms', { useNewUrlParser: true });


connection.on('error',(err)=>{
    console.error(`connection to Mongodb error:${err.massage}`);
});


connection.once('open',()=>{

    console.log('connected to mongodb');

    app.listen(app.get('port'),() => {
        console.log(`express listen on port ${app.get('port')} `);
        });
    
});

//var schema = new mongoose.Schema({ name: String, age: Number });
//var User = mongoose.model('Users', schema, 'Users');


/*use midelwaire
app.use((req,res)=>{
const error = new Error('404 Not Found');
error.status = 404 ;
res.json = error;
});*/

/*const express = require('express');
const app = express();
const api = require('./api/v1/index');


app.set('port',process.env.port||3000);
app.use(cors());
app.use('api/v1/',api);
*/
/*app.listen(app.get('port'),() => {
    console.log(`express listen on port ${app.get('port')} `);
});*/
