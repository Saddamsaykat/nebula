/* eslint-disable @typescript-eslint/no-explicit-any */
// components/SingleStudentInfo.tsx
import {
    FaFacebookF,
    FaLinkedinIn,
    FaGithub,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaInfoCircle,
    FaWhatsapp,
    FaEnvelope,
    FaMapMarkedAlt,
  } from "react-icons/fa";
  import varsityLogo from "../../assets/FavIcon.jpg";
import { useProjectImage } from "../../hook/getImageUrl";
  
  type StudentInfoProps = {
    student: any;
  };
  
  const SingleStudentInfo = ({ student }: StudentInfoProps) => {
    const { imageUrl } = useProjectImage(student?.image);
  
    return (
      <div className="max-w-5xl mx-auto p-6 sm:p-8 bg-white shadow-xl rounded-3xl mt-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="relative group">
            <img
              src={imageUrl || varsityLogo}
              alt={`${student.firstName} ${student.lastName}`}
              className="w-40 h-40 rounded-full object-cover border-4 border-indigo-500 shadow-md transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 right-0 bg-indigo-500 p-2 rounded-full shadow-lg scale-0 group-hover:scale-100 transition duration-300">
              <FaInfoCircle className="text-white text-sm" />
            </div>
          </div>
  
          <div className="text-center md:text-left transition-all">
            <h1 className="text-3xl font-extrabold text-gray-800 capitalize group-hover:text-indigo-600 transition duration-300">
              {student.firstName} {student.lastName}
            </h1>
            <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2 mt-2 transition hover:text-indigo-500">
              <FaEnvelope /> {student.email || "N/A"}
            </p>
            <p className="text-sm mt-1 text-gray-500 italic">
              {student.department}, Batch {student.batch}
            </p>
          </div>
        </div>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-sm text-gray-700">
          {[
            {
              icon: <FaPhoneAlt className="text-indigo-500" />,
              label: "Phone",
              value: student.number,
            },
            {
              icon: <FaWhatsapp className="text-green-500" />,
              label: "WhatsApp",
              value: student.whatsUp,
            },
            {
              icon: <FaMapMarkerAlt className="text-blue-500" />,
              label: "Present Address",
              value: student.presentAddress,
            },
            {
              icon: <FaMapMarkerAlt className="text-pink-500" />,
              label: "Permanent Address",
              value: student.permanentAddress,
            },
            {
              icon: <FaMapMarkedAlt className="text-emerald-500" />,
              label: "Country",
              value: student.country,
            },
            {
              icon: <FaMapMarkedAlt className="text-emerald-500" />,
              label: "City",
              value: student.city,
            },
          ].map((item, idx) => (
            <p
              key={idx}
              className="flex items-center gap-3 p-4 bg-gray-100 hover:bg-indigo-50 rounded-xl shadow-sm transition-all duration-300 hover:scale-[1.01]"
            >
              {item.icon} <strong>{item.label}:</strong> {item.value || "N/A"}
            </p>
          ))}
  
          <p className="flex items-center gap-3 col-span-1 sm:col-span-2 p-4 bg-yellow-100 hover:bg-yellow-200 rounded-xl shadow-sm transition-all hover:scale-[1.01]">
            <FaInfoCircle className="text-yellow-600" /> <strong>About:</strong>{" "}
            {student.aboutYour || "N/A"}
          </p>
        </div>
  
        <div className="flex gap-4 mt-6 justify-center md:justify-start">
          {student.facebook && (
            <a
              href={student.facebook}
              target="_blank"
              rel="noreferrer"
              className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 hover:scale-110 transition duration-300 shadow-md"
            >
              <FaFacebookF />
            </a>
          )}
          {student.linkedin && (
            <a
              href={student.linkedin}
              target="_blank"
              rel="noreferrer"
              className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 hover:scale-110 transition duration-300 shadow-md"
            >
              <FaLinkedinIn />
            </a>
          )}
          {student.github && (
            <a
              href={student.github}
              target="_blank"
              rel="noreferrer"
              className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-900 hover:scale-110 transition duration-300 shadow-md"
            >
              <FaGithub />
            </a>
          )}
        </div>
      </div>
    );
  };
  
  export default SingleStudentInfo;
  