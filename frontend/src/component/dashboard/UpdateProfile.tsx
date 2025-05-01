/* eslint-disable @typescript-eslint/no-explicit-any */
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useUserDetails from "../../hook/useUserDetails";
import { useUpdatePostMutation } from "../../redux/slice/postData/postDataSlice";
import { postDataProps } from "../../redux/slice/postData/postDataProps";

const UpdateProfile = () => {
  const { userInfo } = useUserDetails();
  const student = userInfo?.student || {};
  const navigate = useNavigate();
  const [updatePost, { isLoading, isSuccess, isError, error }] =
    useUpdatePostMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

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
      aboutYourself: formData.get("aboutYour")?.toString(),
      country: formData.get("country")?.toString(),
      city: formData.get("city")?.toString(),
      gender: formData.get("gender")?.toString() ?? "",
      studentId: student?.studentId ?? "",
      agree: student?.agree ?? false,
      role: student?.role ?? "",
      batch: userInfo?.batch ?? "",
      department: userInfo?.department ?? "",
    };

    try {
      await updatePost(updateFields as any).unwrap();
      Swal.fire({
        title: "Success!",
        text: "Profile updated successfully!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/alumni");
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

  return (
    <div className="max-w-5xl mx-auto my-12 p-8 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Update Your Profile
      </h2>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Personal Info */}
        <section>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                First Name
              </label>
              <input
                name="firstName"
                defaultValue={student.firstName}
                placeholder="First Name"
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Last Name
              </label>
              <input
                name="lastName"
                defaultValue={student.lastName}
                placeholder="Last Name"
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                name="email"
                value={student.email}
                readOnly
                className="input cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Phone Number
              </label>
              <input
                name="number"
                defaultValue={student.number}
                placeholder="Number"
                className="input"
              />
            </div>
          </div>
        </section>

        {/* Address Info */}
        <section>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Present Address
              </label>
              <input
                name="presentAddress"
                defaultValue={student.presentAddress}
                placeholder="Present Address"
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Permanent Address
              </label>
              <input
                name="permanentAddress"
                defaultValue={student.permanentAddress}
                placeholder="Permanent Address"
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Country
              </label>
              <input
                name="country"
                defaultValue={student.country}
                placeholder="Country"
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                City
              </label>
              <input
                name="city"
                defaultValue={student.city}
                placeholder="City"
                className="input"
              />
            </div>
          </div>
        </section>

        {/* Social Links */}
        <section>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Social Media
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                WhatsApp Number
              </label>
              <input
                name="whatsUp"
                defaultValue={student.whatsUp}
                placeholder="WhatsApp Number"
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Facebook Profile
              </label>
              <input
                name="facebook"
                defaultValue={student.facebook}
                placeholder="Facebook Profile URL"
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                LinkedIn Profile
              </label>
              <input
                name="linkedin"
                defaultValue={student.linkedin}
                placeholder="LinkedIn Profile URL"
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                GitHub Username
              </label>
              <input
                name="github"
                defaultValue={student.github}
                placeholder="GitHub Username"
                className="input"
              />
            </div>
          </div>
        </section>

        {/* <hr className="border border-red-500"/> */}
        {/* About & Role */}
        <section>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Additional Info
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              About You
            </label>
            <textarea
              name="aboutYour"
              defaultValue={student.aboutYourself}
              placeholder="Tell us about yourself..."
              rows={5}
              className="input resize-none w-full"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Role
              </label>
              <input
                name="role"
                value={student.role}
                readOnly
                className="input cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Gender
              </label>
              <input
                name="gender"
                defaultValue={student.gender}
                placeholder="Gender"
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Batch
              </label>
              <input
                name="batch"
                defaultValue={student.batch}
                placeholder="Batch"
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Department
              </label>
              <input
                name="department"
                defaultValue={student.department}
                placeholder="Department"
                className="input"
              />
            </div>
          </div>
        </section>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </button>
          {isSuccess && (
            <p className="text-green-600 mt-2">Profile updated successfully!</p>
          )}
          {isError && (
            <p className="text-red-600 mt-2">
              {(isError &&
                "data" in error &&
                (error.data as { message?: string })?.message) ||
                "Failed to update profile."}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
