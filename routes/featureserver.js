var express     = require('express');
var router      = express.Router();
var config      = require(__dirname + '/../etc/config.json');
var Database    = require(__dirname + '/../lib/database');

//======================================================================//
//======================= Feature Server API ===========================//
//======================================================================//

function FeatureCollection(layer) {
    this.type = 'FeatureCollection';
    this.features = [];
}

function Feature() {
    this.type = 'Feature';
    this.geometry = {};
    this.properties = {};
}

var MAX_RESULTS = 20; // Do not return more than 20 shops for distance queries.


/*
    Get all Coffee shops from the database.
*/
router.get('/all_shops.geojson', function(req, res, next) {
    var db = new Database();

    db.connect(config.settings.db, function(err){
        if(err) {
            return next(err);
        }
    });

    var sql = [
        "SELECT shop_id, name, about, href, owner, address, phone, email,",
        "facebook, twitter, instagram, pinterest,icon_path,",
        "ST_AsGeoJSON(location,4)::json as location,",
        "opening_hours, coffee1, coffee2, coffee3, coffee4,",
        "grinder1, grinder2, machine1, machine2, seating,",
        "dedicated, wifi, service, loyality, child_friendly,",
        "work_friendly, hot_food, lunch, breakfast, kitchen,",
        "credit_card, last_update FROM coffee.shops"
    ].join(" ");

    db.selectQuery(sql, [], function(err, result){
        if(err) return next(err);

        var featureCollection = new FeatureCollection();
        for(var i=0; i<result.rows.length; i++) {
          var feature = new Feature();
          feature.geometry = result.rows[i].location;
          feature.properties = result.rows[i];
          delete feature.properties.location;
          featureCollection.features.push(feature);
        }

        return res.json(featureCollection);
    });
});


/*
    Get all Coffee shops from the database closest to a given point.
*/
router.get('/closest_to_point.geojson', function(req, res, next) {
    var db = new Database();

    db.connect(config.settings.db, function(err){
        if(err) {
            return next(err);
        }
    });

    var sql = [
        "SELECT DISTINCT(shop_id), name, about, href, owner, address, phone, email,",
        "facebook, twitter, instagram, pinterest,icon_path,",
        "ST_AsGeoJSON(location,4) as json_location,",
        "opening_hours, coffee1, coffee2, coffee3, coffee4,",
        "grinder1, grinder2, machine1, machine2, seating,",
        "dedicated, wifi, service, loyality, child_friendly,",
        "work_friendly, hot_food, lunch, breakfast, kitchen,",
        "credit_card, last_update, ",
        "st_distance(st_setsrid(st_makepoint($1,$2),4326),location) as distance",
        "FROM coffee.shops ORDER BY distance, shop_id LIMIT $3"
    ].join(" ");

    console.log(sql);
    if(req.query.x !== undefined || req.query.y !== undefined){
        if(isNaN(req.query.x) || isNaN(req.query.y)) {
            return next( new Error("Invalid coordinates.") );
        }
    }

    db.selectQuery(sql, [req.query.x, req.query.y, MAX_RESULTS], function(err, result){
        if(err) return next(err);

        var featureCollection = new FeatureCollection();
        for(var i=0; i<result.rows.length; i++) {
          var feature = new Feature();
          feature.geometry = JSON.parse(result.rows[i].json_location);
          feature.properties = result.rows[i];
          delete feature.properties.json_location;
          featureCollection.features.push(feature);
        }

        return res.json(featureCollection);
    });
});


/*
    Get all Coffee shops from the database closest to a given
    point WHERE wifi = true
*/
router.get('/closest_to_point_with_wifi.geojson', function(req, res, next) {
    var db = new Database();

    db.connect(config.settings.db, function(err){
        if(err) {
            return next(err);
        }
    });

    var sql = [
        "SELECT DISTINCT(shop_id), name, about, href, owner, address, phone, email,",
        "facebook, twitter, instagram, pinterest,icon_path,",
        "ST_AsGeoJSON(location,4) as json_location,",
        "opening_hours, coffee1, coffee2, coffee3, coffee4,",
        "grinder1, grinder2, machine1, machine2, seating,",
        "dedicated, wifi, service, loyality, child_friendly,",
        "work_friendly, hot_food, lunch, breakfast, kitchen,",
        "credit_card, last_update, ",
        "st_distance(st_setsrid(st_makepoint($1,$2),4326),location) as distance",
        "FROM coffee.shops WHERE wifi ORDER BY distance, shop_id LIMIT $3"
    ].join(" ");

    if(req.query.x !== undefined || req.query.y !== undefined){
        if(isNaN(req.query.x) || isNaN(req.query.y)) {
            return next( new Error("Invalid coordinates.") );
        }
    }

    db.selectQuery(sql, [req.query.x, req.query.y, MAX_RESULTS], function(err, result){
        if(err) return next(err);

        var featureCollection = new FeatureCollection();
        for(var i=0; i<result.rows.length; i++) {
          var feature = new Feature();
          feature.geometry = JSON.parse(result.rows[i].json_location);
          feature.properties = result.rows[i];
          delete feature.properties.json_location;
          featureCollection.features.push(feature);
        }

        return res.json(featureCollection);
    });
});


/*
    Get all Coffee shops from the database closest to a given
    point WHERE seating = true
*/
router.get('/closest_to_point_with_seats.geojson', function(req, res, next) {
    var db = new Database();

    db.connect(config.settings.db, function(err){
        if(err) {
            return next(err);
        }
    });

    var sql = [
        "SELECT DISTINCT(shop_id), name, about, href, owner, address, phone, email,",
        "facebook, twitter, instagram, pinterest,icon_path,",
        "ST_AsGeoJSON(location,4) as json_location,",
        "opening_hours, coffee1, coffee2, coffee3, coffee4,",
        "grinder1, grinder2, machine1, machine2, seating,",
        "dedicated, wifi, service, loyality, child_friendly,",
        "work_friendly, hot_food, lunch, breakfast, kitchen,",
        "credit_card, last_update, ",
        "st_distance(st_setsrid(st_makepoint($1,$2),4326),location) as distance",
        "FROM coffee.shops WHERE seating ORDER BY distance, shop_id LIMIT $3"
    ].join(" ");

    if(req.query.x !== undefined || req.query.y !== undefined){
        if(isNaN(req.query.x) || isNaN(req.query.y)) {
            return next( new Error("Invalid coordinates.") );
        }
    }

    db.selectQuery(sql, [req.query.x, req.query.y, MAX_RESULTS], function(err, result){
        if(err) return next(err);

        var featureCollection = new FeatureCollection();
        for(var i=0; i<result.rows.length; i++) {
          var feature = new Feature();
          feature.geometry = JSON.parse(result.rows[i].json_location);
          feature.properties = result.rows[i];
          delete feature.properties.json_location;
          featureCollection.features.push(feature);
        }

        return res.json(featureCollection);
    });
});


/*
    Get all Coffee shops from the database WHERE coffee = 3fe
*/
router.get('/threefe_coffee.geojson', function(req, res, next) {
    var db = new Database();

    db.connect(config.settings.db, function(err){
        if(err) {
            return next(err);
        }
    });

    var sql = [
        "SELECT shop_id, name, about, href, owner, address, phone, email,",
        "facebook, twitter, instagram, pinterest,icon_path,",
        "ST_AsGeoJSON(location,4)::json as location,",
        "opening_hours, coffee1, coffee2, coffee3, coffee4,",
        "grinder1, grinder2, machine1, machine2, seating,",
        "dedicated, wifi, service, loyality, child_friendly,",
        "work_friendly, hot_food, lunch, breakfast, kitchen,",
        "credit_card, last_update FROM coffee.shops",
        "WHERE coffee1 ilike '%3fe%' or coffee2 ilike '%3fe%' or ",
        "coffee3 ilike '%3fe%' or coffee4 ilike '%3fe%'"
    ].join(" ");

    db.selectQuery(sql, [], function(err, result){
        if(err) return next(err);

        var featureCollection = new FeatureCollection();
        for(var i=0; i<result.rows.length; i++) {
          var feature = new Feature();
          feature.geometry = result.rows[i].location;
          feature.properties = result.rows[i];
          delete feature.properties.location;
          featureCollection.features.push(feature);
        }

        return res.json(featureCollection);
    });
});

/*
    Get all Coffee shops from the database WHERE coffee = roasted brown
*/
router.get('/roasted_brown_coffee.geojson', function(req, res, next) {
    var db = new Database();

    db.connect(config.settings.db, function(err){
        if(err) {
            return next(err);
        }
    });

    var sql = [
        "SELECT shop_id, name, about, href, owner, address, phone, email,",
        "facebook, twitter, instagram, pinterest,icon_path,",
        "ST_AsGeoJSON(location,4)::json as location,",
        "opening_hours, coffee1, coffee2, coffee3, coffee4,",
        "grinder1, grinder2, machine1, machine2, seating,",
        "dedicated, wifi, service, loyality, child_friendly,",
        "work_friendly, hot_food, lunch, breakfast, kitchen,",
        "credit_card, last_update FROM coffee.shops",
        "WHERE coffee1 ilike '%roasted brown%' or coffee2 ilike '%roasted brown%' or ",
        "coffee3 ilike '%roasted brown%' or coffee4 ilike '%roasted brown%'"
    ].join(" ");

    db.selectQuery(sql, [], function(err, result){
        if(err) return next(err);

        var featureCollection = new FeatureCollection();
        for(var i=0; i<result.rows.length; i++) {
          var feature = new Feature();
          feature.geometry = result.rows[i].location;
          feature.properties = result.rows[i];
          delete feature.properties.location;
          featureCollection.features.push(feature);
        }

        return res.json(featureCollection);
    });
});


/*
    Get all Coffee shops from the database WHERE coffee = cloud picker
*/
router.get('/cloud_picker_coffee.geojson', function(req, res, next) {
    var db = new Database();

    db.connect(config.settings.db, function(err){
        if(err) {
            return next(err);
        }
    });

    var sql = [
        "SELECT shop_id, name, about, href, owner, address, phone, email,",
        "facebook, twitter, instagram, pinterest,icon_path,",
        "ST_AsGeoJSON(location,4)::json as location,",
        "opening_hours, coffee1, coffee2, coffee3, coffee4,",
        "grinder1, grinder2, machine1, machine2, seating,",
        "dedicated, wifi, service, loyality, child_friendly,",
        "work_friendly, hot_food, lunch, breakfast, kitchen,",
        "credit_card, last_update FROM coffee.shops",
        "WHERE coffee1 ilike '%cloud picker%' or coffee2 ilike '%cloud picker%' or ",
        "coffee3 ilike '%cloud picker%' or coffee4 ilike '%cloud picker%'"
    ].join(" ");

    db.selectQuery(sql, [], function(err, result){
        if(err) return next(err);

        var featureCollection = new FeatureCollection();
        for(var i=0; i<result.rows.length; i++) {
          var feature = new Feature();
          feature.geometry = result.rows[i].location;
          feature.properties = result.rows[i];
          delete feature.properties.location;
          featureCollection.features.push(feature);
        }

        return res.json(featureCollection);
    });
});



/*
    Get all Coffee shops from the database WHERE coffee = full circle
*/
router.get('/full_circle_coffee.geojson', function(req, res, next) {
    var db = new Database();

    db.connect(config.settings.db, function(err){
        if(err) {
            return next(err);
        }
    });

    var sql = [
        "SELECT shop_id, name, about, href, owner, address, phone, email,",
        "facebook, twitter, instagram, pinterest,icon_path,",
        "ST_AsGeoJSON(location,4)::json as location,",
        "opening_hours, coffee1, coffee2, coffee3, coffee4,",
        "grinder1, grinder2, machine1, machine2, seating,",
        "dedicated, wifi, service, loyality, child_friendly,",
        "work_friendly, hot_food, lunch, breakfast, kitchen,",
        "credit_card, last_update FROM coffee.shops",
        "WHERE coffee1 ilike '%full circle%' or coffee2 ilike '%full circle%' or ",
        "coffee3 ilike '%full circle%' or coffee4 ilike '%full circle%'"
    ].join(" ");

    db.selectQuery(sql, [], function(err, result){
        if(err) return next(err);

        var featureCollection = new FeatureCollection();
        for(var i=0; i<result.rows.length; i++) {
          var feature = new Feature();
          feature.geometry = result.rows[i].location;
          feature.properties = result.rows[i];
          delete feature.properties.location;
          featureCollection.features.push(feature);
        }

        return res.json(featureCollection);
    });
});


/*
    Get all Coffee shops from the database WHERE breakfast = true
*/
router.get('/breakfast.geojson', function(req, res, next) {
    var db = new Database();

    db.connect(config.settings.db, function(err){
        if(err) {
            return next(err);
        }
    });

    var sql = [
        "SELECT shop_id, name, about, href, owner, address, phone, email,",
        "facebook, twitter, instagram, pinterest,icon_path,",
        "ST_AsGeoJSON(location,4)::json as location,",
        "opening_hours, coffee1, coffee2, coffee3, coffee4,",
        "grinder1, grinder2, machine1, machine2, seating,",
        "dedicated, wifi, service, loyality, child_friendly,",
        "work_friendly, hot_food, lunch, breakfast, kitchen,",
        "credit_card, last_update FROM coffee.shops WHERE breakfast",
    ].join(" ");

    db.selectQuery(sql, [], function(err, result){
        if(err) return next(err);

        var featureCollection = new FeatureCollection();
        for(var i=0; i<result.rows.length; i++) {
          var feature = new Feature();
          feature.geometry = result.rows[i].location;
          feature.properties = result.rows[i];
          delete feature.properties.location;
          featureCollection.features.push(feature);
        }

        return res.json(featureCollection);
    });
});


/*
    Get all Coffee shops from the database WHERE pastry = true
*/
router.get('/pastry.geojson', function(req, res, next) {
    var db = new Database();

    db.connect(config.settings.db, function(err){
        if(err) {
            return next(err);
        }
    });

    var sql = [
        "SELECT shop_id, name, about, href, owner, address, phone, email,",
        "facebook, twitter, instagram, pinterest,icon_path,",
        "ST_AsGeoJSON(location,4)::json as location,",
        "opening_hours, coffee1, coffee2, coffee3, coffee4,",
        "grinder1, grinder2, machine1, machine2, seating,",
        "dedicated, wifi, service, loyality, child_friendly,",
        "work_friendly, hot_food, lunch, breakfast, kitchen,",
        "credit_card, last_update FROM coffee.shops WHERE pastry"
    ].join(" ");

    db.selectQuery(sql, [], function(err, result){
        if(err) return next(err);

        var featureCollection = new FeatureCollection();
        for(var i=0; i<result.rows.length; i++) {
          var feature = new Feature();
          feature.geometry = result.rows[i].location;
          feature.properties = result.rows[i];
          delete feature.properties.location;
          featureCollection.features.push(feature);
        }

        return res.json(featureCollection);
    });
});


/*
    Get all Coffee shops from the database WHERE lunch = true
*/
router.get('/lunch.geojson', function(req, res, next) {
    var db = new Database();

    db.connect(config.settings.db, function(err){
        if(err) {
            return next(err);
        }
    });

    var sql = [
        "SELECT shop_id, name, about, href, owner, address, phone, email,",
        "facebook, twitter, instagram, pinterest,icon_path,",
        "ST_AsGeoJSON(location,4)::json as location,",
        "opening_hours, coffee1, coffee2, coffee3, coffee4,",
        "grinder1, grinder2, machine1, machine2, seating,",
        "dedicated, wifi, service, loyality, child_friendly,",
        "work_friendly, hot_food, lunch, breakfast, kitchen,",
        "credit_card, last_update FROM coffee.shops WHERE lunch"
    ].join(" ");

    db.selectQuery(sql, [], function(err, result){
        if(err) return next(err);

        var featureCollection = new FeatureCollection();
        for(var i=0; i<result.rows.length; i++) {
          var feature = new Feature();
          feature.geometry = result.rows[i].location;
          feature.properties = result.rows[i];
          delete feature.properties.location;
          featureCollection.features.push(feature);
        }

        return res.json(featureCollection);
    });
});



/*
    Get all Coffee shops from the database WHERE hot food = true
*/
router.get('/hot_food.geojson', function(req, res, next) {
    var db = new Database();

    db.connect(config.settings.db, function(err){
        if(err) {
            return next(err);
        }
    });

    var sql = [
        "SELECT shop_id, name, about, href, owner, address, phone, email,",
        "facebook, twitter, instagram, pinterest,icon_path,",
        "ST_AsGeoJSON(location,4)::json as location,",
        "opening_hours, coffee1, coffee2, coffee3, coffee4,",
        "grinder1, grinder2, machine1, machine2, seating,",
        "dedicated, wifi, service, loyality, child_friendly,",
        "work_friendly, hot_food, lunch, breakfast, kitchen,",
        "credit_card, last_update FROM coffee.shops WHERE hot_food"
    ].join(" ");

    db.selectQuery(sql, [], function(err, result){
        if(err) return next(err);

        var featureCollection = new FeatureCollection();
        for(var i=0; i<result.rows.length; i++) {
          var feature = new Feature();
          feature.geometry = result.rows[i].location;
          feature.properties = result.rows[i];
          delete feature.properties.location;
          featureCollection.features.push(feature);
        }

        return res.json(featureCollection);
    });
});


module.exports = router;
