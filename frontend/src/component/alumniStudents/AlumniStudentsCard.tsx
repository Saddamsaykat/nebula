import { useProjectImage } from "../../hook/getImageUrl";
import varsityLogo from "../../assets/FavIcon.jpg";

interface Student {
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
  aboutYour: string;
}

const AlumniStudentsCard = ({ student, index }: { student: Student; index: number }) => {
    const { imageUrl } = useProjectImage(student?.image);

    return (
        <div
        key={index}
        className="flex flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-50 dark:text-gray-800"
      >
        <div className="flex space-x-4">
          {student.image ? (
            <img
              src={imageUrl || varsityLogo}
              alt={'Image'}
              className="object-cover w-12 h-12 rounded-full shadow"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
              N/A
            </div>
          )}
  
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-semibold">{student?.firstName} {student?.lastName}</p>
            <span className="text-xs text-gray-600">{student.email}</span>
          </div>
        </div>
  
        <div>
          <p><strong>Number:</strong> {student.number}</p>
          <p><strong>Present Address:</strong> {student.presentAddress}</p>
          <p><strong>Permanent Address:</strong> {student.permanentAddress}</p>
          <p><strong>WhatsApp:</strong> {student.whatsUp}</p>
          <p><strong>Facebook:</strong> <a href={student.facebook} className="text-blue-500">{student.facebook}</a></p>
          <p><strong>LinkedIn:</strong> <a href={student.linkedin} className="text-blue-500">{student.linkedin}</a></p>
          <p><strong>GitHub:</strong> <a href={student.github} className="text-blue-500">{student.github}</a></p>
          <p><strong>About:</strong> {student.aboutYour}</p>
        </div>
      </div>
    );
};

export default AlumniStudentsCard;