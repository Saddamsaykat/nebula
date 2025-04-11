import { useProjectImage } from "../../hook/getImageUrl";
import defaultLogo from "../../assets/ZHSUST.jpg";

const StudentImage = ({ imageId }: { imageId: string }) => {
    const { imageUrl } = useProjectImage(imageId);
  
    return (
      <img
        src={imageUrl || defaultLogo}
        alt="Student"
        className="w-10 h-10 rounded-2xl object-cover"
      />
    );
  };
  export default StudentImage;