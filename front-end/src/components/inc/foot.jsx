import { Button , Modal} from 'react-bootstrap';
import React,{ useState } from "react";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const Foot = ()=>{

    const [msg, setmsg] = useState()
    const [errmsg, seterrmsg] = useState()
    const [name, setname] = useState()
    const [email, setemail] = useState()
    const [desc, setdesc] = useState()
    const handleSubmit = (event) =>{
        event.preventDefault();
        if(name=='' || name==undefined){
            seterrmsg('Name is required')
            return false;
        }
        if(email=='' || email==undefined){
            seterrmsg('Email is required')
            return false;
        }
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)==false){
            seterrmsg('Invalid Email')
            return false;
        }
        const data = {
            name        :  name,
            email       :  email,
        }
        axios.post('http://localhost:3001/api/save-subscriber',data)
        .then(res  =>  {
            setmsg("Thanks for subscribe")
            seterrmsg()
            document.getElementById("subsform").reset()
        })
        .catch(err =>   {
            console.log(err);
        })
    }

    

    return (
        <>
        <ToastContainer />
         <div className="ms_footer_wrapper">
                    <div className="ms_footer_logo">
                        <a href="#!"><img src="../../assets/images/logo1.png" alt="" className="footer-logo" /></a>
                    </div>
                    <div className="ms_footer_inner">
                        <div className="row">
                            <div className="col-lg-4 col-md-6">
                                <div className="footer_box">
                                    <h1 className="footer_title">miraculous music station</h1>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor.</p>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6">
                                <div className="footer_box footer_subscribe">
                                    <h1 className="footer_title">subscribe</h1>
                                    <p>Subscribe to our newsletter and get latest updates and offers.</p>
                                    <form onSubmit={handleSubmit} id="subsform">
                                    <div className='alert alert-success mb-5' style={{display:msg===undefined?'none':'block'}}>{msg}</div>
                                    <div className='alert alert-danger mb-5' style={{display:errmsg===undefined?'none':'block'}}>{errmsg}</div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Enter Your Name" onChange={(e)=>{
                                                    setname(e.target.value);
                                                }} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Enter Your Email"  onChange={(e)=>{
                                                    setemail(e.target.value);
                                                }} />
                                        </div>
                                        <div className="form-group">
                                            <button  className="ms_btn" type="submit" >subscribe</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="footer_box footer_contacts">
                                    <h1 className="footer_title">contact us</h1>
                                    <ul className="foo_con_info">
                                        <li>
                                            <div className="foo_con_icon">
                                                <img src="../../assets/images/svg/phone.svg" alt="" />
                                            </div>
                                            <div className="foo_con_data">
                                                <span className="con-title">Call us :</span>
                                                <span>(+1) 123-456-7890, (+1) 1234-4567</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="foo_con_icon">
                                                <img src="../../assets/images/svg/message.svg" alt="" />
                                            </div>
                                            <div className="foo_con_data">
                                                <span className="con-title">email us :</span>
                                                <span><a href="#">demo@mail.com </a>, <a href="#">dummy@mail.com</a></span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="foo_con_icon">
                                                <img src="../../assets/images/svg/add.svg" alt="" />
                                            </div>
                                            <div className="foo_con_data">
                                                <span className="con-title">walk in :</span>
                                                <span>598 Old House Drive, London</span>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="foo_sharing">
                                        <div className="share_title">follow us :</div>
                                        <ul>
                                            <li><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                                            <li><a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
                                            <li><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                                            <li><a href="#"><i className="fa fa-google-plus" aria-hidden="true"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!----Copyright----> */}
                    <div className="col-lg-12">
                        <div className="ms_copyright">
                            <div className="footer_border"></div>
                            <p>Copyright &copy; 2021 <a href="#">Keatkings</a>. All Rights Reserved.</p>
                        </div>
                    </div>
                </div>
               
        </>
    )
}

export default Foot;