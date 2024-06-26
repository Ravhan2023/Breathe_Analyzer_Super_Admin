import { baseurl } from "../../api/api";
import { useState, useEffect } from "react";
import Cards from "./cards/Cards";
import Box from "@mui/material/Box";
import axios from "axios";
import { getAuthToken } from "../../api/Auth";

const SuperAdmin = () => {
  const [cardData, setCardData] = useState(null);
  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const token = getAuthToken();
        const response = await axios.get(
          `${baseurl}/api/super-admin-dashboard-data/`,
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
    <>
      <Box sx={{ display: "flex"}}>
        <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
          {cardData && (
            <>
              <Cards cardData={cardData} />
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default SuperAdmin;
