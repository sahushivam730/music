import {reactLocalStorage} from 'reactjs-localstorage';
import { Button , Modal} from 'react-bootstrap';
import React, { useState, useEffect,useContext} from 'react';
import axios from 'axios';
import {MusicSearch , notify,CartContext} from '../MusicContext'; // for music count
import jwt from 'jsonwebtoken';
import validator from 'validator';

const Head = () => {
    
    const [verify, setVerify] = useState(false)
    const [cartCounter,setCartCounter] = useContext(CartContext);// for music count

    useEffect(() => {
        let token = reactLocalStorage.getObject('token');
        if(token!=''){
            jwt.verify(token, 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',async function(err, token_data,) {
                if(err){
                    setVerify(false)
                }else{
                    setVerify(true)
                }
            })
        }
        },[]);  

    // modal signup
    const [SignupModal, setSignupModal] = useState(false);
    const [SignupBtn, setSignupBtn] = useState('Register Now');
    const LoadingBtnShow1 = () => setSignupBtn('Loading...');
    const SignupModalClose = () => setSignupModal(false);
    const SignupModalShow = () => setSignupModal(true);
    // modal login
    const [LoginModal, setLoginModal] = useState(false);
    const [LoginBtn, setLoginBtn] = useState('Login Now');
    const LoadingBtnShow = () => setLoginBtn('Loading...');
    const LoginModalClose = () => setLoginModal(false);
    const LoginModalShow = () => setLoginModal(true);

    const [Signup, setSignup] = useState()
    const [smsg, setsmsg] = useState()
    const [serrormsg, setserrormsg] = useState()
    const [username, setUsername]   = useState()
    const [email, setEmail]         = useState()
    const [password, setPassword]   = useState()
    const [cpassword, setCpassword] = useState()
    const handleSignupSubmit = (event) =>{
        event.preventDefault();
        if(username=='' || username==undefined){
            setserrormsg('Username is required')
            setSignupBtn('Register Now')
            return false;
        }
        if(email=='' || email==undefined){
            setserrormsg('Email is required')
            setSignupBtn('Register Now')
            return false;
        }
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)==false){
            setserrormsg('Invalid Email')
            setSignupBtn('Register Now')
            return false;
        }
        if(password=='' || password==undefined){
            setserrormsg('Password is required')
            setSignupBtn('Register Now')
            return false;
        }
        if(cpassword=='' || cpassword==undefined){
            setserrormsg('Confirm password is required')
            setSignupBtn('Register Now')
            return false;
        }
        if(password!=cpassword){
            setserrormsg("Confirm Password did't match")
            setSignupBtn('Register Now')
            return false;
        }
        
        const data = {username:username,email:email,password:password,cpassword:cpassword}
        
        axios.post('http://localhost:3001/api/signup',data)
        .then(res  =>  {
            if(res.data.status==true){
                setsmsg(res.data.msg)
                setserrormsg()
                setSignup()
                document.getElementById("signupform").reset();
                setSignupBtn('Register Now')
            }else{
                setsmsg()
                setserrormsg(res.data.msg)
                setSignupBtn('Register Now')
            }
        })
        .catch(err =>   {
            console.log(err);
        })
    }

    const [Login, setLogin] = useState()
    const [l_email, l_setEmail]         = useState()
    const [l_password, setl_Password]   = useState()
    const [lmsg, setlmsg] = useState()
    const [lerrormsg, setlerrormsg] = useState()
    const handleLoginSubmit = (event) =>{
        event.preventDefault();
        if(l_email=='' || l_email==undefined){
            setlerrormsg('Email is required')
            setLoginBtn('Login Now');
            return false;
        }
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(l_email)==false){
            setlerrormsg('Invalid Email')
            setLoginBtn('Login Now');
            return false;
        }
        if(l_password=='' || l_password==undefined){
            setlerrormsg('Password is required')
            setLoginBtn('Login Now');
            return false;
        }
        const data = {l_email:l_email,l_password:l_password}
        
        axios.post('http://localhost:3001/api/login',data)
        .then(res  =>  {
            if(res.data.status==true){
                setlmsg(res.data.msg)
                setlerrormsg()
                setLoginBtn('Login Now');
                reactLocalStorage.setObject('token',res.data.token)
                setLogin()
                document.getElementById("loginform").reset();
                window.location.reload()
            }else{
                setLoginBtn('Login Now');
                setlmsg()
                setlerrormsg(res.data.msg)
            }
        })
        .catch(err =>   {
            console.log(err);
        })
    }

    const Signout = ()=>{
        reactLocalStorage.setObject('token','')
        window.location.reload()
    }

    const Rhere = () =>{
        setLoginModal(false)
        setSignupModal(true)
    }
    const Lhere = () =>{
        setSignupModal(false)
        setLoginModal(true)
    }
    
    return (
        <>
            <div className="ms_header">
                <div className="ms_top_left">
                     <div className="ms_top_trend">
                        <span>
                            <a href="#!" className="ms_color"><img src="../../assets/images/logo1.png" alt=""  /></a>
                        </span>
                    </div>
                    <div className='ms_top_search'>
                        <MusicSearch />
                    </div>
                </div>
                <div className="ms_top_right">
                <span className="w_song_time1">
                    <div className="counter">{cartCounter}</div>
                    <i class="fa fa-shopping-bag cart-icon" aria-hidden="true" ></i>
                </span>
                {verify == false ? 
                    <div className="ms_top_btn">

                          <a href="#!" className="ms_btn reg_btn"  onClick={SignupModalShow} ><span> register</span></a>
                        <a href="#!" className="ms_btn login_btn" onClick={LoginModalShow} ><span>login</span></a>
                    </div>
                    :
                    <div className="container py-5 text-right">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-12">
                                <ul className="list-unstyled">
                                    <li className="dropdown ml-2">
                                    <a className="rounded-circle " href="#" role="button" id="dropdownUser"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fa fa-user ixcont"></i>
                                    </a>
                                    <div className="dropdown-menu pb-2" aria-labelledby="dropdownUser">
                                        <div className="dropdown-divider"></div>
                                        <div className="">
                                            <ul className="list-unstyled"></ul>
                                        </div>
                                        <div className="dropdown-divider"></div>
                                        <ul className="list-unstyled">
                                            <li onClick={() => {Signout()}}>
                                                <a className="dropdown-item" href="#!">
                                                <span className="mr-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-power">
                                                        <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                                                        <line x1="12" y1="2" x2="12" y2="12"></line>
                                                    </svg>
                                                </span>
                                                <span>Sign Out</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    }
                </div>
            </div>
            <Modal show={SignupModal} onHide={SignupModalClose}>
                    <button type="button" className="close" onClick={SignupModalClose}>
                            <i className="fa_icon form_close"></i>
                    </button>
                <Modal.Body>
                        <div className="ms_register_img">
                            <img src="http://217.112.95.118:3000/assets/images/register_img.png" alt="" className="img-fluid"/>
                        </div>
                        <form className="ms_register_form" id="signupform" onSubmit={handleSignupSubmit} >
                            <h2>Register / Sign Up</h2>
                                <div className="form-group">
                                    <input type="text" placeholder="Enter Your Name" name="username" className="form-control" onChange={(e)=>{
                                        setUsername(e.target.value);
                                    }} />
                                    <span className="form_icon">
                                <i className="fa_icon form-user" aria-hidden="true"></i>
                                </span>
                                </div>
                                <div className="form-group">
                                    <input type="email" placeholder="Enter Your Email" name="email" className="form-control" onChange={(e)=>{
                                        setEmail(e.target.value);
                                    }} />
                                    <span className="form_icon">
                                <i className="fa_icon form-envelope" aria-hidden="true"></i>
                            </span>
                                </div>
                                <div className="form-group">
                                    <input type="password" placeholder="Enter Password" name="password" id="password" className="form-control" onChange={(e)=>{
                                        setPassword(e.target.value);
                                    }} />
                                    <span className="form_icon">
                            <i className="fa_icon form-lock" aria-hidden="true"></i>
                            </span>
                                </div>
                                <div className="form-group">
                                    <input type="password" placeholder="Confirm Password" name="cpassword" className="form-control" onChange={(e)=>{
                                        setCpassword(e.target.value);
                                    }} />
                                    <span className="form_icon">
                            <i className=" fa_icon form-lock" aria-hidden="true"></i>
                            </span>
                                </div>
                                <div className='alert alert-success' style={{display:smsg===undefined?'none':'block'}}>{smsg}</div>
                                <div className='alert alert-danger' style={{display:serrormsg===undefined?'none':'block'}}>{serrormsg}</div>
                                <button type="submit" className="ms_btn" id="signupbtn" style={{position: "unset"}} onClick={LoadingBtnShow1} >{SignupBtn}</button>
                                <p>Already Have An Account? <a href="#myModal1" data-toggle="modal" className="ms_modal hideCurrentModel" onClick={Lhere} >login here</a></p>
                        </form>
                    
                </Modal.Body>
            </Modal>

            <Modal show={LoginModal} onHide={LoginModalClose}>
                    <button type="button" className="close" onClick={LoginModalClose}>
                            <i className="fa_icon form_close"></i>
                    </button>
                <Modal.Body>
                    <div className="ms_register_img">
                        <img src="http://217.112.95.118:3000/assets/images/register_img.png" alt="" className="img-fluid" />
                    </div>
                    {/* <form className="ms_register_form" id="loginform"  onSubmit={handleLoginSubmit}> */}
                    <form className="ms_register_form" id="loginform" onSubmit={handleLoginSubmit}>
                        <h2>login / Sign in</h2>
                            <div className="form-group">
                                <input type="text" placeholder="Enter Your Email" name="l_email" className="form-control" onChange={(e)=>{
                                        l_setEmail(e.target.value);
                                    }} />
                                <span className="form_icon">
                            <i className="fa_icon form-envelope" aria-hidden="true"></i>
                        </span>
                            </div>
                            <div className="form-group">
                                <input type="password" placeholder="Enter Password" name="l_password" className="form-control" onChange={(e)=>{
                                        setl_Password(e.target.value);
                                    }} />
                                <span className="form_icon">
                        <i className="fa_icon form-lock" aria-hidden="true"></i>
                        </span>
                            </div>
                            <div className="remember_checkbox">
                                {/* <label>Keep me signed in
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                        </label> */}
                            </div>
                            <div className='alert alert-success' style={{display:lmsg===undefined?'none':'block'}}>{lmsg}</div>
                            <div className='alert alert-danger' style={{display:lerrormsg===undefined?'none':'block'}}>{lerrormsg}</div>
                            <button type="submit" className="ms_btn" id="loginbtn" style={{position: "unset"}} onClick={LoadingBtnShow} >{LoginBtn}</button>
                            <div className="popup_forgot">
                                <a href="#!">Forgot Password ?</a>
                            </div>
                            <p>Don't Have An Account? <a href="#myModal" data-toggle="modal" className="ms_modal1 hideCurrentModel" onClick={Rhere}>register here</a></p>
                    </form>
                </Modal.Body>
            </Modal>
            {/* <!---Recently Searches Music---> */}
        </>
    );
}
export default Head;

