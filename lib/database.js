var pg = require('pg');
var config;
var conString;
var database;

var rollback = function(client, done)
{
    client.query('ROLLBACK', function(err)
    {
        return done(err);
    });
};

var Database = function(){};

Database.prototype.connect = function(config, callback){
    if(config === undefined){
        return callback(new Error('Database configuration is undefined.'));
    }
    else{
        if(config.debug){
            conString = config['development-dsn'];
        }
        else{
            conString = config['production-dsn'];
        }

        if(conString === undefined || conString.length === 0){
            return callback(new Error('Invalid DSN: ' + conString));
        }

        pg.connect(conString, function(err, client, done){
            done();
            if(err){
                return callback(err);
            }
            else{
                return callback(null);
            }
        });
    }
};


/*
    Run an SQL statement that requires a commit or transaction.
*/
Database.prototype.commitQuery = function(sql, data, reference, callback) {
    pg.connect(conString, function(err, client, done)
    {
        if(err)
        {
            done(client);
            return callback(err, null);
        }

        client.query('BEGIN', function(err)
        {
            if(err)
            {
                rollback(client, done);
                return callback(err, null);
            }

            client.query(sql, data, function(err, result)
            {
                if(err)
                {
                    rollback(client, done);
                    return callback(err, null);
                }
                else
                {
                    client.query('COMMIT', done);
                    client.end();
                    return callback(null, result, reference);
                }
            });
        });
    });
};


/*
    Run a simple SELECT query that does not require a commit.
*/
Database.prototype.selectQuery = function(sql, data, callback){

    pg.connect(conString, function(err, client, done) {

        if(err)
        {
            done(client);
            return callback(err, null);
        }

        client.query(sql, data, function(err, result)
        {
            if(err)
            {
                done(client);
                return callback(err, null);
            }
            done();
            client.end();
            return callback(null, result);
        });
    });
};

module.exports = Database;
