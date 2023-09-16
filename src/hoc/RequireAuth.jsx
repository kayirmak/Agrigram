import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";

function RequireAuth() {
  const location = useLocation();
  const isAuth = useSelector(state => state.auth.isAuth);

  if (!isAuth) {
    return <Navigate to="/auth" state={{from: location}} />
  }

  return <Outlet />;
}

export default RequireAuth;
