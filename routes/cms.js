var express     = require('express');
var router      = express.Router();
var config      = require(__dirname + '/../etc/config.json');


//======================================================================//
//======================== LOGIN FUNCTIONS =============================//
//======================================================================//

router.get('/login', function(req, res, next) {
    return res.render('login.html', {});
});

router.get('/authenticate', function(req, res) {
    return res.redirect('/');
});

router.post('/authenticate', function(req, res) {
    if( req.body.username === undefined || req.body.password === undefined){
        return res.redirect('/cms/login?reason=failed');
    }
    else{

        /***************************
            Our Select Query goes here
            to auth users.
        ****************************/
        req.session.name = 'devuser';
        req.session.email = 'devuser@home.com';
        req.session.shopID = '1';
        return res.redirect( '/cms/admin');
    }
});

router.get('/logout', function(req, res, next) {
    delete req.session.name;
    delete req.session.email;
    delete req.session.shopID;
    return res.redirect('/');
});

router.get('/resetpassword', function(req, res, next) {
    return res.type('txt').send('Not implemented yet.');
});



//======================================================================//
//============================ CMS Pages ===============================//
//======================================================================//

router.get('/admin', function(req, res, next) {
    if( req.session.name === undefined ){
        return res.redirect('/cms/login');
    }
    return res.render('admin.html', {});
});

router.get('/users', function(req, res, next) {
    if( req.session.name === undefined ){
        return res.redirect('/cms/login');
    }
    return res.render('users.html', {});
});

router.get('/userform', function(req, res, next) {
    if( req.session.name === undefined ){
        return res.redirect('/cms/login');
    }
    return res.render('user-form.html', {});
});

router.get('/shopform', function(req, res, next) {
    if( req.session.name === undefined ){
        return res.redirect('/cms/login');
    }
    return res.render('shop-form.html', {});
});

router.get('/shops', function(req, res, next) {
    if( req.session.name === undefined ){
        return res.redirect('/cms/login');
    }
    return res.render('shops.html', {});
});


//======================================================================//
//============================  CMS API  ===============================//
//======================================================================//


router.get('/get_shop_list.json', function(req, res, next) {
    if( req.session.name === undefined ){
        return next(new Error("Unauthenticated access"));
    }
    var data = {
      "data": [
            [
              "Coffee Inc",
              "21 Main Street",
              "011234567",
              "coffee@coffee.com",
              "Yes",
              new Date()
          ],
          [
            "Coffee 2",
            "10 Top Street",
            "011234567",
            "coffee@home.com",
            "Yes",
            new Date()
        ]
      ]
    };
    return res.json(data);
});


router.get('/get_user_list.json', function(req, res, next) {
    if( req.session.name === undefined ){
        return next(new Error("Unauthenticated access"));
    }
    var data = {
      "data": [
            [
              "Billy Bob",
              "bob@gmail.com",
              "Yes",
              "No",
              "Coffee Inc",
          ],
          [
            "Cuppa Joe",
            "joe@gmail.com",
            "Yes",
            "Yes",
            "Coffee 2",
        ]
      ]
    };
    return res.json(data);
});

module.exports = router;
