import LottieAnimation from '../components/Lottie'
import splash from '../public/animations/mm loader.json'
import Head from 'next/head'

const SplashScreen = () => {
 return (  <>
       <Head>
        <title>Media Monitoring | Loading</title>
      </Head>
 <div className='bg-heroBg h-screen'>
      <LottieAnimation lotti={splash} height={500} width={500}/>
 </div>  </>);

}
 
export default SplashScreen;