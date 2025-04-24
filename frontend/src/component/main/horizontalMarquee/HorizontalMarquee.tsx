const MarqueeData = [
  {
    title: "breadcrumb",
    image: "https://i.ibb.co.com/7SkBRSr/breadcrumb.png",
    url: "/components/breadcrumb",
    groupName: "navigation",
  },
  {
    title: "Rating",
    image: "https://i.ibb.co.com/VBhMWRF/star.png",
    url: "/components/rating",
    groupName: "navigation",
  },
  
];

import { useEffect } from "react";
import { useGetAllImageQuery } from "../../../redux/slice/imageAPi/imageApi";
import NameSutter from "../../../utils/nameSutter/NameSutter";
import "./style.css";
const HorizontalMarquee = () => {
  const { data: AllImageFile } = useGetAllImageQuery();

useEffect(() => {
  console.log(AllImageFile); // Should now log an array of image URLs or null
}, [AllImageFile]);

  const doubledComponents = MarqueeData ? [...MarqueeData, ...MarqueeData] : [];

  return (
    <div className="mb-10">
      <NameSutter name="Proud Alumni" />
      <div className="slider-container w-full flex-nowrap relative overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <div className="marqueeSliderLeft flex items-center gap-5">
          {doubledComponents.map((item, index) => (
            <a
              href={item.url}
              className="py-2 px-6 bg-[#0FABCA] capitalize border border-[#0FABCA] text-white rounded font-medium whitespace-nowrap"
              key={index}
            >
              {item.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalMarquee;
