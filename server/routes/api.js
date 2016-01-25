/**
 * Created by abrooksnagel on 1/22/16.
 */
var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/address_and_order';

router.get('/users', function(request, response) {
    var usersResults = [];

    pg.connect(connectionString, function(err, client) {
        var query = client.query("SELECT * FROM users");
        query.on('row', function(row) {
            usersResults.push(row);
        });
        query.on('end', function() {
            client.end();
            return response.json(usersResults);
        });
    });
});

router.get('/addresses/:id', function(request, response) {
    var addressesResults = [];
    var id = request.params.id;
    console.log(request);

    pg.connect(connectionString, function(err, client) {
        var query = client.query("SELECT * FROM addresses WHERE user_id = " + id);
        query.on('row', function(row) {
            addressesResults.push(row);
        });
        query.on('end', function() {
            client.end();
            return response.json(addressesResults);
        });
    });
});

router.get('/orders/:id/:sd/:ed', function(request, response) {
    var ordersResults = [];
    var totalAmount = [];
    var id = request.params.id;
    var sd = request.params.sd;
    var ed = request.params.ed;
    console.log("in orders router", id, sd, ed);

    pg.connect(connectionString, function(err, client) {
        //var query = client.query("SELECT * FROM orders WHERE user_id = " + id );
        var query = client.query("SELECT * FROM orders JOIN addresses ON addresses.address_id = orders.ship_address_id JOIN users ON users.id = orders.user_id WHERE orders.user_id = " + id + "AND order_date >= '"+ sd +"' AND order_date <= '"+ ed +"'");
        query.on('row', function(row) {
            ordersResults.push(row);
        });
        query.on('end', function() {
            client.end();
            return response.json(ordersResults);
        });
    });

    //pg.connect(connectionString, function(err, client) {
    //    //var query = client.query("SELECT * FROM orders WHERE user_id = " + id );
    //    var query = client.query("SELECT SUM(amount) FROM orders JOIN addresses ON addresses.address_id = orders.ship_address_id JOIN users ON users.id = orders.user_id WHERE orders.user_id = " + id + "AND order_date >= '"+ sd +"' AND order_date <= '"+ ed +"'");
    //    query.on('row', function(row) {
    //        totalAmount.push(row);
    //    });
    //    query.on('end', function() {
    //        client.end();
    //        return response.json(totalAmount);
    //    });
    //});


});


module.exports = router;