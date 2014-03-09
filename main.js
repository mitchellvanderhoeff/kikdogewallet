/**
 * Created by mitch on 2/9/2014.
 */
"use strict";

var Wallets = require('./server/wallets');
var TokenManager = require('./server/tokenmanager');
var TransactionStorage = require('./server/transactions');
var kikAuth = require('./server/kikauth');
var qrScan = require('./server/qrscan');

var express = require('express');
var app = express();

app.use(function (req, res, next) {
   if (req.method == 'OPTIONS') {
      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000');

      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);

      // Pass to next layer of middleware
   }
   next();
});

app.use(function (req, res, next) {
   console.log(req.method + " " + req.path);
   next();
});

app.use(express.json());

app.get('/token', function (req, res) {
   var username = req.query.username;
   if (!username) {
      res.send(500, "Must specify username in query");
      return;
   }
   TokenManager.generateToken(username, function (error, token) {
      if (error) {
         res.send(500, error);
      } else {
         res.send(token);
      }
   });
});

app.post('/scanQRCode', kikAuth, qrScan);

app.post('/getWallet', kikAuth, function (req, res) {
   var username = req.body.username;
   Wallets.getWallet(username, function (error, wallet) {
      if (error) {
         res.send(500, error);
      } else {
         res.send(wallet);
      }
   });
});

app.post('/sendCoins', kikAuth, function (req, res) {
   var from = req.body.username;
   var to = req.body.to;
   var amount = req.body.amount;
   Wallets.sendCoins(from, to, amount, function (error, transaction) {
      if (error) {
         res.send(500, error);
      } else {
         res.send(transaction);
      }
   });
});

app.post('/withdraw', kikAuth, function (req, res) {
   var username = req.body.username;
   var toAddress = req.body.toAddress;
   var amount = req.body.amount;
   Wallets.withdraw(username, toAddress, amount, function (error, wallet) {
      if (error) {
         res.send(500, error);
      } else {
         res.send(wallet);
      }
   });
});

app.post('/getTransactions', kikAuth, function (req, res) {
   var username = req.body.username;
   var limit = req.body.limit || 10;
   TransactionStorage.getTransactions(username, limit, function (error, txs) {
      if (error) {
         res.send(500, error);
      } else {
         res.send(txs);
      }
   });
});

app.use(express.static(__dirname + (process.env.APP_PATH || '/dist')));

if (process.env.DEBUG) {
   console.log("Running in debug mode.");
}

var port = process.env.PORT || 9000;
console.log("Listening on port " + port);
app.listen(port);