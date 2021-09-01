import React, { useState, useEffect,useContext} from 'react';
import axios from 'axios';
import {MusicContext,notify,CartContext} from './MusicContext';
import { NavLink } from 'react-router-dom';
import Head from './inc/head';
import {reactLocalStorage} from 'reactjs-localstorage';
const ExclusiveBeats = () => {

    
    const [ExclusiveBeatsData, setExclusiveBeats] = useState([]);

    useEffect(() => {
            axios.get('http://localhost:3001/api/fetured-beats/')
            .then(res  =>  {
                console.log(res.data);
                if(res.data.res){
                    setExclusiveBeats(res.data.data)
                }
            })
            .catch(err =>   {
                console.log(err);
            });
        },[]);

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


    return  (
        <>
        <div className="ms_content_wrapper padder_top80" >
            {/* <!---Header---> */}
                <Head />
            {/* <!----Top Artist Section----> */}
            <div className="ms_top_artist">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ms_heading">
                                <h1>Fetured Beats</h1>
                            </div>
                        </div>
                        {/* {console.log(ExclusiveBeatsData.length),ExclusiveBeatsData.length > 0 &&    */}
                        {/* { ExclusiveBeatsData.map( (data,i) => */}

                        {ExclusiveBeatsData.map( (ExclusiveBeat,i) =>
                        
                        <div className="col-lg-2 col-md-6">
                            <div className="ms_rcnt_box marger_bottom30">
                                <div className="ms_rcnt_box_img">
                                    <img src={ExclusiveBeat.thumb} alt={ExclusiveBeat.title} className="img-fluid" />
                                    <div className="ms_main_overlay">
                                        <div className="ms_box_overlay"></div>
                                        <div className="ms_more_icon">
                                            <img src="../../assets/images/svg/more.svg" alt="" />
                                        </div>
                                        <ul className="more_option">
                                        <li><a href="#!" onClick={() => {addtofav(ExclusiveBeat.id)}} ><span className="opt_icon"><span className="icon icon_fav"></span></span>Add To Favourites</a></li>
                                        <li><a href="#!"><span className="opt_icon"><span className="icon icon_share"></span></span>Share</a></li>
                                        </ul>
                                        <div className="ms_play_icon"  onClick={()=>{AddInPlaylist(ExclusiveBeat)}}  >
                                            <img src="../../assets/images/svg/play.svg" alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="ms_rcnt_box_text">
                                    
                                    <h3><NavLink to={`beat/${ExclusiveBeat.id}`}>{ExclusiveBeat.title}</NavLink>
                                    <span className="w_song_time" style={{float:'right'}}>
                                            <i class="fa fa-shopping-bag cart-icon" aria-hidden="true" onClick={() => {addtocart(ExclusiveBeat.id)}} ></i>
                                        </span>
                                    </h3>
                                    <span>${ExclusiveBeat.price1}</span>
                                    
                                </div>
                            </div>
                        </div>

                        )}

                        
                    </div>
                </div>
            </div>
        </div>
        </>

    )
}
export default ExclusiveBeats;