import React,{ useState, useEffect } from "react";
import axios from 'axios';
import {reactLocalStorage} from 'reactjs-localstorage';
import { saveAs } from "file-saver";
import Head from './inc/head';
import { NavLink } from 'react-router-dom';
import DownloadLink from "react-download-link";
const Purchased = () => {

    const [downloads, setdownloads] = useState([])
    useEffect(() => {
            let token = reactLocalStorage.getObject('token')
            if(token!=''){
                axios.get('http://localhost:3001/api/downloads/'+token)
                .then(res  =>  {
                    if(res.data.res){
                        setdownloads(res.data.downloads)
                    }
                })
                .catch(err =>   {
                    console.log(err);
                })
            }
        },[]);

    const dBtn = (url,type) =>{
        let type2 = 'heatkings.'+type;
        saveAs(
            url,
            type2
            );
    }    
    const [empty, setempty] = useState({padding:10})
    return (
        <>
         {/* <!---Main Content Start---> */}
        <div className="ms_content_wrapper padder_top80" >
            {/* <!---Header---> */}
            <Head /> 
             {/* <!----Free Download Css Start----> */}
            <div className="ms_free_download">
                <div className="ms_heading">
                    <h1>Purchased Beats</h1>
                </div>
                <div className="album_inner_list">
                    <div className="album_list_wrapper">
                        <ul className="album_list_name">
                            <li>#</li>
                            <li>Song Title</li>
                            <li>Artist</li>
                            <li className="">Price</li>
                            <li className="">Action</li>
                        </ul>
                        {downloads.map( (download,i) =>
                            <ul className="album_list_name">
                                <li className="cl-f">{i+1}</li>
                                <li className="cl-f"><NavLink to={`beat/${download.beatid}`}>{download.title}</NavLink></li>
                                <li className="cl-f">{download.artist}</li>
                                <li className="cl-f">${download.amount}</li>
                                {/* <li className="cl-f"><span className="ms_icon1 ms_download_icon" onClick={() => {dBtn(download.beat,download.type)}}></span></li> */}
                                <li className="cl-f"><a target="_blank" href={download.beat} download ><span className="ms_icon1 ms_download_icon" ></span></a></li>
                            </ul>
                        )}
                        {downloads.length == null || downloads.length == 0?
                                <ul style={empty}>
                                    <li className="">Beats not available</li>
                                </ul>
                            :''}
                    </div>
                </div>
              {/* <!--   <div className="ms_view_more padder_bottom20">
                    <a href="#" className="ms_btn">view more</a>
                </div> --> */}
            </div>
            
        </div>
        </>
    )
}
export default Purchased;
