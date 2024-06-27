import { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/login/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import { UserContext } from "./api/UserContext";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import routes from "./routes/routes";

function App() {
  const { user } = useContext(UserContext);

  return (
    <Router>
      {user && <Navbar />}

      <div style={{ display: "flex", height: "calc(100vh - 64px)" }}>
        {user && <Sidebar />}
        <Routes>
          <Route path="/login" element={<Login />} />

          {routes.superAdmin.map(({ path, component: Component }) => (
            <Route
              key={path}
              path={`/${path}`}
              element={
                <ProtectedRoute allowedRoles={["Super Admin"]}>
                  <Component />
                </ProtectedRoute>
              }
            />
          ))}

          {routes.admin.map(({ path, component: Component }) => (
            <Route
              key={path}
              path={`/${path}`}
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <Component />
                </ProtectedRoute>
              }
            />
          ))}

          {routes.medicalStaff.map(({ path, component: Component }) => (
            <Route
              key={path}
              path={`/${path}`}
              element={
                <ProtectedRoute allowedRoles={["Medical Staff"]}>
                  <Component />
                </ProtectedRoute>
              }
            />
          ))}

          <Route
            path="/"
            element={
              user ? (
                <Navigate
                  to={`/${user.user_type.replace(" ", "-").toLowerCase()}`}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
