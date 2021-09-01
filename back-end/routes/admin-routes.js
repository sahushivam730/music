var express = require("express");
const app = express.Router();
const envr = 'PRODUCTION'
// const envr = 'DEVELOPMENT'

const sess = function(req, res, next) {
    if (envr == "PRODUCTION") {
        if (typeof req.session.DATA == 'undefined') {

            res.redirect(base_url+'admin');
            res.end();
        } else {
            next()
        }
    } else {
        req.session.DATA = [{
                id: 1,
                username: 'admin',
                password: '$2b$14$sJx7vduH8knGwmPCec9c9uxYpW.KUorVa/otuP7/g5D0QPqPBafVK',
                status: 1
            }
        ]
        next()
    }
}
const {login,login_post,logout,dashboard,genres,save_genre,enable_disable_status,beats,save_beat,beat_enable_disable_status,cashapp,cashapp_completed,paypal,changecashappstatus,exclusive_request} = require("../admin-api");

app.get('/',login)
app.get('/login',login)
app.post('/login',login_post)
app.get('/logout',logout)

app.get('/dashboard',sess,dashboard)
app.get('/genres',sess,genres)
app.post('/save-genre',sess,save_genre)
app.post('/enable-disable-status',sess,enable_disable_status)
app.get('/beats',sess,beats)
app.post('/save-beat',sess,save_beat)
app.get('/cashapp',sess,cashapp)
app.get('/cashapp_completed',sess,cashapp_completed)
app.post('/changecashappstatus',sess,changecashappstatus)
app.get('/paypal',sess,paypal)
app.get('/exclusive_request',sess,exclusive_request)
app.post('/beat-enable-disable-status',sess,beat_enable_disable_status)
module.exports = app;
