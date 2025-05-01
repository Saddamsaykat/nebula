import { useProjectImage } from "../../hook/getImageUrl";
import varsityLogo from "../../assets/FavIcon.jpg";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

interface Student {
  _id: string;
  image?: string;
  firstName: string;
  lastName: string;
  email: string;
  number: string;
  presentAddress: string;
  permanentAddress: string;
  whatsUp: string;
  facebook: string;
  linkedin: string;
  github: string;
  aboutYourself: string;
  studentId: string;
}

const AlumniStudentsCard = ({ student, index }: { student: Student; index: number }) => {
  const { imageUrl } = useProjectImage(student?.image);
console.log(student)
  return (
    <div
      key={index}
      className="border border-rose-400 w-full relative bg-white shadow-md rounded-xl"
    >
      <img
        src={imageUrl || varsityLogo}
        alt="Alumni"
        className="w-full h-[300px] object-cover rounded-t-xl"
      />

      <div className="p-5">
        <h1 className="text-[1.3rem] font-bold leading-[24px] text-black">
          {student.firstName} {student.lastName}
        </h1>
        <span className="text-[0.9rem] text-gray-400">{student.email}</span>

        <p className="text-gray-600 mt-3 text-sm">
          <strong>Phone:</strong> {student.number} <br />
          <strong>Present Address:</strong> {student.presentAddress} <br />
          <strong>Permanent Address:</strong> {student.permanentAddress} <br />
          <strong>WhatsApp:</strong> {student.whatsUp} <br />
          <strong>About:</strong> {student?.aboutYourself?.length > 100 ? student?.aboutYourself?.slice(0, 100) + '...' : student.aboutYourself}
        </p>

        <div className="mt-3 flex flex-wrap gap-2 text-sm">
          <a href={student.facebook} className="text-blue-500 underline">Facebook</a>
          <a href={student.linkedin} className="text-blue-500 underline">LinkedIn</a>
          <a href={student.github} className="text-blue-500 underline">GitHub</a>
        </div>

        <Link 
          to={`/alumni-students/${student?.studentId}`}
          className="py-2.5 px-4 bg-gray-300 mt-4 rounded-md w-full flex items-center justify-center gap-[10px] group"
        >
          Learn more
          <BsArrowRight className="text-[1.3rem] text-gray-600 group-hover:ml-2 transition-all duration-200" />
        </Link>
      </div>
    </div>
  );
};

export default AlumniStudentsCard;
