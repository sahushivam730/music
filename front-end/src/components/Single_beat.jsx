import React, { useState, useEffect,useContext} from 'react';
import {MusicContext,notify} from './MusicContext';
import axios from 'axios';
import {reactLocalStorage} from 'reactjs-localstorage';
import Head from './inc/head';
import { NavLink } from 'react-router-dom';
// get similer beats
// get single beats

const Single_beat = (props) => {
       
    const [musicList,setMusicList]      = useContext(MusicContext);
    const [slingleBeat, setSlingleBeat] = useState([]);
    const [relatedBeat, setRelatedBeat] = useState([]);



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

    // props.match.params.id

    // console.log(props.match.params.id);

    useEffect(() => {
        axios.get('http://localhost:3001/api/getproduct?id='+props.match.params.id)
            .then(res  =>  {
                if(res.data.res===true){ 
                    // console.log(res.data.product)
                    setSlingleBeat(res.data.product); }
                else{ console.log('No Music Found') }
            })
            .catch(err =>   {
                console.log(err);
            })

            axios.get('http://localhost:3001/api/getrelatedproduct?id='+props.match.params.id)
            .then(res  =>  {
                if(res.data.res===true){ 
                    setRelatedBeat(res.data.products); }
                else{ console.log('No Music Found') }
            })
            .catch(err =>   {
                console.log(err);
            })

        },[]);

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
        const [empty, setempty] = useState({padding:10})
    return (
        <>
         <div className="ms_content_wrapper padder_top80" >
            {/* <!---Header---> */}
            <Head />
             {/* <!----Free Download Css Start----> */}
             {/* <!----Album Single Section Start----> */}
            <div className="ms_album_single_wrapper">
                 
                
                <div className="album_single_data">
                    <div className="album_single_img">
                        <img src={slingleBeat.thumb} alt={slingleBeat.title} className="img-fluid" />
                    </div>
                    <div className="album_single_text">
                        <h2>{slingleBeat.title} <span className="sgp">Price - ${slingleBeat.price}</span></h2>
                        <p className="singer_name">By - {slingleBeat.artist}</p>
                        <p className="singer_name">Genre - {slingleBeat.genre}</p>
                        <div className="album_feature">
                            <a href="#" className="album_date">{slingleBeat.description}</a>
                            {/* <a href="#" className="album_date">Released March 23, 2018  | Abc Music Company</a> */}
                        </div>
                        <div className="album_btn">
                            <a href="#" className="ms_btn play_btn" onClick={() => {AddInPlaylist(slingleBeat)}} ><span className="play_all" ><img src="../../assets/images/svg/play_all.svg" alt="" />Play</span><span className="pause_all"><img src="../../assets/images/svg/pause_all.svg" alt="" />Pause</span></a>
                            <a href="#" className="ms_btn play_btn" onClick={() => {addtocart(props.match.params.id)}} ><i class="fa fa-shopping-bag" aria-hidden="true" ></i>  Add to Cart</a>
                            {/* <a href="#" className="ms_btn"><span className="play_all"><img src="../../assets/images/svg/add_q.svg" alt="" />Add To Queue</span></a> */}
                        </div>
                    </div>
                </div>
            
            {/* <!----Song List----> */}
			<div className="album_inner_list">
				<div className="album_list_wrapper">
                        <div className=" row col-lg-12">
                            <div className="ms_heading">
                                <h1>Related Beats</h1>
                            </div>
                        </div>
					<ul className="album_list_name">
						<li>#</li>
						<li>Song Title</li>
						<li>Artist</li>
						<li className="text-center">Price</li>
						<li className="text-center">More</li>
					</ul>
                    {relatedBeat.map( (beat,i) =>
					<ul>
						<li><a href="#"><span className="play_no">{i+1}</span><span className="play_hover" onClick={() => {AddInPlaylist(beat)}}></span></a></li>
						<li><a href="#"><NavLink to={`${beat.id}`}>{beat.title}</NavLink></a></li>
						<li><a href="#">{beat.artist}</a></li>
						<li className="text-center"><a href="#">${beat.price1}</a></li>
						<li className="text-center ms_more_icon"><a href="#!"><span className="ms_icon1 ms_active_icon"></span></a>
							<ul className="more_option">
                                <li><a href="#!"  onClick={() => {addtofav(beat.id)}} ><span className="opt_icon"><span className="icon icon_fav"></span></span>Add To Favourites</a></li>
                                <li><a href="#!"><span className="opt_icon"><span className="icon icon_share"></span></span>Share</a></li>
							</ul>
						</li>
					</ul>
                    )}
                    {relatedBeat.length == null || relatedBeat.length == 0?
                                <ul style={empty}>
                                    <li className="">No Beats Found</li>
                                </ul>
                            :''}
				</div>
			</div>
        </div>
            
        </div>
        </>
    )
}
export default Single_beat;
