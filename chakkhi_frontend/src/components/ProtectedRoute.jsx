import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ roles, children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  console.log("isAuthenticated, user ", isAuthenticated, user);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Redirect to unauthorized page if the role doesn't match
  if (roles && !roles.includes(user?.role)) {
    return <Navigate to="/unauthorized" />;
  }

  // Render children or fallback to Outlet
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
