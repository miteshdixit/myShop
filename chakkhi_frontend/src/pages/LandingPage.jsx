import { Link } from "react-router-dom";
import Signup from "./SignUp";

const LandingPage = () => {
  return (
    <div className=" flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-bold mb-4">Welcome to Our Platform</h1>
        <p className="text-lg">
          Join us and explore amazing features designed just for you.
        </p>
      </header>

      <div className="card w-full max-w-md  text-gray-800">
        <Signup />
      </div>
    </div>
  );
};

export default LandingPage;
