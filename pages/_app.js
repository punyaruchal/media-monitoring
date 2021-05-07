import {useState, useEffect } from "react";
import '../styles/globals.css'
import 'swiper/swiper.scss'
import AOS from 'aos'
import SplashScreen from '../components/SplashScreen'

import 'aos/dist/aos.css'

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    AOS.init();

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    },5500)
  }, []);

  return (<>
  {
    loading ?
    <SplashScreen/>
    :
     <Component {...pageProps} />
  }
 
  </>)
}

export default MyApp
