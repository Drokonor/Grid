const express = require('express')
const passport = require('./passport')
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const app = express()

app.set("view engine", "ejs")


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: 'gfsdgdsfgdsfewreiigsdhl;jweqp[igiohsdja',
    store: new FileStore(),
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: false,
  })
);


app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(req,res){
    res.render('index')
})

app.get('/login', function(req,res){
    res.render('login')
})

app.get('/auth/vkontakte',
  passport.authenticate('vkontakte'),
  function(req, res){
});

app.get('/auth/vkontakte/callback',
  passport.authenticate('vkontakte', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
});

app.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
});

app.post('/create', function(req,res) {
    console.log('created')
    res.redirect('/')
})

app.post('/remove', function(req,res) {
    console.log('remove')
    res.redirect('/')
})


app.listen(8080, function(){
    console.log('Сервер запущен на порте 8080')
})