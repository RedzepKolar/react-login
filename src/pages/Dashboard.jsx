import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Dashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const { user, responseKey, logout } = useContext(AuthContext);

  useEffect(() => {
    if (!user || responseKey === "NO_SESSION") {
      navigate("/");
    }
  }, [user, navigate, responseKey]);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to logout:", error);
    } finally {
      setLoading(false);
    }
  };

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="bg-[#151D2F] min-h-screen flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Code Art</h1>
      <p className="text-2xl mb-4">
        Welcome back, {capitalize(user?.data.firstName)}!
      </p>

      <div className="bg-white text-gray-900 p-6 mb-4 w-full max-w-md">
        <h2 className="text-lg font-semibold">Your Details:</h2>
        <div className="mt-2">
          <p>
            <strong>Full Name:</strong> {capitalize(user?.data.firstName)}{" "}
            {capitalize(user?.data.surname)}
          </p>
          <p>
            <strong>Phone:</strong> {user?.data.phone}
          </p>
        </div>
      </div>
      <div className="w-full max-w-md">
        <button
          onClick={handleLogout}
          disabled={loading}
          className={`text-gray-900 bg-orange-300 hover:bg-orange-400 focus:ring-4 focus:outline-none w-full focus:ring-orange-300 font-medium text-base px-5 py-2.5 text-center ${
            loading ? "opacity-50" : ""
          }`}
        >
          {loading ? <LoadingSpinner title="Logging out..." /> : "Logout"}
        </button>
      </div>
    </div>
  );
}
