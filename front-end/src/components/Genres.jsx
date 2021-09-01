import React, { useState, useEffect,useContext} from 'react';
import axios from 'axios';
import {MusicContext,notify} from './MusicContext';
import { NavLink } from 'react-router-dom';
import Head from './inc/head';
import {reactLocalStorage} from 'reactjs-localstorage';
const Genres = () => {

    
    const [Genres, setGenres] = useState([]);

    useEffect(() => {
            axios.get('http://localhost:3001/api/genres/')
            .then(res  =>  {
                if(res.data.res){
                    setGenres(res.data.data)
                }
            })
            .catch(err =>   {
                console.log(err);
            });
        },[]);



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

                        {Genres.map( (genre,i) =>
                            <div className="col-lg-2 col-md-6">
                                <div class="ms_rcnt_box marger_bottom30">
                                    <div class="ms_rcnt_box_img">
                                        <img src={genre.img} alt="" class="img-fluid" />
                                        <div class="ms_main_overlay">
                                            <div class="ms_box_overlay"></div>
                                            <div class="ms_play_icon">
                                                <img src="../../assets/images/svg/play.svg" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ms_rcnt_box_text">
                                        <h3>{genre.name}</h3>
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
export default Genres;