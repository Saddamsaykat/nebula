import Banner from "../../component/main/banner/Banner";
import Map from "../../component/main/map/Map";
import SwiperSlider from "../../component/main/swiperSlider/SwiperSlider";

const RootPage = () => {
  return (
    <div className="container mx-auto">
      <Banner />
      <SwiperSlider />
      <Map/>
    </div>
  );
};

export default RootPage;
