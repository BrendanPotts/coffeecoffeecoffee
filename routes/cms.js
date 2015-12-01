var express     = require('express');
var router      = express.Router();
var config      = require(__dirname + '/../etc/config.json');


router.get('/login', function(req, res, next) {
    return res.render('login.html', {});
});

router.post('/authenticate', function(req, res) {
    console.log(req);
    if( req.body.username === undefined || req.body.password === undefined){
        return res.redirect('/login?reason=failed');
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

router.get('/admin', function(req, res, next) {
    if( req.session.name === undefined ){
        return res.redirect('/login');
    }
    return res.render('admin.html', {});
});

module.exports = router;
