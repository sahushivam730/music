import React,{ useState, useEffect, useContext } from "react";
import axios from 'axios';
import {reactLocalStorage} from 'reactjs-localstorage';
import PaypalBtn from './paypalbtn';
import Head from './inc/head';
import { Button , Modal} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import {MusicContext,CartContext} from './MusicContext';
const Cart = () => {

        const [cart, setCart] = useState(reactLocalStorage.getObject('abcd'))
        const [Tot, setTot] = useState(reactLocalStorage.getObject('CartTotal'))
        const [token, settoken] = useState(reactLocalStorage.getObject('token'))
        useEffect(() => {
                let token = reactLocalStorage.getObject('token');
                if(token!=''){
                    axios.get('http://localhost:3001/api/verify2/'+token)
                    .then(res  =>  {
                        if(res.data.res){}else{
                            reactLocalStorage.setObject('token','')
                        }
                    })
                    .catch(err =>   {
                        console.log(err);
                    })
                }
            },[]);
       

        const [empty, setempty] = useState({padding:10})
        const changeType = (id,event) => {
            axios.get('http://localhost:3001/api/updatecart?id='+id+'&type='+event.target.value)
            .then(res  =>  {
                if(res.data.res==true){
                    let price = res.data.price
                    let data = reactLocalStorage.getObject('abcd');
                    let CartTotal = reactLocalStorage.getObject('CartTotal');
                    if(data.length > 0)
                    {
                        for(let i=0;i<data.length;i++){
                            let p1 = data[i].id
                            let p2 = id
                            if(p1 == p2){

                                //update total
                                CartTotal = CartTotal-data[i].price
                                CartTotal = CartTotal+price
                                reactLocalStorage.setObject('CartTotal',CartTotal);
                                setTot(CartTotal)
                                //update total end

                                //update price
                                data[i].price = price
                                data[i].type  = event.target.value
                                
                            }
                        } 
                        reactLocalStorage.setObject('abcd',data);
                        setCart(data)
                    }
                }
            })
            .catch(err =>   {
                console.log(err);
            })
        }
        const [cartCounter,setCartCounter] = useContext(CartContext); // for cart  count
        const removecartitem = (id) => {
            let data = reactLocalStorage.getObject('abcd');
                if(data.length > 0)
                {
                    let data2=[];
                    let CartTotal = 0;
                    for(let i=0;i<data.length;i++){
                        let p1 = data[i].id
                        let p2 = id
                        if(p1 != p2){
                            data2.push(data[i])
                            CartTotal+=data[i].price
                        }
                    } 
                    reactLocalStorage.setObject('abcd',data2);
                    setCart(data2);
                    reactLocalStorage.setObject('CartTotal',CartTotal);
                    setTot(CartTotal)
                    let cart_data = reactLocalStorage.getObject('abcd').length;
                    setCartCounter(cart_data);
                }
        }
       
        const [beatid, setbeatid] = useState(0)
        const [MyModal, setMyModal] = useState(false);
        const [ReqModal, setReqModal] = useState(false);
        const MyModalClose = () => setMyModal(false);
        const MyModalShow = () => setMyModal(true); 
        const ReqModalShow = (id) => {
            setReqModal(true)
            setbeatid(id)
        }
        const ReqModalClose = () => setReqModal(false);
        const [CashApp, setCashApp] = useState()
        const [msg, setmsg] = useState()
        const [serrormsg, setserrormsg] = useState()
        const [name, setname] = useState()
        const [email, setemail] = useState()
        const [desc, setdesc] = useState()
        const handleCashAppSubmit = (event) =>{
            event.preventDefault();
            if(name=='' || name==undefined){
                setserrormsg('Name is required')
                return false;
            }
            if(email=='' || email==undefined){
                setserrormsg('Email is required')
                return false;
            }
            if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)==false){
                setserrormsg('Invalid Email')
                return false;
            }
            const data = {
                name        :  name,
                email       :  email,
                desc        :  desc,
                cart        :  cart,
                tot         :  Tot, 
                token       :  token
            }
            axios.post('http://localhost:3001/api/save-cashapp-req',data)
            .then(res  =>  {
                if(res.data.res==true){
                    setserrormsg()
                    setmsg(res.data.msg)
                    setCashApp()
                    reactLocalStorage.setObject('abcd',[])
                    reactLocalStorage.setObject('CartTotal',0)
                    document.getElementById("CashApp").reset()
                    setCart(reactLocalStorage.getObject('abcd'))
                }else{
                    setserrormsg(res.data.msg)
                    setmsg()
                }
            })
            .catch(err =>   {
                console.log(err);
            })
        }
        // Neg Req
        const [rmsg, setrmsg] = useState()
        const [rerrormsg, setrerrormsg] = useState()
        const [rname, setrname] = useState()
        const [price, setprice] = useState()
        const [rdesc, setrdesc] = useState()
        const handleExReqSubmit = (event) =>{
            event.preventDefault();
            if(rname=='' || rname==undefined){
                setrerrormsg('Name is required')
                return false;
            }
            if(price=='' || price==undefined){
                setrerrormsg('Price is required')
                return false;
            }
            if(rdesc=='' || rdesc==undefined){
                setrerrormsg('Description is required')
                return false;
            }
            const data = {
                name        :  rname,
                price       :  price,
                desc        :  rdesc,
                token       :  token,
                beatid      :   beatid
            }
            axios.post('http://localhost:3001/api/save-ex-ng-req',data)
            .then(res  =>  {
                if(res.data.res==true){
                    document.getElementById("ReqNeg").reset()
                    setrmsg(res.data.msg)
                    setrerrormsg()
                    removecartitem(beatid)
                }else{
                    setrmsg()
                    setrerrormsg(res.data.msg)
                }
            })
            .catch(err =>   {
                console.log(err);
            })
        }

        const [musicList,setMusicList] = useContext(MusicContext);

        const AddInPlaylist = (music)=>{
    
            if(musicList.length === 0)
            {
                setMusicList([
                    {
                        playid:      music.id,
                        cover:       music.thumb,
                        name:        music.title,
                        musicSrc:    music.demo_beat,
                        lyric:       music.genrename,
                        audioLists:  music.artist,
                        currentLyric:music.genrename
                    }]);
            }else{
    
                setMusicList([
                    {
                        playid:      music.id,
                        cover:       music.thumb,
                        name:        music.title,
                        musicSrc:    music.demo_beat,
                        lyric:       music.genrename,
                        audioLists:  music.artist,
                        currentLyric:music.genrename
                    }]);
                }
    
        }

    return (
        <>
            <div className="ms_content_wrapper padder_top80">
                <Head />
                <div className="ms_free_download">
                    <div className="ms_heading">
                        <h1>Cart 

                        {cart.length> 0?
                                <span>({cart.length})</span>
                            :''}
                        </h1>
                    </div>
                    <div className="album_inner_list">
                        <div className="album_list_wrapper">
                            <ul className="album_list_name">
                                <li>#</li>
                                <li>Song Title</li>
                                <li>Artist</li>
                                <li>Type</li>
                                <li className="">Price</li>
                                <li className="">Remove</li>
                            </ul>
                            {cart.length > 0?
                                cart.map( (cartdata,i) =>
                                    <ul className="album_list_name" key={i}>
                                        <li className="cl-f"><span className="play_no">{i+1}</span><span className="play_hover" onClick={() => {AddInPlaylist(cartdata)}}></span></li>
                                        <li className="cl-f"><NavLink to={`beat/${cartdata.id}`}>{cartdata.title}</NavLink></li>
                                        <li className="cl-f">{cartdata.artist}</li>
                                        <li className="cl-f">
                                            <select className='form-control nsselect' name="type" id="type" onChange={ (event) => changeType(cartdata.id,event)}>
                                                {/* {cartdata.type==="1" ?
                                                    <option value="1" selected >{cartdata.type1}</option>
                                                    :<option value="1" >{cartdata.type1}</option>
                                                }
                                                {cartdata.type==="2" ?
                                                    <option value="2" selected >{cartdata.type2}</option>
                                                    :<option value="2">{cartdata.type2}</option>
                                                }
                                                {cartdata.type==="3" ?
                                                    <option value="3" selected >{cartdata.type3}</option>
                                                    :<option value="3">{cartdata.type3}</option>
                                                } */}
                                                 {cartdata.type==="1" ?
                                                    <option value="1" selected >Normal</option>
                                                    :<option value="1" >Normal</option>
                                                }
                                                {cartdata.type==="2" ?
                                                    <option value="2" selected >High</option>
                                                    :<option value="2">High</option>
                                                }
                                                {cartdata.type==="3" ?
                                                    <option value="3" selected >Exclusive</option>
                                                    :<option value="3">Exclusive</option>
                                                }
                                            </select>
                                        </li>
                                        <li className="cl-f">$ {cartdata.price}</li>
                                        <li className="cl-f"><span className="ms_icon1 ms_cross_icon"  onClick={() => {removecartitem(cartdata.id)}} ></span></li>
                                        <li className="cl-f">
                                        {cartdata.type==="3" && token.length > 0?
                                            <button class="ms_btn login_btn " onClick={()=>ReqModalShow(cartdata.id)}><span>Request</span></button>
                                        :''}
                                        </li>
                                    </ul>
                                )
                            :''}
                            <hr />
                            {cart.length > 0?
                                <ul className="album_list_name">
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li className="">Total: </li>
                                    <li className="">${Tot}</li>
                                    <li></li>
                                </ul>
                             :''}

                            <Modal show={ReqModal} onHide={ReqModalClose}>
                                <button type="button" className="close" onClick={ReqModalClose}>
                                        <i className="fa_icon form_close"></i>
                                </button>
                            <Modal.Body>
                                    <div className="ms_register_img">
                                        <img src="assets/images/register_img.png" alt="" className="img-fluid" />
                                    </div>
                                    <form className="ms_register_form" id="ReqNeg" onSubmit={handleExReqSubmit} >
                                        <h2>Reqesut for Negotiation</h2>
                                            <div className="form-group">
                                                <input type="text" placeholder="Enter Your Name" name="name" className="form-control" onChange={(e)=>{
                                                    setrname(e.target.value);
                                                }}  />
                                                <span className="form_icon">
                                                    <i className="fa_icon form-user" aria-hidden="true"></i>
                                                </span>
                                            </div>
                                            <div className="form-group">
                                                <input type="number" placeholder="Enter Negotiation Price($)" name="price" className="form-control" onChange={(e)=>{
                                                    setprice(e.target.value);
                                                }}  />
                                                <span className="form_icon">
                                                    <i className="fa_icon form-user" aria-hidden="true"></i>
                                                </span>
                                            </div>
                                            <div className="form-group">
                                                <textarea placeholder="Enter Description" rows="3" name="desc" className="form-control" onChange={(e)=>{
                                                    setrdesc(e.target.value);
                                                }}></textarea>
                                            </div>
                                            <div className='alert alert-success' style={{display:rmsg===undefined?'none':'block'}}>{rmsg}</div>
                                            <div className='alert alert-danger' style={{display:rerrormsg===undefined?'none':'block'}}>{rerrormsg}</div>
                                            <button type="submit" className="ms_btn" style={{position: "unset"}}>Submit</button>
                                    </form>
                                </Modal.Body>
                            </Modal>
                           
                            <Modal show={MyModal} onHide={MyModalClose}>
                                <button type="button" className="close" onClick={MyModalClose}>
                                        <i className="fa_icon form_close"></i>
                                </button>
                            <Modal.Body>
                                    <div className="ms_register_img">
                                        <img src="assets/images/register_img.png" alt="" className="img-fluid" />
                                    </div>
                                    <form className="ms_register_form" id="CashApp" onSubmit={handleCashAppSubmit} >
                                        <h2>Fill Cash App Details</h2>
                                            <div className="form-group">
                                                <input type="text" placeholder="Enter Your Name" name="name" className="form-control" onChange={(e)=>{
                                                    setname(e.target.value);
                                                }}  />
                                                <span className="form_icon">
                                                    <i className="fa_icon form-user" aria-hidden="true"></i>
                                                </span>
                                            </div>
                                            <div className="form-group">
                                                <input type="email" placeholder="Enter Cash App Email" name="email" className="form-control" onChange={(e)=>{
                                                    setemail(e.target.value);
                                                }} />
                                                <span className="form_icon">
                                                    <i className="fa_icon form-envelope" aria-hidden="true"></i>
                                                </span>
                                            </div>
                                            <div className="form-group">
                                                <textarea placeholder="Enter Description (Optional)" rows="3" name="desc" className="form-control" onChange={(e)=>{
                                                    setdesc(e.target.value);
                                                }}></textarea>
                                            </div>
                                            <div className='alert alert-success' style={{display:msg===undefined?'none':'block'}}>{msg}</div>
                                            <div className='alert alert-danger' style={{display:serrormsg===undefined?'none':'block'}}>{serrormsg}</div>
                                            <button type="submit" className="ms_btn" style={{position: "unset"}}>Submit</button>
                                    </form>
                                </Modal.Body>
                            </Modal>
                            {cart.length == null || cart.length == 0?
                                <ul style={empty}>
                                    <li className="">Cart is Empty</li>
                                </ul>
                            :
                            cart.length > 0 && token.length > 0?
                                <div className="row">
                                    <div className='col-md-2'></div>
                                    <div className='col-md-5 text-right mt-5'>
                                        <PaypalBtn amount={Tot} cart={cart} token={token} />
                                    </div>
                                    <div className='col-md-5'>
                                        <button className="ms_btn play_btn text-right mt-5" onClick={MyModalShow}>CashApp</button>    
                                    </div>   
                                </div>
                            :
                            <p style={{'text-align': 'center','color': '#D73502'}}>Go to login for checkout</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Cart;
