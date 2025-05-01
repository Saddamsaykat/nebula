import { Link } from "react-router-dom";
import logo from "../../assets/FavIcon.jpg"

const RegisterHeader = () => {
  return (
    <div>
      <div>
        <Link to="/">
          <img
            src={logo}
            alt={"ZHSUST"}
            className="w-12 h-12 rounded border-black"
          />
        </Link>
        <h1 className="text-4xl font-semibold text-black">
          Welcome to CSE Alumni!
        </h1>
        <p className="text-lg text-black">Register your account</p>
        <hr className="border border-black mb-2 mt-2" />
      </div>
    </div>
  );
};

export default RegisterHeader;
