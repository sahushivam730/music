import React, {createContext,useState} from 'react';
import Content from "./Content";
import Head from "./inc/head";
import Side_bar from "./inc/Side_bar";
import Banner from "./inc/Banner";
import Foot from "./inc/foot";
import Player from "./inc/Player";
import ExclusiveBeats from "./ExclusiveBeats";
import PurchaseBeats from "./PurchaseBeats";
import Purchased from "./Purchased";
import FeturedBeats from "./FeturedBeats";
import NewReleasesBeats from "./NewReleasesBeats";
import Genres from "./Genres";
import Favorite from "./Favorite";
import Transactions from "./Transactions";
import SingleGenere from "./SingleGenere";
import Cart from "./Cart";
import MusicPlayer from "./MusicPlayer";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

//   const [musicId, setMusicId] = useState(0);
//   const MusicPlayerList  = createContext();

import {MusicProvider} from './MusicContext';
import Single_beat from './Single_beat';
  
const Home = ()=>{

    /* 
    const play_music = (id)=>{
        setMusicId(id);
    }
 */
    return (
        <>
        <MusicProvider>
            <div className="ms_main_wrapper">
                    {/* side-bar here start */}

                    
                        <Router>
                            <Side_bar />

                            <Switch>
                                <Route path="/exclusive-beats"  exect component={ExclusiveBeats} />
                                <Route path="/cart"             exect component={Cart}/>
                                <Route path="/Favorite"         exect component={Favorite}/>
                                <Route path="/purchased"        exect component={Purchased}/>
                                <Route path="/transactions"     exect component={Transactions} />
                                <Route path="/genere/:id"       exect component={SingleGenere} />
                                <Route path="/Cart"             exect component={Cart} />
                                <Route path="/beat/:id"         exect component={Single_beat} />
                                <Route path="/fetured-beats"    exect component={FeturedBeats} />
                                <Route path="/new-releases-beats" exect component={NewReleasesBeats} />
                                <Route path="/genres" exect component={Genres} />
                                
                                <Route path="/" exect>
                                    <Banner/>
                                    <Content />
                                </Route>
                             
                            </Switch>
                            

                        </Router>
                        {/* side bar end here */}
                        {/* Banner Start */}
                        {/* <Banner/> */}
                        {/* Banner End */}
                        {/* Content Here Start */}
                    

                        <MusicPlayer/>
                        {/* Comtent Here End  */}


                    {/* <!----Footer Start----> */}
                    <Foot/>
                    {/* <!----Audio Player Section----> */}
                    {/* Player Start */}
                    {/* <Player/> */}
                    {/* Player End */}
            </div>
        </MusicProvider>
        </>
    )

}
export default Home;
// export {MusicPlayerList} ;