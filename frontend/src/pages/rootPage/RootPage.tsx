import Banner from "../../component/main/banner/Banner";
import Gallery from "../../component/main/galary/Gallery";
import SwiperSlider from "../../component/main/swiperSlider/SwiperSlider";

const RootPage = () => {
  return (
    <div className="container mx-auto">
      <Banner/>
      <SwiperSlider />
      <Gallery />
    </div>
  );
};

export default RootPage;
