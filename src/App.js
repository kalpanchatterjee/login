import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Cookies from "js-cookie";
const apiUrl = 'http://localhost:3001';
axios.interceptors.request.use(
  config => {
    const { origin } = new URL(config.url);
    const allowedOrigins = [apiUrl];
    const token = localStorage.getItem('token');
    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
function App() {
  useEffect(()=>{
    const {data }=  axios.get(`${apiUrl}/getcookie`);
   
    
  },[])
  const storedJwt = localStorage.getItem('token');
  const [jwt, setJwt] = useState(storedJwt || null);
  const [foods, setFoods] = useState([]);
  const [fetchError, setFetchError] = useState(null);
const getJwt = async () => {
    const { data } = await axios.get(`${apiUrl}/jwt`,{ withCredentials: true });
    //  window.location.replace("http://localhost:3000?token="+data.token);
     localStorage.setItem('token', data.token);
     //Cookies.set('token',data.token);
     document.cookie=data.token;
    // Cookies.set('token',data.token);
     setJwt(data.token);

  };

const getFoods = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/foods`,{ withCredentials: true });
     // const {data1 }=  axios.get(`${apiUrl}/getcookie`,{ withCredentials: true });
      setFoods(data);
      setFetchError(null);
    } catch (err) {
      setFetchError(err.message);
    }
  };
return (
    <>
      <section style={{ marginBottom: '10px' }}>
        <button onClick={() => getJwt()}>Get JWT</button>
        {jwt && (
          <pre>
            <code>{jwt}</code>
          </pre>
        )}
      </section>
      <section>
        <button onClick={() => getFoods()}>
          Get Foods
        </button>
        <ul>
          {foods.map((food, i) => (
            <li>{food.description}</li>
          ))}
        </ul>
        {fetchError && (
          <p style={{ color: 'red' }}>{fetchError}</p>
        )}
      </section>
    </>
  );
}
export default App;