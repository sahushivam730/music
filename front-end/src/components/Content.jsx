// import React,{ useState, useEffect } from "react";
import React, { useState, useEffect,useContext} from 'react';

import axios from 'axios';
import GenresSlider from './GenresSlider';
import NewReleaseSlider from './NewReleaseSlider';
import FeturedBeatsSlider from './FeturedBeatsSlider'
import 'react-jinke-music-player/assets/index.css'
import {reactLocalStorage} from 'reactjs-localstorage';
import Head from './inc/head';
import {MusicContext,CartContext} from './MusicContext';
import {notify} from './MusicContext';
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert';
import {
    BrowserRouter as Router,
    Link,
    useLocation
  } from "react-router-dom";
const Content = (props) => {
    let query = useQuery();
    useEffect(() => {
            let token = query.get("token")
            if(token!=null){
                    axios.get('http://localhost:3001/api/verify?token='+token)
                    .then(res  =>  {
                        if(res.data.status==true){
                            swal("Email Verified!", "Go to Login!", "success").then(() => {
                                let url = 'http://'+window.location.host 
                                window.location.href = url
                              });;
                        }else{
                            swal("Link Expired!", "Go to Login and generate link again!", "error").then(() => {
                                let url = 'http://'+window.location.host 
                                window.location.href = url
                              });
                        }
                    })
                    .catch(err =>   {
                        console.log(err);
                    })
            }
        },[]);

    const [exclusivebeats, setExclusivebeats] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3001/api/exclusive-beats')
            .then(res  =>  {
                setExclusivebeats(res.data.data)
            })
            .catch(err =>   {
                console.log(err);
            })
        },[]);


        const [pp, setpp] = useState({isPlaying: false})

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
        const [cartCounter,setCartCounter] = useContext(CartContext); // for cart  count
        const addtocart = (id) => {
            axios.get('http://localhost:3001/api/getproduct?id='+id)
            .then(res  =>  {
                let data = reactLocalStorage.getObject('abcd');
                let CartTotal = reactLocalStorage.getObject('CartTotal');
                if(data.length > 0)
                {
                    let flag=1;
                    for(let i=0;i<data.length;i++){
                        let p1 = data[i].id                     
                        let p2 = res.data.product.id
                        if(p1 == p2){
                            flag=0
                            break;
                        }
                    } 
                    if(flag==1){
                        data.push(res.data.product);
                        reactLocalStorage.setObject('abcd',data);
                        CartTotal+=res.data.product.price
                        reactLocalStorage.setObject('CartTotal',CartTotal);
                        notify('success','Beat has added in cart')
                    }else{
                        notify('error','Already in cart')
                    }
                }else{
                    reactLocalStorage.setObject('abcd',[res.data.product]);
                    reactLocalStorage.setObject('CartTotal',res.data.product.price);
                    notify('success','Beat has added in cart')
                }
                let cart_data = reactLocalStorage.getObject('abcd').length;
                setCartCounter(cart_data);
            })
            .catch(err =>   {
                console.log(err);
            })
        }

        const addtofav = (id) => {
            let token = reactLocalStorage.getObject('token');
            if(token!=''){
                axios.get('http://localhost:3001/api/addtofav/'+token+'/'+id)
                .then(res  =>  {
                    notify('success','Beat has added in favorites')
                })
                .catch(err =>   {
                    console.log(err);
                })
            }else{
                notify('warning','go to Login')
            }
        }
      
          

    return (
        <>
        
        <div className="ms_content_wrapper" >
            <Head />

            <div className="ms_rcnt_slider">
                <div className="ms_heading">
                    <h1>Top Genres</h1>
                    <span className="veiw_all"><NavLink to={`genres`}>view more</NavLink></span>
                </div>
                <GenresSlider/>
            </div>

            
               
            <div className="ms_releases_wrapper">
                <div className="ms_heading">
                    <h1>New Releases</h1>
                    <span className="veiw_all"><NavLink to={`new-releases-beats`}>view more</NavLink></span>
                </div>
                <NewReleaseSlider/>
                {/* <!-- Add Arrows --> */}
                {/* <div className="swiper-button-next2 slider_nav_next"></div>
                <div className="swiper-button-prev2 slider_nav_prev"></div> */}
            </div>
            {/* <!---Featured Artists Music---> */}
            <div className="ms_featured_slider">
                <div className="ms_heading">
                    <h1>Featured Beats</h1>
                    <span className="veiw_all"><NavLink to={`fetured-beats`}>view more</NavLink></span>
                </div>
                <FeturedBeatsSlider/>
                {/* <!-- Add Arrows --> */}
                {/* <div className="swiper-button-next1 slider_nav_next"></div>
                <div className="swiper-button-prev1 slider_nav_prev"></div> */}
            </div>
            {/* <!---Weekly Top 15---> */}
            <div className="ms_weekly_wrapper">
                <div className="ms_weekly_inner">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ms_heading">
                                <h1>Exclusive beats</h1>
                                <span className="veiw_all"><NavLink to={`exclusive-beats`}>view more</NavLink></span>
                            </div>
                        </div>
                        {exclusivebeats.map( (exbeats,i) =>
                            <div className="col-lg-4 col-md-12 padding_right40" key={i}>
                                <div className="ms_weekly_box">
                                    <div className="weekly_left">
                                        <div className="w_top_song">
                                            <div className="w_tp_song_img">
                                                <img src={exbeats.thumb} alt="" className="img-fluid"  />
                                                <div className="ms_song_overlay">
                                                </div>
                                                <div className="ms_play_icon" onClick={() => {AddInPlaylist(exbeats)}}>
                                                    <img src="../../assets/images/svg/play.svg" alt="" />
                                                </div>
                                            </div>
                                            <div className="w_tp_song_name">
                                                <h3><NavLink to={`beat/${exbeats.id}`}>{exbeats.title}</NavLink></h3>
                                                <p>{exbeats.artist}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <span className="w_top_no">
                                        $100
                                    </span> */}

                                    <div className="weekly_right">
                                        <span className="w_song_time">
                                            <i class="fa fa-shopping-bag cart-icon" aria-hidden="true" onClick={() => {addtocart(exbeats.id)}} ></i>
                                        </span>
                                        <span className="ms_more_icon" data-other="1">
                                            <img src="../../assets/images/svg/more.svg" alt="" />
                                        </span>
                                    </div>
                                    <ul className="more_option">
                                        <li><a href="#!"  onClick={() => {addtofav(exbeats.id)}} ><span className="opt_icon"><span className="icon icon_fav"></span></span>Add To Favourites</a></li>
                                        {/* <li><a href="#!"  onClick={() => {addtocart(exbeats.id)}} ><span className="opt_icon"><span className="icon icon_cart"></span></span>Add To cart</a></li> */}
                                        <li><a href="#!"><span className="opt_icon"><span className="icon icon_share"></span></span>Share</a></li>
                                    </ul>
                                </div>
                                <div className="ms_divider"></div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Content;

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }