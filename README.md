## KikDogeWallet
#### Dogecoin Wallet for Kik Messenger.

[Learn about Dogecoin here](http://www.dogecoin.com/)

![Doge](http://dogecoin.com/img/dogecoin-300.png)

#### Use
1. Install [Kik Messenger](http://kik.com) on your smartphone if you haven't yet
2. Log in/register a username
3. Open the sidebar and search `Dogecoin Wallet`
4. Tap the Dogecoin Wallet link that appears

```
    wow                     rich shibe
                  much wallet                send to friends!
         very coin                 spend wisely wow
```
(If that doesn't work then open the sidebar and navigate to `https://kikdogewallet.herokuapp.com`)

#### Install
1. Make sure you have [MongoDB](mongodb.org) and [NodeJS](nodejs.org) installed.
2. Clone repo  
`git clone git@github.com:mitchellvanderhoeff/kikdogewallet.git`
3. Run `npm install`, `bower install` and `npm install gulp -g`
4. Run `gulp dev`
5. Navigate to `http://localhost:9000` with a browser

This will run a debug server that doesn't check Kik authentication. You can log in to the database by running `mongo` and then  

```
> use dogewallet        
> show collections
```
For example, you might want to increase the test account's balance by an amount to test sending and receiving. For that, run the following command in the Mongo shell:

```
> db.Wallets.update({ "username" : "eltestador" }, { "$inc" : { "balance" : <amount> } })
```

Consult the MongoDB docs for info on how to query and update the database more.
