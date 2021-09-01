import ReactDOM from 'react-dom';
import { Link,NavLink  } from "react-router-dom";
import React,{ useState, useEffect } from "react";
import jwt from 'jsonwebtoken';
import {reactLocalStorage} from 'reactjs-localstorage';
const Side_bar = () => {
    
    const [verify, setVerify] = useState(false)
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

    return (
        <>
        <div className="ms_sidemenu_wrapper">
            
            <div className="ms_nav_close">
                <i className="fa fa-angle-right" aria-hidden="true"></i>
            </div>
            <div className="ms_sidemenu_inner">
                <div className="ms_logo_inner">
                    <div className="ms_logo">
                        <a href="#!"><img src="../../assets/images/logo.png" alt="" className="img-fluid" /></a>
                    </div>
                    <div className="ms_logo_open">
                        <a href="#!"><img src="../../assets/images/logo3.png" alt="" className="img-fluid" /></a>
                    </div>
                </div>
                <div className="ms_nav_wrapper">

                    <ul>
                        <li>
                            <NavLink  ClassName="active" to="/"  title="Home" exact  >
                                <span className="nav_icon">
                                    <span className="icon icon_discover"></span>
                                </span>
                                <span className="nav_text">
                                    home
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink  activeClassName="active" to="/exclusive-beats" title="exclusive-beats" exact >
                                <span className="nav_icon">
                                    <span className="icon icon_albums"></span>
                                </span>
                                <span className="nav_text">
                                    Exclusive Beats
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink  activeClassName="active" to="/cart" title="cart" exact >
                                <span className="nav_icon">
                                    <span className="icon icon_purchased"></span>
                                </span>
                                <span className="nav_text">
                                    Cart
                                </span>
                            </NavLink>
                        </li>

                    </ul>
                    {verify == true ? 

                    <ul className="nav_downloads">
                        <li>
                        {/* <Route path="/purchased"> */}
                            <NavLink to="/purchased" activeClassName="active" title="Purchased" exact>
                                <span className="nav_icon">
                                    <span className="icon icon_download"></span>
                                </span>
                                <span className="nav_text">
                                    purchased
                                </span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/favorite" activeClassName="active" title="Favourites">
                                <span className="nav_icon">
                                    <span className="icon icon_favourite"></span>
                                </span>
                                <span className="nav_text">
                                    favourites
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/transactions" activeClassName="active" title="Transaction">
                                <span className="nav_icon">
                                    <span className="icon icon_transaction"></span>
                                </span>
                                <span className="nav_text">
                                    Transactions
                                </span>
                            </NavLink>
                        </li>

                      
                    </ul>
                    :''}
                </div>
            </div>
        </div>
        </>
    )

}
export default Side_bar;