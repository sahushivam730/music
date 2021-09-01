import React,{useState,useEffect,useContext} from 'react';
import ReactJkMusicPlayer from 'react-jinke-music-player';
import axios from 'axios';
import {MusicContext} from './MusicContext';

const MusicPlayer = (props)=>{
    const [audioLists, setAudioLists] = useState([]);
    const [playerMode, setPlayerMode] = useState('mini');
    const [PlayerIntance, setPlayerIntance] = useState(null);
    const [positions, setpositions] = useState({right:30,bottom:100});
    const [musicList,setMusicList]  = useContext(MusicContext);
    

/* 
setAudioLists([
          {
            cover:       "http://localhost:3001/admin/uploads/beat-covers/beat-cover-image1629147429287.png",
            name:        "Demo Name",
            musicSrc:    'http://localhost:3001/admin/uploads/beats/originalbeat1629147429385.mp3',
            lyric:       "Demo",
            audioLists:  'Deemo',
            currentLyric:"Hemode"
          }])
           */

          // console.log('-----------------------Musplayer Side Here -----------------------------');
          // console.log(musicList.length);
          // console.log('-----------------------Musplayer Side Here -----------------------------');

          
      
      useEffect(() => {
        setAudioLists(musicList);
        if(musicList.length > 0) {
          setPlayerMode('full')
        }
      })

      const customDownloader = () => {
        const link    = document.createElement("a");
        link.href     = 'http://localhost:3001/admin/uploads/beats/originalbeat1629147429385.mp3'; // a.mp3
        link.download = "test";
        document.body.appendChild(link);
        link.click();
      };
  
      // console.log(PlayerIntance);
      return (
        <>
        
          {/* <ReactJkMusicPlayer  defaultPosition={positions} audioLists={audioLists} customDownloader={customDownloader}  mini="full" 

          /> */}


<ReactJkMusicPlayer showDownload="false"  defaultPosition={positions} audioLists={audioLists} autoPlay="true"  defaultVolume="100" mode={playerMode} clearPriorAudioLists="true"  volumeFade={{ fadeIn: 500, fadeOut: 500 }} quietUpdate />

          {/*             getAudioInstance={(instance) => {
              setPlayerIntance(instance)
            }} 
             */}
          {/* <button onClick={()=>{PlayerIntance.pause()}} id="StopMusic" className="StopMusic" type="button">Stop Music</button> */}
          {/* <button onClick={()=>{PlayerIntance.play()}} id="StopMusic"  className="StopMusic" type="button">Play Music</button> */}

        </>
      )

}
export default MusicPlayer;