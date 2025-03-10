import {
  useAddPostMutation,
  useDeletePostMutation,
  useGetPostsQuery,
} from "../../redux/slice/postDataSlice";

const Login = () => {
  const [addPost, { isLoading, isError, isSuccess }] = useAddPostMutation();
  const { data } = useGetPostsQuery();
  const [deletePost] = useDeletePostMutation();

  const handleDelete = async (deletedData) => {
    try {
      const res = await deletePost(deletedData).unwrap();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data);

  const handleSubmitted = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const postData = { email, password };
    console.log(postData);
    await addPost(postData);
  };

  return (
    <div>
      <div>
        <form
          onSubmit={handleSubmitted}
          className="flex flex-col items-center justify-center"
        >
          <h1 className="text-2xl font-bold">Login</h1>
          <label htmlFor="email">Email</label>
          <input
            className="border-2 border-amber-300"
            type="email"
            id="email"
            name="email"
            required
          />
          <br />
          <label htmlFor="password">Password</label>
          <input
            className="border-2 border-amber-300"
            type="password"
            id="password"
            name="password"
            required
          />
          <button type="submit">Login</button>
        </form>
        {isLoading && <p>Loading...</p>}
        {isSuccess && <p>Post added successfully!</p>}
        {isError && <p>Error adding post.</p>}
      </div>
      <div>
        {data?.map((post) => (
          <div key={post._id}>
            <h3>{post.email}</h3>
            <p>{post.password}</p>
            <button
              className="cursor-pointer"
              onClick={() => {
                handleDelete(post?._id);
                console.log(post?._id);
              }}
            >
              Delete
            </button>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Login;
