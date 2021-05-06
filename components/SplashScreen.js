import LottieAnimation from '../components/Lottie'
import splash from '../public/animations/mm loader.json'

const SplashScreen = () => {
 return (  
 <div className='bg-heroBg h-screen'>
      <LottieAnimation lotti={splash} height={500} width={500}/>
 </div> );
}
 
export default SplashScreen;