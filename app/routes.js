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

router.post('/create', mainController.createUser)

//Handled by profileController
router.route('/user/:id')
      .get((req,res)=>{res.send(req.params.id)})
      .put()
      .delete();

router.post('/user/:id/approve');
router.post('/user/:id/homeless');

//Handled by adminController
router.route('/admin/:id')
      .get()
      .post();

router.get('/admin');

router.get('*', mainController.fof);