import React,{ useState, useEffect } from "react";
import axios from 'axios';
import {reactLocalStorage} from 'reactjs-localstorage';
import Head from './inc/head';
const Transactions = () => {

    const [transactions, settransactions] = useState([])
    useEffect(() => {
            let token = reactLocalStorage.getObject('token')
            if(token!=''){
                axios.get('http://localhost:3001/api/verify2/'+token)
                .then(res  =>  {
                    if(res.data.res){
                        axios.get('http://localhost:3001/api/get-transactions/'+token)
                            .then(res  =>  {
                                if(res.data.res){
                                    settransactions(res.data.transactions)
                                }
                            })
                            .catch(err =>   {
                                console.log(err);
                            })
                    }
                })
                .catch(err =>   {
                    console.log(err);
                })
                
            }
        },[]);
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
                    <h1>Transactions</h1>
                </div>
                <div className="album_inner_list">
                    <div className="album_list_wrapper">
                        <ul className="album_list_name">
                            <li>#</li>
                            <li>Email</li>
                            <li>Mode</li>
                            <li>Amount</li>
                            <li>Status</li>
                        </ul>
                        {transactions.map( (trans,i) =>
                            <ul className="album_list_name">
                                <li className="cl-f">{i+1}</li>
                                <li className="cl-f">{trans.email}</li>
                                <li className="cl-f">{trans.mode}</li>
                                <li className="cl-f">${trans.amount}</li>
                                <li className="cl-f">
                                    {
                                        (trans.mode=='Cash App')?(parseInt(trans.paid) === 1?'success':'pending'):trans.paid === true?'success':'failed' 
                                    }
                                </li>
                            </ul>
                        )}
                         {transactions.length == null || transactions.length == 0?
                                <ul style={empty}>
                                    <li className="">Transaction not available</li>
                                </ul>
                            :''}
                    </div>
                </div>
            </div>
            
        </div>
        </>
    )
}
export default Transactions;