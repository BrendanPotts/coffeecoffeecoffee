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

router.get('/allshops', function(req, res, next) {
    var db = new Database();

    db.connect(config.settings.db, function(err){
        if(err) {
            return next(err);
        }
    });

    var sql = [
        "SELECT shop_id, name, about, href, owner, address, phone, email,",
        "facebook, twitter, instagram, pinterest,icon_path,",
        "ST_AsGeoJSON(location,2)::json as location,",
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


module.exports = router;
