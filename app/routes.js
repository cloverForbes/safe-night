const express = require('express'),
      router  = express.Router(),
      apiController     = require('./controllers/api.controller'    ),
      mainController    = require('./controllers/main.controller'   ),
      profileController = require('./controllers/profile.controller'),
      adminController   = require('./controllers/admin.controller'  );

module.exports = router;

//Handled by apiController
router.get('/api/users', apiController.getAllUsers);
router.post('/api/user/create', apiController.createUser);

router.post('/api/login', apiController.verifyLogin);

router.route('/api/user/:id')
      .get(apiController.readUser)
      .put(apiController.updateUser)
      .delete(apiController.removeUser);



//Handled by mainController
router.get('/', mainController.showHome);
router.get('/about', mainController.showAbout);
router.get('/contact', mainController.showContact);


router.route('/login')
      .get(mainController.showLogin)
      .post(mainController.verifyLogin);

router.post('/create', mainController.createUser);

//Handled by profileController
router.route('/user/:id')
      .get(profileController.getProfile)
      .put()
      .delete();

router.put('/user/approve/:id/:seeker/:days' , profileController.providerDecision);

router.get('/user/city/:city', profileController.getUsersByCity);
router.put('/user/homeless/:id', profileController.isHomeless);

//Handled by adminController
router.get('/admin', adminController.getAdmin);
router.get('/admin/:city', adminController.getCityAdmin);

//404 page
router.get('*', mainController.fof);
