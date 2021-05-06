import Lottie from "react-lottie";

export default function LottieAnimation({ lotti, width, height }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lotti,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className='h-screen flex items-center justify-center'>
      <Lottie options={defaultOptions} height={height} width={width} />
    </div>
  );
};