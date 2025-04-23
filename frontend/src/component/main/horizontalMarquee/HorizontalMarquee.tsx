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
  {
    title: "stepper",
    image: "https://i.ibb.co.com/QKcvgbC/stepper.png",
    url: "/components/stepper",
    groupName: "navigation",
  },
  {
    title: "tab",
    image: "https://i.ibb.co/tzFdVZt/Name-14.png",
    url: "/components/tabs",
    groupName: "navigation",
  },
  {
    title: "modal",
    image: "https://i.ibb.co/yFRHYKV/Name-17.png",
    url: "/components/modal",
    groupName: "navigation",
  },
  {
    title: "pagination",
    image: "https://i.ibb.co/C9ytCym/Name-15.png",
    url: "/components/pagination",
    groupName: "navigation",
  },
  {
    title: "tooltip",
    image: "https://i.ibb.co/mcF2bX8/Name-7.png",
    url: "/components/tooltip",
    groupName: "data_display",
  },
  {
    title: "badge",
    image: "https://i.ibb.co/HgvLrtK/Name-6.png",
    url: "/components/badge",
    groupName: "data_display",
  },
];

import NameSutter from "../../../utils/nameSutter/NameSutter";
import "./style.css";
const HorizontalMarquee = () => {
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
