import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
const apiUrl = 'http://localhost:3001';

function Cookie() {
    let { id } = useParams();
    useEffect(()=>{
    //    return localStorage.getItem('token');
    
     sendGetRequest(id);
    },[]);
   
   // let token=localStorage.getItem('token');
    

    // const calling  =await axios.get(`${apiUrl}/getcookie`,{ withCredentials: true }).then((data)=>{
    //     // alert(data)
    //      if(typeof(data)!="undefined" && data!=null){
    //          console.log(data)
    //          redirect(data);
    //      }
    //      })
    const sendGetRequest = async (id) => {
        try {
            //const resp = await axios.get(`${apiUrl}/getcookie`,{ withCredentials: true });
            console.log(document.cookie);
            //console.log(Cookies.get('token'));
           // console.log("http://localhost:"+id+"?token="+resp.data.token) https://client1-awipkz2oo-kalpanchatterjee.vercel.app
            window.location.replace(id+"/"+document.cookie);
            //console.log(resp.data.token);
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    return <>Hi</>
}
export default Cookie;