const { SSL_OP_ALL, SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } = require("constants");
var date = require("date-and-time");
var fs = require("fs");
const { Logform } = require("winston");
const striptags = require("striptags");
const jwt = require("jsonwebtoken");
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();
const baseurl2 = 'http://217.112.95.118:3000/'
module.exports = {
    feturedbeats: async (req,res)=>{
        let beats = await db.query("select title,description,artist,thumb,demo_beat,id,price1,(SELECT name from genres where id=beats.genre) as genrename from beats where featured=1 AND status=1 ORDER BY id DESC",false,true)
        if(beats.length>0){
            res.send({"res":true,"data":beats})
        }else{
            res.send({"res":false,"data":beats})
        }
    },
    exclusivebeats: async (req,res)=>{
        let beats = await db.query("select title,description,artist,thumb,demo_beat,id,price1,(SELECT name from genres where id=beats.genre) as genrename from beats where exclusive=2 AND status=1 ORDER BY id DESC",false,true)
        if(beats.length>0){
            res.send({"res":true,"data":beats})
        }else{
            res.send({"res":false,"data":beats})
        }
    },
    thismonth: async (req,res)=>{
        let beats = await db.query("select title,description,artist,thumb,demo_beat,id,price1,(SELECT name from genres where id=beats.genre) as genrename from beats where MONTH(datetime) = MONTH(CURRENT_DATE()) AND status=1 ORDER BY id DESC",false,true)
        if(beats.length>0){
            res.send({"res":true,"data":beats})
        }else{
            res.send({"res":false,"data":beats})
        }
    },
    genres: async (req,res)=>{
        let genres = await db.query("select name,description,img,id from genres where status=1 ORDER BY id DESC",false,true)
        if(genres.length>0){
            res.send({"res":true,"data":genres})
        }else{
            res.send({"res":false,"data":genres})
        }
    },
    search: async (req,res)=>{
        let keyword =  req.query.keyword;
        let data = await db.query("SELECT beats.title,genres.name,beats.id,beats.genre FROM `beats`" + 
        " INNER JOIN genres ON genres.id = beats.genre "+ 
        " WHERE `title` LIKE :title OR name LIKE :title",{"title":"%"+keyword+"%"},true)
        if(data.length>0){
            res.send({"res":true,"data":data})
        }else{
            res.send({"res":false,"data":data})
        }
    },
    addtocart: async (req,res)=>{
        let id =  req.query.id
        let price =  req.query.price
        var dd={
            "id"    : id,
            "price" : price
        }
        var savecart = myCache.mset([{key:id,val: dd,ttl: 10000}]);
        res.send({"res":true})
    },    
    getcart: async (req,res)=>{
        let ids = myCache.mget(myCache.keys())
        let count = myCache.keys().length;
        let keys = JSON.stringify(myCache.keys());
        keys = keys.slice(1,-1);
        let cartData = [];
        if(count>0){
            let data = await db.query("select * from beats where id IN("+keys+")",false,true);
            for(let i = 0;i<count;i++){
                let price = ids[data[i].id]
                let type1 = data[i].original_beat1
                type1 = type1.split('.')
                type1 = type1[type1.length-1]
                let type2 = data[i].original_beat2
                type2 = type2.split('.')
                type2 = type2[type2.length-1]
                let type3 = data[i].original_beat3
                type3 = type3.split('.')
                type3 = type3[type3.length-1]
                cartData.push({
                    "id"         : data[i].id,
                    "title"      : data[i].title,
                    "artist"     : data[i].artist,
                    "demo_beat"  : data[i].demo_beat,
                    "price"      : price.price,
                    "type1"      : type1,
                    "type2"      : type2,
                    "type3"      : type3
                })
            }
        }           
        res.send({"res":true,"cartData":cartData})   
    },    
    updatecart: async (req,res)=>{
        let id =  req.query.id
        let type =  req.query.type
        let cartData = [];
        if(id != '' && type != ''){
            let data = await db.query("select * from beats where id IN("+id+")",false,true);
            if(data.length>0){
                if(data[0]['price'+type]!=undefined){
                    res.send({"res":true,"price":data[0]['price'+type]}) 
                }else{
                    res.send({"res":false,"price":0}) 
                }
            }
        }else{
            res.send({"res":false,"price":0}) 
        }   
    },
    getproduct: async (req,res)=>{
        if(req.query.id!=''){
            let data = await db.query("select description,thumb,id,title,artist,demo_beat,price1,original_beat1,original_beat2,original_beat3,(SELECT name from genres where id=beats.genre) as genrename from beats where id =:id",{"id":req.query.id},true);
            let newData = []
            if(data.length>0){
                let type1 = data[0].original_beat1
                type1 = type1.split('.')
                type1 = type1[type1.length-1]
                let type2 = data[0].original_beat2
                type2 = type2.split('.')
                type2 = type2[type2.length-1]
                let type3 = data[0].original_beat3
                type3 = type3.split('.')
                type3 = type3[type3.length-1]
                newData={
                    "id"         : data[0].id,
                    "title"      : data[0].title,
                    "artist"     : data[0].artist,
                    "demo_beat"  : data[0].demo_beat,
                    "genre"      : data[0].genrename,
                    "price"      : data[0].price1,
                    "thumb"      : data[0].thumb,
                    "type"       : 1,
                    "type1"      : type1,
                    "type2"      : type2,
                    "type3"      : type3
                }
            }
            res.send({"res":true,"product":newData}) 
        }else{
            res.send({"res":true,"product":[]}) 
        }
    },
    getrelatedproduct: async (req,res)=>{
        if(req.query.id!=''){
            let data = await db.query("select id,title,artist,thumb,demo_beat,price1 from beats WHERE genre = (select genre from beats where id =:id)",{"id":req.query.id},true);
            res.send({"res":true,"products":data}) 
        }else{
            res.send({"res":true,"products":[]}) 
        }
    },
    removecartitem: async (req,res)=>{
        let id =  req.query.id
        let cartData = [];
        if(id != ''){
            myCache.del(id);
            console.log(myCache.mget(myCache.keys()));
            let ids = myCache.mget(myCache.keys())
            let count = myCache.keys().length;
            let keys = JSON.stringify(myCache.keys());
            keys = keys.slice(1,-1);
            if(count>0){
                let data = await db.query("select * from beats where id IN("+keys+")",false,true);
                for(let i = 0;i<count;i++){
                    let price = ids[data[i].id]
                    let type1 = data[i].original_beat1
                    type1 = type1.split('.')
                    type1 = type1[type1.length-1]
                    let type2 = data[i].original_beat2
                    type2 = type2.split('.')
                    type2 = type2[type2.length-1]
                    let type3 = data[i].original_beat3
                    type3 = type3.split('.')
                    type3 = type3[type3.length-1]
                    cartData.push({
                        "id"         : data[i].id,
                        "title"      : data[i].title,
                        "artist"     : data[i].artist,
                        "demo_beat"  : data[i].demo_beat,
                        "price"      : price.price,
                        "type1"      : type1,
                        "type2"      : type2,
                        "type3"      : type3
                    })
                }
            }   
        }
        res.send({"res":true,"cartData":cartData})  
    },
    login: async (req,res)=>{
        try {
            let data = await db.query("select * from users where email=:email",{"email":req.body.l_email},false,false)            
            if(data.length>0){
                if(data[0].status != 1){
                    //send mail for verification
                    var user = req.body.l_email+"_"+data[0].username
                    var token = jwt.sign({user}, 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
                    fun.nodemailer(req.body.l_email,"Verify Account",baseurl2+"?token="+token)
                    res.send({"res":false,"msg":"Email is not verified, We've sent you the verification link again, please verify with this email first."});
                    return;
                }

                let plain_pwd = req.body.l_password
                let hash_pwd = data[0].pwd
                fun.comparePassword(plain_pwd,hash_pwd,function(err,isMathch){
                    if(isMathch == true){
                        data.push({"status":1})
                        var auth =jwt.sign({
                            data: data
                          }, 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', { expiresIn: '1h' });
                        res.send({
                            status:true,
                            msg:'logged In',
                            token: auth
                        });
                    }else{
                        res.send({
                            status:false,
                            msg:'invalid Username Or Password'
                        });
                    }
                })
            }else{
                res.send({
                    status:false,
                    msg:'Email is not registered'
                });
            }
        } catch (error) {
            res.send({
                status:false,
                msg:'Something Went Wrong Please Try Again'
            });

        }
    },
    signup: async (req,res)=>{
        try {
            let data = await db.query("select * from users where email=:email",{"email":req.body.email},false,false)            
            if(data.length>0){
                    res.send({
                        status:false,
                        msg :'Email is already registered.'
                    });
            }else{
                let pwd   = req.body.password
                let email = striptags(req.body.email)
                let username  = striptags(req.body.username)
                let created_at  = date.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
                fun.cryptPassword(pwd,async function(err,hash){
                    let results = await db.insert('users',{
                        "username"   : username,
                        "email"      : email,
                        "pwd"        : hash,
                        "created_at" : created_at
                      });  
                    
                        //send mail for verification
                        var user  = email+"_"+username
                        var token = jwt.sign({user}, 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
                        fun.nodemailer(email,"Verify Account",baseurl2+"?token="+token);
                        res.send({
                            status:true,
                            msg:"We've sent you an email with the confirmation, please verify your email to complete the sign up process."
                        });
                })
            }
        } catch (error) {
            console.log(error);
            res.send({
                status:false,
                msg:'Something Went Wrong Please Try Again'
            });
        }
    },
    logout: async (req,res)=>{
        try {
            req.session.destroy();
            console.log("logout successfull!");
            res.redirect(base_url)
        } catch (error) {
            console.log(error);
        }
    },
    verify: async (req,res)=> {
        try {
            if(req.query.token){
                jwt.verify(req.query.token, 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',async function(err, token_data,) {
                    if (err) {
                        res.send({
                            status:false,
                            msg:'Link expired'
                        });
                    } else {
                        var user = token_data.user.split("_")  
                        var email = user[0]
                        db.query("update users set status=1 where email=:email",{"email":email},true,false)
                        let data = await db.query("select * from users where email=:email",{"email":email},true,false)            
                        data.push({"status":1})
                        req.session.DATA = data
                        res.send({
                            status:true,
                            msg:'Your email is verified'
                        });
                    }
                })  
            }else{
                res.send({
                    status:false,
                    msg:'Link expired'
                });
            }
        } catch (error) {
            console.log(error);
        }
    },
    checkout: async (req,res)=> {
        let cart        = req.body.cart
        let cartTotal   = req.body.tot
        if(cart.length > 0){
            let items = []
            for(let i=0;i<cart.length;i++){
                let data = await db.query("select * from beats where id=:id AND status=1",{"id":cart[1].id},true,false)            
                if(data.length>0){
                    let item={
                        'bid'     :   data[0].id,
                        'title'   :   data[0].title,
                        'artist'  :   data[0].artist,
                        'price'   :   data[0]['price'+cart[i].type],
                        'beat'    :   data[0]['original_beat'+cart[i].type],
                        "currency": "USD",
                        "quantity": 1
                    }
                    items.push(item);
                }
            }

            const create_payment_json = {
                "intent": "sale",
                "payer": {
                    "payment_method": "paypal"
                },
                "redirect_urls": {
                    "return_url": react_base_url+"success?total="+totalpay+"&order_id="+result.insertId,
                    "cancel_url": react_base_url+"failed?total="+totalpay
                },
                "transactions": [{
                    "item_list": {
                        items
                    },
                    "amount": {
                        "currency": "USD",
                        "total": cartTotal
                    },
                    "description": "Heat kings"
                }]
            };
        
            paypal.payment.create(create_payment_json, function (error, payment) {
                if (error) {
                    res.send({"res":false,"msg":"Something went wrong."});
                }else{
                    for(let i = 0;i < payment.links.length;i++){
                        if(payment.links[i].rel === 'approval_url'){
                            res.send({"res":true,"url":payment.links[i].href});
                        }
                    }
                }
            });
        }else{
            res.send({status:false,"msg":"Something went wrong."});
        }

    },
    savesuccess: async (req,res)  =>  {
        let cart        = req.body.cart
        let cartTotal   = req.body.tot
        let payment     = req.body.payment
        let token       = req.body.token
        let user = await verify(token);
        if(cart.length > 0  && user!=false){
            datetime = date.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
            let savebilling = await db.insert('billingdetails',{
                "userid"    : user.data[0].id,
                "amount"    : cartTotal,
                "payerid"   : payment.payerID,
                "paymentid" : payment.paymentID,
                "mode"      : 'paypal',
                "paid"      : (payment.paid==true)?1:0,
                "email"     : payment.email,
                "datetime"  : datetime
              });  
              if(savebilling.insertId!=null || savebilling.insertId!=undefined){
                  cart.forEach( async (element,i) => {
                    let data = await db.query("select * from beats where id=:id AND status=1",{"id":cart[i].id},true,false) 
                    let saveorders = await db.insert('orders',{
                        "userid"    : user.data[0].id,
                        "beatid"    : cart[i].id,
                        "billingid" : savebilling.insertId,
                        "amount"    : cart[i].price,
                        "title"     : data[0].title,
                        "artist"    : data[0].artist,
                        "amount"    : cart[i].price,
                        "beat"      : data[0]['original_beat'+cart[i].type],
                        "datetime"  : datetime,
                        "status"  : 1
                      });  
                    });
              }
            res.send({res:true});
        }else{
            res.send({res:false,"msg":"Something went wrong."});
        }
    },
    downloads: async (req,res)  =>  {
        let token = req.params.token
        if(token!=''){
            let user = await verify(token);
            if(user!=false){
                let orders = await db.query("select title,artist,amount,beat,type,beatid from orders where userid=:userid AND status=1",{"userid":user.data[0].id},true,false);
                res.send({'res':true,"downloads":orders})
            }else{
                res.send({'res':false})
            }
        }else{
            res.send({'res':false})
        }
    },
    verify2: async (req,res)  =>  {
        let token = req.params.token
        if(token!=''){
            let user = await verify(token);
            if(user!=false){
                res.send({'res':true})
            }else{
                res.send({'res':false})
            }
        }else{
            res.send({'res':false})
        }
    },
    gettransaction: async (req,res)  =>  {
        let token = req.params.token
        if(token!=''){
            let user = await verify(token);
            if(user!=false){
                let orders = await db.query("select email,amount,mode,paid,datetime from billingdetails where userid=:userid",{"userid":user.data[0].id},true,false);
                console.log(orders)
                res.send({'res':true,"transactions":orders})
            }else{
                res.send({'res':false})
            }
        }else{
            res.send({'res':false})
        }
    },
    cashapp_request: async (req,res)=>{
        try {
                let user_name   =req.body.user_name;
                console.log(req.body);
                let user_email = striptags(req.body.user_email)
                let genre  = striptags(req.body.genre)
                let beats  = striptags(req.body.beats)
                let price  = striptags(req.body.price)
                let created_at  = date.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
                    let results = await db.insert('cashapp_request',{
                        "user_name"   : user_name,
                        "user_email"      : user_email,
                        "genre"        : genre,
                        "beats"    : beats,
                        "price" : price,
                        "date_time" : created_at
                      });  
                      res.send({
                            status:true,
                            msg:{results}
                        });
                    
                    
        
        } catch (error) {
            console.log(error);
            res.send({
                status:false,
                msg:'Something Went Wrong Please Try Again'
            });
        }
    },
    getallbeats: async (req,res)=>{
        let beats = await db.query("select * from beats where status=1 ORDER BY id DESC",false,true)
        if(beats.length>0){
            res.send({"res":true,"data":beats})
        }else{
            res.send({"res":false,"data":beats})
        }
    },
    addtofav: async (req,res)=>{
        let token = req.params.token
        let id = req.params.id
        let user = await verify(token);
        if(user!=false){
            let datetime = date.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
            let chk = await db.query("select status from fav where userid=:userid AND beatid=:beatid",{
                "userid"  : user.data[0].id,
                "beatid"  : id
            },false,true);
            if(chk.length>0){
                if(chk[0].status==1){
                    let update = await db.query("update fav set status=0 where userid=:userid AND beatid=:beatid",{
                        "userid"  : user.data[0].id,
                        "beatid"  : id
                    },false,true);
                }else{
                    let update = await db.query("update fav set status=1 where userid=:userid AND beatid=:beatid",{
                        "userid"  : user.data[0].id,
                        "beatid"  : id
                    },false,true);
                }
            }else{
                let save = await db.insert("fav",{
                    "userid"  : user.data[0].id,
                    "beatid"  : id,
                    "datetime": datetime
                });
            }
            let data = await db.query("SELECT id,beats.title,beats.artist,beats.demo_beat,beats.thumb,beats.price1 FROM `fav` "+
            " INNER JOIN beats ON fav.beatid = beats.id "+
            " WHERE userid = :userid AND fav.status=1",{
                "userid"  : user.data[0].id
            },false,true);
            res.send({'res':true,"data":data})
        }else{
            res.send({'res':false})
        }
    },
    getfav: async (req,res)=>{
        let token = req.params.token
        let user = await verify(token);
        if(user!=false){
            let data = await db.query("SELECT id,beats.title,beats.artist,beats.demo_beat,beats.thumb,beats.price1 FROM `fav` "+
            " INNER JOIN beats ON fav.beatid = beats.id "+
            " WHERE userid = :userid AND fav.status=1",{
                "userid"  : user.data[0].id
            },false,true);
            res.send({'res':true,'data':data})
        }else{
            res.send({'res':false,'data':[]})
        }
    },
    save_cashapp_req: async (req,res)=>{
        let cart        = req.body.cart
        let cartTotal   = req.body.tot
        let token       = req.body.token
        let user = await verify(token);
        if(cart.length > 0  && user!=false){
            datetime = date.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
            let savebilling = await db.insert('billingdetails',{
                "userid"    : user.data[0].id,
                "amount"    : cartTotal,
                "payerid"   : req.body.email,
                "paymentid" : '',
                "mode"      : 'Cash App',
                "paid"      : 0,
                "email"     : req.body.email,
                "datetime"  : datetime
              });  
              
              if(savebilling.insertId!=null || savebilling.insertId!=undefined){
                  cart.forEach( async (element,i) => {
                    let data = await db.query("select * from beats where id=:id AND status=1",{"id":cart[i].id},true,false) 
                    let saveorders = await db.insert('orders',{
                        "userid"    : user.data[0].id,
                        "beatid"    : cart[i].id,
                        "billingid" : savebilling.insertId,
                        "amount"    : cart[i].price,
                        "title"     : data[0].title,
                        "artist"    : data[0].artist,
                        "amount"    : cart[i].price,
                        "beat"      : data[0]['original_beat'+cart[i].type],
                        "datetime"  : datetime
                      });  
                    });

                    let saveReq = await db.insert('cashapp_request',{
                        "user_name"   : req.body.name,
                        "user_email"  : req.body.email,
                        "billingid"   : savebilling.insertId,
                        "price"       : cartTotal,
                        "describtion" : (req.body.desc==undefined)?'':''+req.body.desc,
                        "date_time"   : datetime
                      });  
              }
            res.send({res:true,"msg":"Wait for payment confirmation, we contact you soon."});
        }else{
            res.send({res:false,"msg":"Something went wrong."});
        }
    },
    getsinglegenre: async (req,res)=>{
        if(req.query.id!=''){
            let beats  = await db.query("select description,thumb,id,title,artist,demo_beat,price1 from beats where genre =:id AND status=1",{"id":req.query.id},true);
            let genres = await db.query("SELECT name,description,img FROM `genres` WHERE id =:id AND status=1",{"id":req.query.id},true);
            if(genres.length>0){
                res.send({"res":true,"beats":beats,"genres":genres}) 
            }else{
                res.send({"res":false,"beats":[],"genres":[]}) 
            }
        }else{
            res.send({"res":false,"beats":[],"genres":[]}) 
        }
    },
    save_subscriber: async (req,res)=>{
        let chk = await db.query("select sno from subscribers where email=:email",{"email":striptags(req.body.email)},false,true)
        if(chk.length==0){
            datetime = date.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
            let results = await db.insert('subscribers',{
                "name"       : striptags(req.body.name),
                "email"      : striptags(req.body.email),
                "datetime"   : datetime
            });  
        }
        res.send(true)
    },
    save_ex_ng_req: async (req,res)=>{
        let token       = req.body.token
        let user = await verify(token);
        if(user!=false){
            datetime = date.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
            let saveReq = await db.insert('exclusive_request',{
                "name"        : striptags(req.body.name),
                "ngprice"     : striptags(req.body.price),
                "beatid"      : req.body.beatid,
                "describtion" : striptags(req.body.desc),
                "datetime"    : datetime
              });  
            res.send({res:true,"msg":"Wait for confirmation, we contact you soon."});
        }else{
            res.send({res:false,"msg":"Something went wrong."});
        }
    },
}

async function verify(token) {
    return new Promise(resolve => {
        jwt.verify(token, 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',async function(err, token_data,) {
            if(err){
                console.log(err);
                resolve(false)
            }else{
                resolve(token_data)
            }
        })
    })
}