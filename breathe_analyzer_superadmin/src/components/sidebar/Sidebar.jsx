import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import EngineeringIcon from "@mui/icons-material/Engineering";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../api/UserContext";

const drawerWidth = 260;

const menuItems = {
  "Super Admin": [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Companies", icon: <GroupIcon />, path: "/users" },
    { text: "Departments", icon: <SettingsIcon />, path: "/settings" },
    { text: "Admins", icon: <SettingsIcon />, path: "/settings" },
    { text: "Medical Team", icon: <SettingsIcon />, path: "/settings" },
    { text: "Staff", icon: <SettingsIcon />, path: "/settings" },
    { text: "Shifts", icon: <SettingsIcon />, path: "/settings" },
    { text: "Medical Reports", icon: <SettingsIcon />, path: "/settings" }
  ],
  "Admin": [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    {
      text: "Staff",
      icon: <EngineeringIcon />,
      path: "/professionals",
    },
    { text: "Medical Results", icon: <ApartmentIcon />, path: "/materials" },
    // Add more items as needed
  ],
  "Medical Staff": [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Walk In BA Test", icon: <LibraryBooksIcon />, path: "/bookstore" },
    { text: "Report Logs", icon: <EventAvailableIcon />, path: "/events" },
    { text: "Equipments", icon: <EventAvailableIcon />, path: "/events" },
    // Add more items as needed
  ],
};

function Sidebar() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const drawer = (
    <div>
      <List>
        {user &&
          menuItems[user.user_type]?.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                sx={{
                  padding: "10px 16px",
                  "&:hover": {
                    backgroundColor: "#606060",
                    color: "white",
                  },
                }}
                onClick={() => {
                  navigate(item.path);
                }}
              >
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} sx={{ color: "white" }} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              height: "calc(100vh - 64px)",
              position: "relative",
              background:
                "linear-gradient(to bottom, #2F2F2F, #606060, #000000)",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default Sidebar;
