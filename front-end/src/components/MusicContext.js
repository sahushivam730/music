import React,{useState,createContext,useRef,useEffect} from 'react';
// import Search from 'react-search';
import axios from 'axios';
import { Link  } from "react-router-dom";
import { toast } from 'react-toastify';
import {reactLocalStorage} from 'reactjs-localstorage';
export const MusicContext = createContext();
export const CartContext  = createContext();

export const  MusicProvider = (props)=>{
    const [musicList,setMusicList] = useState([]);
    const [cartCounter,setCartCounter] = useState(reactLocalStorage.getObject('abcd').length); // for music cart count
    return (
        <>
            <MusicContext.Provider value={[musicList,setMusicList]}>
                <CartContext.Provider value={[cartCounter,setCartCounter]}> 
                    {props.children}
                </CartContext.Provider>
            </MusicContext.Provider>
        </>
    )
}

export const  MusicSearch = (props)=>{
    const [searchfilter,setSearchfilter] = useState([]);
    
    const ref = useRef();
    const [isModalOpen, setModalOpen] = useState(false);
    useOnClickOutside(ref, () => setModalOpen(false));

    const getItemsAsync = (event) => {
        // console.log(event.target.value);
        axios.get('http://localhost:3001/api/search?keyword='+event.target.value)
            .then(res  =>  {
               if(res.data.res == true){
                //    console.log(res.data);
                setSearchfilter(res.data.data)
                setModalOpen(true)
               }
            })
            .catch(err =>   {
                console.log(err);
            })
      }



    return (
        <>
        {/* <div className="ms_top_search"> */}
                        <input type="search" className="form-control" placeholder="Search Music by genres and lyrics.." onChange={(event)=>{getItemsAsync(event)}} />
            
            {/* <Search items={searchfilter} placeholder='Search Music by genres and lyrics..' multiple={true} onItemsChanged={(event)=>{getItemsAsync(event)}} className="form-control" /> */}

            {/* <SearchField  placeholder="Search..." onChange={getItemsAsync} searchText="This is initial search text" classNames="test-class" /> */}


            <span className="search_icon">
                <img src="../../assets/images/svg/search.svg" alt="search icon" />
            </span>
            <div className="search-list">
            {isModalOpen ? 
                <ul className="list-group" ref={ref}>
                    {searchfilter.length>0 &&
                    searchfilter.map((single_beat,beat_count)=>{
                        return (<li className="list-group-item"><Link to={`beat/${single_beat.id}`}>About<span class='left'>{single_beat.title}</span></Link> <Link to={`genere/${single_beat.genre}`}><span class='right'>{single_beat.name}</span></Link></li>)
                    })}
                </ul>
                 : ''}
            </div>
        {/* </div> */}  
        </>
    )
}


export const  notify = (type,msg)=>{
    switch (type.toString()) {
        case 'success':
            toast.success(msg)
            break;
        case 'error':
            toast.error(msg)
            break;
        case 'warning':
            toast.warning(msg)
            break;
    
        default:
            toast.info(msg)
            break;
    }
}


export const  CartCounter = ()=>{
    const [CarttCounter,setCarttCounter] = useState(0);

    useEffect(()=>{
        console.log('---------------here-we are---------------');
        console.log(reactLocalStorage.getObject('abcd').length);
        setCarttCounter(reactLocalStorage.getObject('abcd').length);
    });
    
    return (
        <>
            <span className="w_song_time1">
                <div className="counter">{CarttCounter}</div>
                <i class="fa fa-shopping-bag cart-icon" aria-hidden="true" ></i>
            </span>
        </>
    )
}

// export default MusicProvider;
// Hook
function useOnClickOutside(ref, handler) {
    useEffect(
      () => {
        const listener = (event) => {
          // Do nothing if clicking ref's element or descendent elements
          if (!ref.current || ref.current.contains(event.target)) {
            return;
          }
          handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        };
      },
      // Add ref and handler to effect dependencies
      // It's worth noting that because passed in handler is a new ...
      // ... function on every render that will cause this effect ...
      // ... callback/cleanup to run every render. It's not a big deal ...
      // ... but to optimize you can wrap handler in useCallback before ...
      // ... passing it into this hook.
      [ref, handler]
    );
  }