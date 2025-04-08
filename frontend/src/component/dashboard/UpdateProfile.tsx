/* eslint-disable @typescript-eslint/no-explicit-any */
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useUserDetails from "../../hook/useUserDetails";
import { useUpdatePostMutation } from "../../redux/slice/postData/postDataSlice";
import { postDataProps } from "../../redux/slice/postData/postDataProps";

const UpdateProfile = () => {
  const { userInfo } = useUserDetails();
  const foundBatch = userInfo?.batch
  const foundDepartment = userInfo?.department
  console.log(foundDepartment)
  const navigate = useNavigate();
  const [updatePost, { isLoading, isSuccess, isError, error }] =
    useUpdatePostMutation();

      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const formData = new FormData(form);
    
      // Ensure updateFields matches the Partial<Post> type
      const updateFields: Partial<postDataProps> = {
        firstName: formData.get("firstName")?.toString(),
        lastName: formData.get("lastName")?.toString(),
        email: formData.get("email")?.toString(),
        number: formData.get("number")?.toString(),
        presentAddress: formData.get("presentAddress")?.toString(),
        permanentAddress: formData.get("permanentAddress")?.toString(),
        whatsUp: formData.get("whatsUp")?.toString(),
        facebook: formData.get("facebook")?.toString(),
        linkedin: formData.get("linkedin")?.toString(),
        github: formData.get("github")?.toString(),
        aboutYour: formData.get("aboutYour")?.toString(),
        country: formData.get("country")?.toString(),
        city: formData.get("city")?.toString(),
        studentId: userInfo?.student?.studentId ?? '',
        image: userInfo?.student?.image ?? '',
        agree: userInfo?.student?.agree ?? false,
        role: userInfo?.student?.role ?? '',
        _id: userInfo?.student?._id ?? '',
        batch: foundBatch ?? '',
        department: foundDepartment ?? '',
      };
    
      try {
        await updatePost( updateFields as any ).unwrap();

        Swal.fire({
          title: "Success!",
          text: "Profile updated successfully!",
          icon: "success",
          confirmButtonText: "OK",
        })
          .then(() => {
            navigate("/profile");
          });
      } catch (err) {
        console.log(err);
        Swal.fire({
          title: "Error!",
          text: "Failed to update profile. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };
    

  const student = userInfo?.student || {};

  return (
    <div className="min-h-[200px] max-h-[640px] mx-auto p-4 overflow-x-auto border-2 border-amber-300">
      <h2 className="text-xl font-bold mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-3 overflow-x-auto">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex gap-4">
              <input
                name="firstName"
                defaultValue={student.firstName}
                placeholder="First Name"
                className="w-full p-2 border rounded"
              />
              <input
                name="lastName"
                defaultValue={student.lastName}
                placeholder="Last Name"
                className="w-full p-2 border rounded"
              />
            </div>
            <input
              name="email"
              defaultValue={student.email}
              placeholder="Email"
              className="w-full p-2 border rounded"
            />
            <input
              name="number"
              defaultValue={student.number}
              placeholder="Number"
              className="w-full p-2 border rounded"
            />
            <div className="flex gap-4">
              <input
                name="presentAddress"
                defaultValue={student.presentAddress}
                placeholder="Present Address"
                className="w-full p-2 border rounded"
              />
              <input
                name="permanentAddress"
                defaultValue={student.permanentAddress}
                placeholder="Permanent Address"
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                name="whatsUp"
                defaultValue={student.whatsUp}
                placeholder="WhatsApp"
                className="w-full p-2 border rounded"
              />
              <input
                name="facebook"
                defaultValue={student.facebook}
                placeholder="Facebook"
                className="w-full p-2 border rounded"
              />
              <input
                name="linkedin"
                defaultValue={student.linkedin}
                placeholder="LinkedIn"
                className="w-full p-2 border rounded"
              />
              <input
                name="github"
                defaultValue={student.github}
                placeholder="GitHub"
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <div>
            <textarea
              name="aboutYour"
              defaultValue={student.aboutYour}
              placeholder="About You"
              className="w-full p-2 border rounded"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                name="role"
                defaultValue="student"
                placeholder="Role"
                className="w-full p-2 border rounded"
              />
              <input
                name="country"
                defaultValue={student.country}
                placeholder="Country"
                className="w-full p-2 border rounded"
              />
              <input
                name="city"
                defaultValue={student.city}
                placeholder="City"
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="agree" />
          Agree to terms
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {isLoading ? "Updating..." : "Update Profile"}
        </button>

        {isSuccess && (
          <p className="text-green-600">Profile updated successfully!</p>
        )}
        {isError && (
          <p className="text-red-600">
            {isError && 'data' in error && (error.data as { message?: string })?.message || "Failed to update profile."}
          </p>
        )}
      </form>
    </div>
  );
};

export default UpdateProfile;
