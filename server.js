const express     = require('express');
const bodyParser  = require('body-parser');
const bcrypt      = require('bcrypt-nodejs');
const cors        = require('cors');
const knex        = require('knex');

//controllers
const register    = require('./controllers/register');
const signin      = require('./controllers/signin');
const profile     = require('./controllers/profile');
const image       = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host: 'host',
    user: 'db_user',
    password: 'db_password',
    database: 'db_database'
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('database');
});

app.post('/signin', signin.handleSignin(db, bcrypt) );
app.post('/register', register.handleRegister(db, bcrypt) );
app.get('/profile/:id', profile.handleProfile(db) );
app.put('/image', image.handleImage(db) );
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });

app.listen(process.env.PORT || 3000, ()=>{
  console.log(`app is running ${process.env.PORT}`);
});