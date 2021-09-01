import React,{ useState, useEffect,useContext } from "react";
import axios from 'axios';
import {reactLocalStorage} from 'reactjs-localstorage';
import Head from './inc/head';
import {MusicContext} from './MusicContext';
import { NavLink } from 'react-router-dom';
const Favorite = () => {
    const [favorite, setFavorite] = useState([])
    useEffect(() => {
        let token = reactLocalStorage.getObject('token')
            if(token!=''){
                axios.get('http://localhost:3001/api/getfav/'+token)
                    .then(res  =>  {
                        setFavorite(res.data.data)
                    })
                    .catch(err =>   {
                        console.log(err);
                    })
            }
        },[]);

        const remove = (id) => {
            let token = reactLocalStorage.getObject('token');
            if(token!=''){
                axios.get('http://localhost:3001/api/addtofav/'+token+'/'+id)
                .then(res  =>  {
                    if(res.data.res==true){
                        setFavorite(res.data.data)
                    }
                })
                .catch(err =>   {
                    console.log(err);
                })
            }
        }
        const [empty, setempty] = useState({padding:10})

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
            {/* <!---Main Content Start---> */}
        <div className="ms_content_wrapper padder_top80" >
            {/* <!---Header---> */}
            <Head />
             {/* <!----Free Download Css Start----> */}
            <div className="ms_free_download">
                <div className="ms_heading">
                    <h1>Favourites</h1>
                </div>
                <div className="album_inner_list">
                    <div className="album_list_wrapper">
                    <ul className="album_list_name">
                            <li>#</li>
                            <li>Title</li>
                            <li>Artist</li>
                            <li className="">Price</li>
                            <li className="">Remove</li>
                        </ul>
                    {favorite.map( (fav,i) =>
                        <ul className="album_list_name" key={i}>
                            <li className="cl-f"><span className="play_no">{i+1}</span><span className="play_hover" onClick={() => {AddInPlaylist(fav)}}></span></li>
                            <li className="cl-f"><NavLink to={`beat/${fav.id}`}>{fav.title}</NavLink></li>
                            <li className="cl-f">{fav.artist}</li>
                            <li className="cl-f">${fav.price1}</li>
                            <li className="cl-f"><span className="ms_icon1 ms_cross_icon"  onClick={() => {remove(fav.id)}} ></span></li>
                        </ul>
                        )}
                        {favorite.length == null || favorite.length == 0?
                                <ul style={empty}>
                                    <li>Favorites not available</li>
                                </ul>
                            :''}
                    </div>
                </div>
             
            </div>
            
        </div>
        </>
    )
}
export default Favorite;