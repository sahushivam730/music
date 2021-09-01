var express = require("express");
const app = express.Router();
const jwt = require("jsonwebtoken");
VerifyAuth = function(req, res, next) {
    var token = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
    jwt.verify(token, 'xxxxxxxxxxxxxxxxxxxxxx',async function(err, token_data,) {
        if (err) {
            res.send({
                status:false,
                msg:'Auth error'
            });
            res.end();
        } else {
            if(token_data.data=='2021-08-02T12:00:39.974Z'){
                next();
            }else{
                res.send({
                    status:false,
                    msg:'Auth error'
                });
                res.end();
            }
        }
    });
}

const {feturedbeats,exclusivebeats,thismonth,genres,search,addtocart,getcart,updatecart,getproduct,getrelatedproduct,removecartitem,login,signup,logout,verify,savesuccess,downloads,verify2,gettransaction,cashapp_request,getallbeats,addtofav,getfav,save_cashapp_req,getsinglegenre,save_subscriber,save_ex_ng_req} = require("../api");

app.get('/fetured-beats',VerifyAuth,feturedbeats)
app.get('/exclusive-beats',VerifyAuth,exclusivebeats)
app.get('/thismonth',VerifyAuth,thismonth)
app.get('/genres',VerifyAuth,genres)
app.get('/search',VerifyAuth,search)
app.get('/addtocart',VerifyAuth,addtocart)
app.get('/getcart',VerifyAuth,getcart)
app.get('/updatecart',VerifyAuth,updatecart)
app.get('/getproduct',VerifyAuth,getproduct)
app.get('/getrelatedproduct',VerifyAuth,getrelatedproduct)
app.get('/removecartitem',VerifyAuth,removecartitem)
app.post('/login',VerifyAuth,login)
app.post('/signup',VerifyAuth,signup)
app.get('/logout',VerifyAuth,logout)
app.get('/verify',VerifyAuth,verify)
app.post('/savesuccess',VerifyAuth,savesuccess)
app.get('/downloads/:token',VerifyAuth,downloads)
app.get('/verify2/:token',VerifyAuth,verify2)
app.get('/get-transactions/:token',VerifyAuth,gettransaction)
app.post('/cashapp_request',VerifyAuth,cashapp_request)
app.get('/getallbeats',VerifyAuth,getallbeats)
app.get('/addtofav/:token/:id',VerifyAuth,addtofav)
app.get('/getfav/:token',VerifyAuth,getfav)
app.post('/save-cashapp-req',VerifyAuth,save_cashapp_req)
app.get('/getsinglegenre',VerifyAuth,getsinglegenre)
app.post('/save-subscriber',VerifyAuth,save_subscriber)
app.post('/save-ex-ng-req',VerifyAuth,save_ex_ng_req)

module.exports = app;
