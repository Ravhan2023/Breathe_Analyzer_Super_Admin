import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import Cards from "./cards/Cards";
import { baseurl } from "../../api/api";
import { getAuthToken } from "../../api/Auth";

const StaffDashboard = () => {
  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const token = getAuthToken();
        const response = await axios.get(
          `${baseurl}/api/medical-dashboard-count/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `token ${token}`,
            },
          }
        );
        setCardData(response.data);
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };

    fetchCardData();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "row", p: 2 }}>
      {cardData && (
        <>
          <Box sx={{ flexGrow: 1 }}>
            <Cards cardData={cardData} />
          </Box>
          <Box sx={{ flexGrow: 1, mt: 2 }}>
            {/* Placeholder for the chart component */}
            <div
              style={{
                backgroundColor: "#e0e0e0",
              }}
            >
              Chart goes here
            </div>
          </Box>
        </>
      )}
    </Box>
  );
};

export default StaffDashboard;
