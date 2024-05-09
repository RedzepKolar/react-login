import { useRouteError, useNavigate } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  const navigate = useNavigate();

  const handleGoHome = () => navigate("/");

  return (
    <div className="flex bg-[#f0d9e5] text-rose-900 m-6 rounded gap-8 items-center text-left h-48 w-auto">
      <div className="flex items-center justify-center text-2xl ml-4 h-10 w-10 text-[#fff] bg-rose-900 rounded-3xl ">
        !
      </div>
      <div className="flex flex-col">
        <h2 className="m-0 text-lg">{error.statusText || "Error"}</h2>
        <p className="m-0">{error.data || "You are not authorized."}</p>
        <button
          onClick={handleGoHome}
          className="mt-4 bg-rose-900 text-white py-2 px-4 rounded"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
