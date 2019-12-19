const passport = require('passport')
const VKontakteStrategy = require('passport-vkontakte').Strategy;
const User = require('./User')
const ansible = require('./ansible')

passport.use(new VKontakteStrategy({
    clientID:     7246234,
    clientSecret: "H68F3fPblgCeB6OMA7Jc",
    callbackURL:  "https://gridncloud.azurewebsites.net/auth/vkontakte/callback"
  },
  function(accessToken, refreshToken, params, profile, done) {
    User.findOne({ vkontakteId: profile.id }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        let user = User.create({vkontakteId : profile.id, text: "", length: 0})
        ansible.createRG(profile.id)
      } 
      return done(null, user);
    })
  }
));

passport.serializeUser(function(user, done) {
  console.log('Сериализация: ', user)
  done(null, user.vkontakteId)
})

passport.deserializeUser(async function(id, done) {
  try{
    const user = await User.findOne({ vkontakteId: id})
    if(!user) {
      return done(null, false)
    }
    else{
      return done(null, user)
    }
  }
  catch(err){
    return done(err)
  }
});

module.exports = passport