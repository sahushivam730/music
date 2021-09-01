// import React, { useState, useEffect } from 'react';
import React, { useState, useEffect,useContext} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {MusicContext,notify,CartContext} from './MusicContext';
import {reactLocalStorage} from 'reactjs-localstorage';

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };
  
const Slider = ()=>{
    const [count, setCount] = useState(0);


    const Demo = ()=>{
        return (
            setCount(count + 1)
        )
    }

    const [feturedbeats, setFeturedbeats] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3001/api/fetured-beats')
            .then(res  =>  {
                setFeturedbeats(res.data.data)
            })
            .catch(err =>   {
                console.log(err);
            })
        },[]);
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

        const [musicList,setMusicList] = useContext(MusicContext);

        const AddInPlaylist = (music)=>{
            
            // console.log(music);

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
        <div className="swiper-container " >

        
            <Carousel
                swipeable={true}
                draggable={true}
                showDots={false}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={false}
                autoPlaySpeed={1000}
                keyBoardControl={true}
                customTransition="all .4"
                transitionDuration={500}
                containerClass="swiper-wrapper"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="swiper-slide pr-5"
                >
                    {feturedbeats.map((beats,i) =>(
                        <div className="ms_rcnt_box" key={i}>
                            <div className="ms_rcnt_box_img">
                                <img src={beats.thumb} alt=""  />
                                <div className="ms_main_overlay">
                                    <div className="ms_box_overlay"></div>
                                    <div className="ms_more_icon">
                                        <img src="../../assets/images/svg/more.svg" alt="" />
                                    </div>
                                    <ul className="more_option">
                                        <li><a href="#!" onClick={() => {addtofav(beats.id)}} ><span className="opt_icon"><span className="icon icon_fav"></span></span>Add To Favourites</a></li>
                                        <li><a href="#!"><span className="opt_icon"><span className="icon icon_share"></span></span>Share</a></li>
                                    </ul>
                                    <div className="ms_play_icon" onClick={()=>{AddInPlaylist(beats)}} >
                                        <img src="../../assets/images/svg/play.svg" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="ms_rcnt_box_text">
                                <h3><NavLink to={`beat/${beats.id}`}>{beats.title}</NavLink> 
                                <span className="w_song_time" style={{float:'right'}}>
                                            <i class="fa fa-shopping-bag cart-icon" aria-hidden="true" onClick={() => {addtocart(beats.id)}} ></i>
                                        </span>
                                </h3>
                            </div>
                        </div>
                    ))}
            </Carousel>
            </div>
            
        </>
    )

}
export default  Slider;
