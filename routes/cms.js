var express     = require('express');
var router      = express.Router();
var config      = require(__dirname + '/../etc/config.json');
var Database    = require(__dirname + '/../lib/database');

//======================================================================//
//======================== LOGIN FUNCTIONS =============================//
//======================================================================//

router.get('/login', function(req, res, next) {
    return res.render('login.html', {});
});

router.get('/authenticate', function(req, res) {
    return res.redirect('/?t=' + Date.now());
});

router.post('/authenticate', function(req, res) {
    if( req.body.username === undefined || req.body.password === undefined){
        return res.redirect('/cms/login?reason=failed&t=' + Date.now());
    }
    else{
        var db = new Database();

        db.connect(config.settings.db, function(err){
            if(err) return next(err);
        });

        var sql = [
            "SELECT name, email FROM coffee.users WHERE ",
            "name = $1 AND password = crypt($2,password)"
        ].join(" ");

        db.selectQuery(sql, [req.body.username, req.body.password], function(err, result){
            if(err) return next(err);

            console.log(result);
            if(result.rowCount === 1) {
                req.session.name = result.rows[0].name;
                req.session.email = result.rows[0].email;
                return res.redirect( '/cms/admin?t=' + Date.now());
            }
            else{
                return res.redirect('/cms/login?reason=failed&t=' + Date.now());
            }
        });
    }
});

router.get('/logout', function(req, res, next) {
    delete req.session.name;
    delete req.session.email;
    return res.redirect('/?t=' + Date.now());
});

router.get('/resetpassword', function(req, res, next) {
    return res.type('txt').send('Not implemented yet.');
});



//======================================================================//
//============================ CMS Pages ===============================//
//======================================================================//

router.get('/admin', function(req, res, next) {
    if( req.session.name === undefined ){
        return res.redirect('/cms/login?t=' + Date.now());
    }
    return res.render('admin.html', {});
});

router.get('/shopform', function(req, res, next) {
    var db = new Database();

    db.connect(config.settings.db, function(err){
        if(err) return next(err);
    });

    if( req.session.name === undefined ){
        return res.redirect('/cms/login?t=' + Date.now());
    }

    if(req.query.id !== undefined){
        if(isNaN(req.query.id)) {
            return next( new Error("Invalid shop id.") );
        }

        var sql = "SELECT * FROM coffee.shops where shop_id = $1";
        db.selectQuery(sql, [req.query.id], function(err, result){
            if(err) return next(err);

            if(result.rows.length === 0) {
                return next( new Error("Invalid shop id.") );
            }
            return res.render('shop-form.html', {data:result.rows[0]} );
        });
    }
    else{
        return res.render('shop-form.html', {});
    }
});

router.get('/shops', function(req, res, next) {
    var db = new Database();

    db.connect(config.settings.db, function(err){
        if(err) return next(err);
    });

    if( req.session.name === undefined ){
        return res.redirect('/cms/login?t=' + Date.now());
    }

    var sql = "SELECT shop_id, name, address, phone, email, last_update from coffee.shops";
    db.selectQuery(sql, [], function(err, result){
        if(err) return next(err);

        return res.render('shops.html', { "data": result.rows  });
    });

});


//======================================================================//
//============================  CMS API  ===============================//
//======================================================================//

router.get('/deleteshop', function(req, res, next) {
    var db = new Database();

    db.connect(config.settings.db, function(err){
        if(err) return next(err);
    });

    if( req.session.name === undefined ){
        return next(new Error("Unauthenticated access"));
    }

    if(req.query.id && !isNaN(req.query.id)){
        var sql = "DELETE FROM coffee.shops where shop_id = $1";
        db.commitQuery(sql, [req.query.id], function(err, result){
            if(err) return next(err);

            return res.redirect('/cms/shops?t=' + Date.now());
        });
    }
    else{
        return next(new Error("Invalid shop id."));
    }
});

router.post('/shop_edit', function(req, res, next) {
    var db = new Database();

    db.connect(config.settings.db, function(err){
        if(err) {
            return next(err);
        }
    });

    if( req.session.name === undefined ){
        return next(new Error("Unauthenticated access"));
    }

    if(req.body.amenities === undefined) {
        req.body.amenities = [];
    }
    var sql = [
        "INSERT INTO coffee.shops(name, address, about, owner, ",
        "href, phone, email, xcoord, ycoord, icon_path, internal_path, external_path, opening_hours, facebook, ",
        "twitter, instagram, pinterest, coffee1, coffee2, coffee3, ",
        "coffee4, grinder1, grinder2, machine1, machine2, seating, ",
        "dedicated, wifi, service, loyality, child_friendly, ",
        "work_friendly, hot_food, lunch, breakfast, pastry, credit_card, location)",
        "VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, ",
        "$14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26,",
        "$27, $28, $29, $30, $31, $32, $33, $34, $39, $40, $35, ST_SetSRID(ST_MakePoint($36, $37),4326) ) "
    ].join(" ");

    var data = [
        req.body.name 		|| '',
        req.body.address 	|| '',
        req.body.about 		|| '',
        req.body.owner 		|| '',
        req.body.href 		|| '',
        req.body.phone 		|| '',
        req.body.email 		|| '',
        req.body.xcoord 	|| 0,
        req.body.ycoord  	|| 0,
        req.body.icon_path  || '/icons/unknown.png',
        req.body.internal_path  || '/images/internal/unknown.png',
        req.body.external_path  || '/images/external/unknown.png',
        req.body.opening_hours	|| '',
        req.body.facebook 	|| '',
        req.body.twitter 	|| '',
        req.body.instagram 	|| '',
        req.body.pinterest 	|| '',
        req.body.coffee1 	|| '',
        req.body.coffee2 	|| '',
        req.body.coffee3 	|| '',
        req.body.coffee4  	|| '',
        req.body.grinder1 	|| '',
        req.body.grinder2 	|| '',
        req.body.machine1 	|| '',
        req.body.machine2 	|| '',
        req.body.amenities.indexOf('seating') > -1          || false,
        req.body.amenities.indexOf('dedicated') > -1        || false,
        req.body.amenities.indexOf('wifi') > -1             || false,
        req.body.amenities.indexOf('service') > -1          || false,
        req.body.amenities.indexOf('loyality') > -1         || false,
        req.body.amenities.indexOf('child_friendly') > -1   || false,
        req.body.amenities.indexOf('work_friendly') > -1    || false,
        req.body.amenities.indexOf('hot_food') > -1         || false,
        req.body.amenities.indexOf('lunch') > -1            || false,
        req.body.amenities.indexOf('breakfast') > -1        || false,
        req.body.amenities.indexOf('pastry') > -1          || false,
        req.body.amenities.indexOf('credit_card') > -1      || false,
        req.body.xcoord 	|| 0,
        req.body.ycoord  	|| 0
    ];

    if(req.body.shop_id && !isNaN(req.body.shop_id)){
        sql = [
            "UPDATE coffee.shops SET name = $1, ",
            "address = $2,",
            "about = $3,",
            "owner = $4,",
            "href = $5,",
            "phone = $6,",
            "email = $7,",
            "xcoord = $8,",
            "ycoord = $9,",
            "icon_path = $10,",
            "internal_path = $39,",
            "external_path = $40,",
            "opening_hours	= $11,",
            "facebook = $12,",
            "twitter = $13,",
            "instagram = $14,",
            "pinterest = $15,",
            "coffee1 = $16,",
            "coffee2 = $17,",
            "coffee3 = $18,",
            "coffee4 = $19,",
            "grinder1 = $20,",
            "grinder2 = $21,",
            "machine1 = $22,",
            "machine2 = $23,",
            "seating = $24,",
            "dedicated = $25,",
            "wifi = $26,",
            "service = $27,",
            "loyality = $28,",
            "child_friendly = $29,",
            "work_friendly = $30,",
            "hot_food = $31,",
            "lunch = $32,",
            "breakfast = $33,",
            "pastry = $34,",
            "credit_card = $35, ",
            "location = ST_SetSRID(ST_MakePoint($36, $37),4326)",
            "WHERE shop_id = $38"
        ].join(" ");

        data.push(req.body.shop_id);
    }

    db.commitQuery(sql, data, function(err, result){
        if(err) return next(err);

        return res.redirect('/cms/shops?t=' + Date.now());
    });
});

module.exports = router;
