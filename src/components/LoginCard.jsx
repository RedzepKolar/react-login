import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";
import LoginForm from "./LoginForm";
import LogInImg from "../assets/background-image.png";

export default function LoginCard() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const checkAuthentication = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    } else {
      setShowLoginForm(true);
    }
  };

  return (
    <div
      className="mx-4 mt-20 bg-[#2d3250] grid grid-cols-1 md:grid-cols-2"
      style={{ maxWidth: "960px", height: "630px" }}
    >
      <div
        className="w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${LogInImg})`, minHeight: "300px" }}
      ></div>
      <div className="p-12 flex flex-col justify-center">
        {showLoginForm ? (
          <LoginForm />
        ) : (
          <div>
            <h1 className="text-3xl text-white font-bold text-center">
              Welcome Back!
            </h1>
            <p className="text-white text-xl text-center mt-4">
              Ready to continue your journey?
            </p>
            <button
              onClick={checkAuthentication}
              className="mt-8 w-full text-lg font-medium bg-orange-300 text-gray-900 p-2 hover:bg-orange-400 transition duration-200"
            >
              Let&apos;s get started
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
