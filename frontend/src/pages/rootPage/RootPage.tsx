import Gallery from "../../component/main/galary/Gallery";
import SwiperSlider from "../../component/main/swiperSlider/SwiperSlider";

const RootPage = () => {
  return (
    <div  className="container mx-auto">
      <SwiperSlider />
      <Gallery />
    </div>
  );
};

export default RootPage;
