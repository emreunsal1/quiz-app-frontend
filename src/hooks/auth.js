import { useHistory, useLocation } from "react-router-dom";

export const useAuth = () => {
  const history = useHistory();
  const location = useLocation();
  if (location.pathname.includes("admin")) {
    const local = localStorage.getItem("token");
    if (!local) {
      history.push("/");
    }
  }
};
export const useAdminController = () => {
  const history = useHistory();
  const location = useLocation();
  if (!location.pathname.includes("admin")) {
    const local = localStorage.getItem("token");
    if (local) {
      history.goBack();
    }
  }
};
