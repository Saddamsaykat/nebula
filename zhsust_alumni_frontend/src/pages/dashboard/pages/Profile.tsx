import {
  useGetPostsQuery,
  usePatchPostMutation,
} from "../../../redux/slice/postDataSlice";
import { useState } from "react";

const Profile = () => {
  const { data } = useGetPostsQuery();
  const [updatePost] = usePatchPostMutation();
  const [updatedText, setUpdatedText] = useState("");

  const handleUpdate = async (postId) => {
    try {
      const response = await updatePost({ id: postId, text: updatedText }).unwrap();
      console.log("Updated successfully:", response);
      setUpdatedText(""); // Clear input after update
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div>
      <h1>Saykat</h1>
      {data?.map((post) => (
        <div key={post._id}>
          <h3>{post.email}</h3>
          <p>{post.password}</p>
          <input
            type="text"
            placeholder="Update text"
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
          />
          <button
            className="cursor-pointer"
            onClick={() => {
              if (post._id) {
                handleUpdate(post._id);
              } else {
                console.error("Post ID is undefined:", post);
              }
            }}
          >
            Update
          </button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Profile;
