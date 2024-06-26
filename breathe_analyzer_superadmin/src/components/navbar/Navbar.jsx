import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import icon from "../../assets/dashboard.png";
import { baseurl } from "../../api/api";
import { getAuthToken, removeAuthToken } from "../../api/Auth";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../api/UserContext";
import { useContext } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const token = getAuthToken();
  const { setUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      // Call the logout API
      await fetch(`${baseurl}/api/logout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      });

      removeAuthToken();
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          position: "relative",
        }}
      >
        <Toolbar
          variant="dense"
          sx={{
            padding: "12px",
            background:
              "linear-gradient(180deg, #312E2E 0%, #686868 50%, #0C0C0C 100%)",
          }}
        >
          <img
            src=""
            alt="logo"
            width="150px"
            height="37.5px"
            style={{ cursor: "pointer" }}
          />
          <IconButton
            edge="start"
            color="inherit"
            aria-label="apps"
            sx={{ mr: 1, paddingLeft: "160px", width: "unset" }}
          >
            <img src={icon} alt="icon" width="20px" height="20px" />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Dashboard
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              sx={{ width: "unset" }}
              onClick={handleLogout}
            >
              <LogoutIcon />
            </IconButton>
            <Typography
              variant="body1"
              color="inherit"
              sx={{ cursor: "pointer" }}
              onClick={handleLogout}
            >
              Logout
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
