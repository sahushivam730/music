import React from 'react';
import PaypalBtn from 'react-paypal-checkout';
import axios from 'axios';
import {reactLocalStorage} from 'reactjs-localstorage';
const paypalbtn = (props) => {
     

    const onSuccess = (payment) => {
        // Congratulation, it came here means everything's fine!
        console.log("The payment was succeeded!", payment);
        axios.post('http://localhost:3001/api/savesuccess',{"cart":props.cart,"tot":props.amount,"token":props.token,"payment":payment})
            .then(res  =>  {
                if(res.data.res===true){
                    reactLocalStorage.setObject('abcd',[])
                    reactLocalStorage.setObject('CartTotal',0)
                    window.location.href = 'http://localhost:3000/purchased'
                    
                }
            })
            .catch(err =>   {
                console.log(err);
            })
    }		

    const onCancel = (data) => {
        // User pressed "cancel" or close Paypal's popup!
        console.log('The payment was cancelled!', data);
        window.location.href = 'http://localhost:3000/cart'
       
    }	

    const onError = (err) => {
        // The main Paypal's script cannot be loaded or somethings block the loading of that script!
        console.log("Error!", err);	
        window.location.reload()
        
    }			

    let env = 'sandbox'; // you can set here to 'production' for production
    let currency = 'USD'; // or you can set this value from your props or state  
    let total = props.amount;  // same as above, this is the total amount (based on currency) to be 
    let locale = 'en_US'; 
    // For Customize Style: https://developer.paypal.com/docs/checkout/how-to/customize-button/
    let style = {
        'label':'pay', 
        'tagline': false, 
        'size':'medium', 
        'shape':'pill', 
        'color':'gold'
    };

    const client = {
    sandbox:    'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    }
    // In order to get production's app-ID, you will have to send your app to Paypal for approval first
    // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"): 
    //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
    // For production app-ID:
    //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/		

    // NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!		  

    return (	
        <PaypalBtn 
            env={env} 
            client={client} 
            currency={currency} 
            total={total} 
            locale={locale} 
            style={style}
            onError={onError} 
            onSuccess={onSuccess} 
            onCancel={onCancel} />
    );
}
export default paypalbtn;
