import React from "react";

const Responce = (props) => {

    return (
        <>
            <div className="ms_content_wrapper padder_top80">
                <div className="ms_header">
                    <div className="ms_top_left">
                        <div className="ms_top_trend"> 
                            <span>
                                <a href="#!" className="ms_color"><img src="images/logo1.png" alt=""/></a>
                            </span> 
                        </div>
                        <div className="ms_top_search">
                            <input type="text" className="form-control" placeholder="Search Music by genres and lyrics.." />
                           <span className="search_icon">
                                <img src="images/svg/search.svg" alt=""/>
                           </span>
                        </div>
                    </div>
                    <div className="ms_top_right">
                        <div className="ms_top_btn"> <a href="#!" className="ms_btn reg_btn" data-toggle="modal" data-target="#myModal"><span>register</span></a> <a href="#!" className="ms_btn login_btn" data-toggle="modal" data-target="#myModal1"><span>login</span></a> </div>
                    </div>
                </div>
                <div className="ms_free_download">
                    <div className="ms_heading">
                        <h1>{props.res}</h1>
                        <h1></h1>
                        <h1></h1>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Responce;