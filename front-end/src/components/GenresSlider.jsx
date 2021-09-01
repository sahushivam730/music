import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { NavLink } from 'react-router-dom';
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
    const [box, setBox] = useState({
        lightboxIsOpen: false,
        gotoPrevLightboxImage: undefined,
        gotoNextLightboxImage: undefined,
        closeLightbox: undefined
    });


    const Demo = ()=>{
        return (
            setCount(count + 1)
        )
    }

    const [genres, setGenres] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3001/api/genres')
            .then(res  =>  {
                if(res.data.res==true){
                    setGenres(res.data.data)
                }
            })
            .catch(err =>   {
                console.log(err);
            })
        },[]);

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
                    {genres.map((genre,i)=>(
                        // <div className="swiper-slide" >
                        <NavLink to={`genere/${genre.id}`}>
                            <div className="ms_rcnt_box" key={i}>
                                <div className="ms_rcnt_box_img">
                                    <img src={genre.img} alt=""    />
                                    <div className="ms_main_overlay">
                                        <div className="ms_box_overlay"></div>
                                        <div className="ms_play_icon">
                                            <img src="../../assets/images/svg/play.svg" alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="ms_rcnt_box_text" >
                                    <h3><a href="#!" >{genre.title}</a></h3>
                                    <p  >{genre.artist}</p>
                                </div>
                            </div>
                        </NavLink>
                        // </div>
                    ))}
            </Carousel>
            </div>
            
        </>
    )

}
export default  Slider;
