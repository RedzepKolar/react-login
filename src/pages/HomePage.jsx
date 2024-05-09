import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";
import PageContent from "../components/PageContent";
import LoginCard from "../components/LoginCard";

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <PageContent>
      <LoginCard />
    </PageContent>
  );
}
