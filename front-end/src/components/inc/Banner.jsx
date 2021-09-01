import { NavLink } from 'react-router-dom';
const Banner = ()=>{
    return (
        <>
        <div className="ms_banner_wrapper" id="banner" >
            <div className="ms_banner_inner">
                <div className="row">
                    <div className="col-lg-12 col-md-12 text-center">
                        <div className="ms_banner_text">
                            <h1>This Month’s</h1>
                            <h1 className="ms_color">Record Breaking Albums !</h1>
                            <p>Dream your moments, Until I Met You, Gimme Some Courage, Dark Alley, One More Of A Stranger, Endless<br /> Things, The Heartbeat Stops, Walking Promises, Desired Games and many more...</p>
                            <div className="ms_banner_btn">
                                <button className="ms_btn btn1"><NavLink to={`exclusive-beats`}>Exclusive Beats</NavLink></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </>
    )
}
export default Banner;