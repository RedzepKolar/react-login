import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";
import LoadingSpinner from "./LoadingSpinner";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, responseKey, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await login(username, password);

      if (user || responseKey === "ALREADY_IN_SESSION") {
        navigate("/dashboard");
      } else {
        setError("Failed to login. Please check your credentials");
      }
    } catch (err) {
      setError("Loading failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-center font-bold mb-6 text-white">LOG IN</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label
          htmlFor="username"
          className="block mb-2 text-sm font-medium text-[#676f9d]"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-[#424769] border border-transparent focus:outline-none focus:border-l-[2.5px] focus:border-orange-400 text-white text-sm block w-full p-2.5 focus:border-t-transparent focus:border-r-transparent focus:border-b-transparent"
          placeholder="Username"
          required
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-[#676f9d]"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-[#424769] border border-transparent focus:outline-none focus:border-l-[2.5px] focus:border-orange-400 text-white text-sm block w-full p-2.5 focus:border-t-transparent focus:border-r-transparent focus:border-b-transparent"
          placeholder="Password"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`text-gray-900 bg-orange-300 text-base hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium w-full px-5 py-2.5 text-center ${
          loading ? "opacity-50" : ""
        }`}
      >
        {loading ? <LoadingSpinner title="Logging in..." /> : "Login"}
      </button>
    </form>
  );
}
