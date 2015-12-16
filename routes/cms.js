var express     = require('express');
var router      = express.Router();
var config      = require(__dirname + '/../etc/config.json');
var Database    = require(__dirname + '/../lib/database');
var db          = new Database();

db.connect(config.settings.db, function(err){
    if(err)
    {
        throw err;
    }
});

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
    var sql = "SELECT name, address, phone, email, published, last_update from coffee.shops";
    db.selectQuery(sql, [], function(err, result){
        if(err) return next(err);

        return res.json({ "data": result.rows  });
    });
});


router.get('/get_user_list.json', function(req, res, next) {
    if( req.session.name === undefined ){
        return next(new Error("Unauthenticated access"));
    }

    var sql = "SELECT name, email, enabled, is_admin, shop_id from coffee.users";
    db.selectQuery(sql, [], function(err, result){
        if(err) return next(err);

        return res.json({ "data": result.rows  });
    });
});

router.post('/shop_edit', function(req, res, next) {
    if( req.session.name === undefined ){
        return next(new Error("Unauthenticated access"));
    }
    console.log(req.body);

    // { name: 'Nigel Hanlon',
    //   address: '21 Ardleigh Park',
    //   about: 'A brief introduction or blurp.',
    //   owner: 'me',
    //   href: '',
    //   phone: '+353871394045',
    //   email: 'nigel.f.hanlon@gmail.com',
    //   facebook: '',
    //   twitter: '',
    //   instagram: '',
    //   pinterest: '',
    //   coffee1: '',
    //   coffee2: '',
    //   coffee3: '',
    //   coffee4: '',
    //   grinder1: '',
    //   grinder2: '',
    //   machine1: '',
    //   machine2: '',
    //   amenities: [ 'seating', 'wifi', 'child_friendly', 'lunch', 'credit_card' ] }
    //
    
    return res.redirect('/cms/shops');
});

module.exports = router;
