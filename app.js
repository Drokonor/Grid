const express = require('express')
const passport = require('./passport')
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const ansible = require('./ansible')
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

const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  }
  else {
    return res.redirect('/login')
  }
}

app.get('/',auth, async function(req,res){
  res.render('index', {user : await User.findOne({vkontakteId : req.user.vkontakteId})})
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

app.get('/logout',auth, (req, res) => {
    req.logOut();
    res.redirect('/login');
});

app.post('/button',auth, async (req,res)=>{
  await User.findOneAndUpdate({vkontakteId: req.user.vkontakteId},{text : req.body.text})
  res.redirect('/')
})

app.listen(8080, function(){
    console.log('Сервер запущен на порте 8080')
})