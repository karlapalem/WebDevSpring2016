module.exports = function(app, auth, userModel, passport, localStrategy, GoogleStrategy) {
  // A request is sent from main server.js
  app.post("/api/project/user", auth, createUser);
  // Using local strategy
  app.get("/api/project/user/:id", auth, findUserById);
  app.put("/api/project/user/:id", auth, updateUser);

  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
  
  
  function createUser(req, res) {
    userModel.createUser(req.body).then(function(createdUser) {
      res.json(createdUser);
    });
  }

  function updateUser(req, res) {
    var id = req.params.id;
    var newUserObj = req.body;
    userModel.updateUser(id, newUserObj).then(function(createdUser) {
      res.json(createdUser);
    });
  }

  function findUserById(req, res) {
    var id = req.params.id;
    userModel.findUserById(id).then(function(createdUser) {
      res.json(createUser);
    });
  }

  // SETTING STRATEGY
  passport.use(new GoogleStrategy({     
      clientID: '509374382559-r7hte2in8f15kbthetk1ef4ods7aqmht.apps.googleusercontent.com',
      clientSecret: 'owDS7d9ihJPqFvzoRpEohAjv', 
      callbackURL: 'http://localhost:3000/auth/google/callback'
      //callbackURL: 'http://cs5610-cguna.rhcloud.com/auth/google/callback'
    }, 
    function (token, refreshToken, profile, done) {
      process.nextTick(function () {
        userModel.googleLogin(profile).then(function (user) {
            return done(null, user);
        });
      });
    }
  ));

  // ROUTE INFORMATION FOR GOOGLE LOGIN
  // Add scope to get information related to profile and email
  app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

  app
  .get('/auth/google/callback',
    passport
    .authenticate('google', 
    { failureRedirect: '/project/client/#/login' 
    }),
    function(req, res) {
      res.redirect('/project/client/#/profile');
    });
};