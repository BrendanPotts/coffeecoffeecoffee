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
        return res.redirect( '/');
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


router.get('/admin', function(req, res, next) {
    if( req.session.name === undefined ){
        return res.redirect('/cms/login');
    }
    return res.render('admin.html', {});
});

module.exports = router;
