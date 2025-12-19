import Lottie from "lottie-react";
import loadingAnimation from "../../assets/json/loading.json";

const Loading = () => (
  <div className="flex flex-col items-center justify-center gap-5">
    <div className="max-w-sm relative">
      <Lottie animationData={loadingAnimation} loop autoplay />
    </div>
  </div>
);

export default Loading;