var date = require("date-and-time");
var fs = require("fs");
var moment = require("moment");
module.exports = {
    login: async (req,res)=>{
      let loginmsg = req.flash('failed')
      res.render('../views/admin/login',{"loginmsg":loginmsg})
    },
    login_post: async (req,res)=>{
      try {
        let data = await db.query("select * from admin where username=:username",{"username":req.body.username},true)
            if(data.length > 0){
                let plain_pwd = req.body.password
                let hash_pwd = data[0].password
                fun.comparePassword(plain_pwd,hash_pwd,function(err,isMathch){
                    if(isMathch == true){
                        req.session.DATA = data
                        res.redirect(base_url+'admin/dashboard')
                    }else{
                        req.flash('failed', 'incorrect username or password!');
                        res.redirect(base_url+'admin/login')
                    }   
                })
            }else{
                 req.flash('failed', 'incorrect username or password!');
                 res.redirect(base_url+'admin/login')
            }
 
         
       } catch (error) {
           console.log(error);
       }
    },
    logout: async (req,res)=>{
        try {
            req.session.destroy();
            console.log("logout successfull!");
            res.redirect(base_url+"admin/login")
        } catch (error) {
            console.log(error);
        }
    },
    // dashboard: async (req,res)=>{
    //   res.render('../views/admin/dashboard')
    // },
    genres: async (req,res)=>{
      let genres = await db.query("select * from genres ORDER BY id DESC",false,true)
      let failedmsg = req.flash('failed')
      let successmsg = req.flash('success')
      res.render('../views/admin/genres',{"genres":genres,"failedmsg":failedmsg,"successmsg":successmsg})
    },
    save_genre: async (req,res)=>{
      try {
        let datetime=date.format(new Date(), 'YYYY-MM-DD H:m:s');
        let genres_name = req.body.genre_name
        let check = await db.query("select * from genres where name LIKE :name",{"name":"%"+genres_name+"%"},true)
        if(check.length>0){
          req.flash('failed', 'genre already exist.');
          res.redirect(base_url+'admin/genres')
        }else{
          var save_path = base_url+'admin/assets/images/default-genre.jpg'
          if(req.body.genre_img != ''){
     
              var dir_path = 'views/admin/uploads/genres';
              var img = req.body.genre_img
              img = new Buffer.from( img.split(',')[1], 'base64');
              var filename = 'genre'+ Date.now() +'.png';
              fs.writeFileSync(dir_path+'/'+filename, img)
              save_path = base_url+'admin/uploads/genres/'+filename;
          }
          let insert = await db.insert("genres",{
            "name"        :   genres_name,
            "description" :   req.body.description,
            "img"         :   save_path,
            "status"      :   1,
            "datetime"    :   datetime
          })
          req.flash('success', 'genre saved successfully.');
          res.redirect(base_url+'admin/genres')
        }
      } catch (error) {
        console.log(error);
      }
    },
    enable_disable_status: async (req,res)=>{
      try {
        let update = await db.query("update genres set status=:status where id=:id",{"id":req.query.id,"status":req.query.status},true)
        res.json({
          "res":true
        })
      } catch (error) {
        console.log(error);
      }
    },
    beats: async (req,res)=>{
      let genres = await db.query("select id,name from genres where status=1 ORDER BY id DESC",false,true)
      let beats = await db.query("select *,(SELECT name from genres where id=beats.genre) as genrename from beats ORDER BY id DESC",false,true)
      let failedmsg = req.flash('failed')
      let successmsg = req.flash('success')
      res.render('../views/admin/beats',{"beats":beats,"genres":genres,"failedmsg":failedmsg,"successmsg":successmsg})
    },
    save_beat: async (req,res)=>{
      try {
          let datetime=date.format(new Date(), 'YYYY-MM-DD H:m:s');
          var save_path = base_url+'admin/assets/images/r_music4.jpg';
          if(req.body.genre_img != ''){
     
              var dir_path = 'views/admin/uploads/beat-covers';
              var img = req.body.genre_img
              img = new Buffer.from( img.split(',')[1], 'base64');
              var filename = 'beat-cover-image'+ Date.now() +'.png';
              fs.writeFileSync(dir_path+'/'+filename, img)
              save_path = base_url+'admin/uploads/beat-covers/'+filename;
          }
          var save_path2 = ''
          if(req.body.demobeatdata != ''){
              var type = req.body.demobeattype.split('/')
              type = type[1]
              type = (type=='mpeg')?'mp3':''+type
              var dir_path = 'views/admin/uploads/beats';
              var img = req.body.demobeatdata
              img = new Buffer.from( img.split(',')[1], 'base64');
              var filename = 'demobeat'+ Date.now() +'.'+type;
              fs.writeFileSync(dir_path+'/'+filename, img)
              save_path2 = base_url+'admin/uploads/beats/'+filename;
          }
          var save_path3 = ''
          if(req.body.orgbeatdata != ''){
              var type = req.body.orgbeattype.split('/')
              type = type[1]
              type = (type=='mpeg')?'mp3':''+type
              var dir_path = 'views/admin/uploads/beats';
              var img = req.body.orgbeatdata
              img = new Buffer.from( img.split(',')[1], 'base64');
              var filename = 'originalbeat'+ Date.now() +'.'+type;
              fs.writeFileSync(dir_path+'/'+filename, img)
              save_path3 = base_url+'admin/uploads/beats/'+filename;
          }
          var save_path4 = ''
          if(req.body.orgbeatdata2 != ''){
              var type = req.body.orgbeattype2.split('/')
              type = type[1]
              type = (type=='mpeg')?'mp3':''+type
              var dir_path = 'views/admin/uploads/beats';
              var img = req.body.orgbeatdata2
              img = new Buffer.from( img.split(',')[1], 'base64');
              var filename = 'originalbeat'+ Date.now() +'.'+type;
              fs.writeFileSync(dir_path+'/'+filename, img)
              save_path4 = base_url+'admin/uploads/beats/'+filename;
          }
          var save_path5 = ''
          if(req.body.orgbeatdata3 != ''){
              var type = req.body.orgbeattype3.split('/')
              type = type[1]
              type = (type=='mpeg')?'mp3':''+type
              var dir_path = 'views/admin/uploads/beats';
              var img = req.body.orgbeatdata3
              img = new Buffer.from( img.split(',')[1], 'base64');
              var filename = 'originalbeat'+ Date.now() +'.'+type;
              fs.writeFileSync(dir_path+'/'+filename, img)
              save_path5 = base_url+'admin/uploads/beats/'+filename;
          }
          let featured  = (req.body.featured==undefined)?0:''+req.body.featured
          let exclusive = (req.body.exclusive==undefined)?0:''+req.body.exclusive
          let insert = await db.insert("beats",{
            "title"       :   req.body.title,
            "genre"       :   req.body.genre,
            "description" :   req.body.description,
            "artist"      :   req.body.artist,
            "thumb"       :   save_path,
            "demo_beat"   :   save_path2,
            "original_beat1" : save_path3,
            "price1"      : req.body.price1,
            "original_beat2" : save_path4,
            "price2"      : req.body.price2,
            "original_beat3" : save_path5,
            "price3"      : req.body.price3,
            "featured"        :   featured,
            "exclusive"        :   exclusive,
            "datetime"    :   datetime
          })
          req.flash('success', 'beats saved successfully.');
          res.redirect(base_url+'admin/beats')
      } catch (error) {
        console.log(error);
      }
    },
    beat_enable_disable_status: async (req,res)=>{
      try {
        let update = await db.query("update beats set status=:status where id=:id",{"id":req.query.id,"status":req.query.status},true)
        res.json({
          "res":true
        })
      } catch (error) {
        console.log(error);
      }
    },
    // cashapp: async (req,res)=>{
    //   res.render('../views/admin/cashapp')
    // },
   
    dashboard: async (req,res)=>{
      const now = new Date();
      const last_month = moment(now).subtract(1, 'months').endOf('month').format('YYYYMMDD');
      let genres                          = await db.query("select COUNT(id) AS total_genres from genres",false,true)
      let users                           = await db.query("select COUNT(id) AS total_users from users",false,true)
      let cashapp_request                 = await db.query("select COUNT(*) AS tot from cashapp_request where status=1",false,true)
      let billingdetails                  = await db.query("select COUNT(*) AS tot from billingdetails where paid='true'",false,true)
      let cashapp                         = await db.query("select COUNT(id) AS total_cashapp from cashapp_request  where status = 0",false,true)
      let cashapp_payment                 = await db.query("select SUM(price) AS total_price from cashapp_request where status = 1",false,true)
      let paypal_payment                  = await db.query("select SUM(amount) AS total_amount from billingdetails where mode='paypal' AND paid=1",false,true)
      let current_month_amount_paypal     = await db.query("select sum(amount) AS total_month_amount from billingdetails where MONTH(datetime)=MONTH(curdate()) AND paid=1",false,true)
      // let current_month_amount_cashapp    = await db.query("select sum(price) AS total_month_amount from cashapp_request where MONTH(date_time)=MONTH(curdate()) AND status=1",false,true)
      let last_month_amount_paypal        = await db.query("select sum(amount) AS total_month_amount from billingdetails where MONTH(datetime)=MONTH("+last_month+")  AND paid=1",false,true)
      // let last_month_amount_cashapp       = await db.query("select sum(price) AS total_month_amount from cashapp_request where MONTH(date_time)=MONTH("+last_month+") AND status=1",false,true)
      let total_genres              = (genres[0].total_genres);
      let total_users               = (users[0].total_users);
      let total_cashapp             = (cashapp[0].total_cashapp);
      
      // console.log(cashapp_payment[0].total_price!="null");

      let total_cashapp_amount      = (!cashapp_payment[0].total_price)?0:cashapp_payment[0].total_price;
      let total_paypal_amount       = (!paypal_payment[0].total_amount)?0:paypal_payment[0].total_amount;

      console.log("Cash App Amount="+total_cashapp_amount);
      console.log("Paypal  Amount="+total_paypal_amount);

      let total_downloads           = parseInt(cashapp_request[0].tot) + parseInt(billingdetails[0].tot)
      let total                     = parseInt(total_cashapp_amount)+parseInt(total_paypal_amount)
      // let total_current_mont_amount = (current_month_amount_paypal[0].total_month_amount+current_month_amount_cashapp[0].total_month_amount)
      let total_current_mont_amount = current_month_amount_paypal[0].total_month_amount
      let total_last_mont_amount    = (last_month_amount_paypal[0].total_month_amount==null)?0:''+last_month_amount_paypal[0].total_month_amount
      // console.log("Currenct" +total_current_mont_amount);
      // let beats = await db.query("select *,(SELECT name from genres where id=beats.genre) as genrename from beats ORDER BY id DESC",false,true)
      // let failedmsg = req.flash('failed')  
      // let successmsg = req.flash('success')
      res.render('../views/admin/dashboard',{"total_genres":total_genres, "total_users":total_users, "total_cashapp" : total_cashapp, 
      "total_cashapp_amount":total_cashapp_amount, "total_paypal_amount":total_paypal_amount, "total_current_mont_amount":total_current_mont_amount,'total_last_mont_amount':total_last_mont_amount,"total":total,"total_downloads":total_downloads})

    },
    cashapp: async (req,res)=>{
      let cashapp_request = await db.query("select * from cashapp_request where status = 0 ORDER BY id DESC",false,true)
      let cashapp_completed = await db.query("select COUNT(*) as tot from cashapp_request where status = 1 ORDER BY id DESC",false,true)
      res.render('../views/admin/cashapp',{"cashapp_request":cashapp_request,"cashapp_completed":cashapp_completed[0].tot})
    },
    cashapp_completed: async (req,res)=>{
      let cashapp_completed = await db.query("select * from cashapp_request where status = 1 ORDER BY id DESC",false,true)
      let cashapp_request = await db.query("select COUNT(*) as tot from cashapp_request where status = 0 ORDER BY id DESC",false,true)
      res.render('../views/admin/cashapp_completed',{"cashapp_completed":cashapp_completed,"cashapp_request":cashapp_request[0].tot})
    },
    changecashappstatus: async (req,res)=>{
      try {
        let update = await db.query("update cashapp_request set status= 1 where id=:id",{"id":req.query.id},true)
        let cashapp_request = await db.query("select * from cashapp_request where id=:id",{"id":req.query.id},true)
        if(cashapp_request.length>0){
          let update = await db.query("update billingdetails set paid= true  where id=:billingid",{"billingid":cashapp_request[0].billingid},true)
          let sadad = await db.query("update orders set status= 1  where billingid=:billingid",{"billingid":cashapp_request[0].billingid},true)
        }
        res.json({
          "res":true
        })
      } catch (error) {
        console.log(error);
      }
    },
    paypal: async (req,res)=>{
      let paypal_transactions = await db.query("select * from billingdetails ORDER BY id DESC",false,true)
      let userid = (paypal_transactions[0].userid);
      let name = await db.query("select username from users where id=" +userid,true)
      let username = (name[0].username)
      res.render('../views/admin/paypal',{"paypal_transactions":paypal_transactions, "username":username})
    },
    exclusive_request: async (req,res)=>{
      res.render('../views/admin/exclusive_request')
    },
}