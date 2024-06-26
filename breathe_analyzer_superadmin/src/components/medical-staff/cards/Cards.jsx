import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Typography, Box } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

const Cards = ({ cardData }) => {
  const cardDetails = [
    {
      title: "Companies",
      field: "companies_count",
      icon: <AirplanemodeActiveIcon />,
      color: "linear-gradient(to left,#00B9F2 0%, #1D3FB7 100%)",
    },
    {
      title: "Department",
      field: "departments_count",
      icon: <ListIcon />,
      color: "linear-gradient(to left, #A5CD39 0%,  #31D277 100%)",
    },
    {
      title: "Admin",
      field: "staff_count",
      icon: <PeopleAltIcon />,
      color: "linear-gradient(to right, #4D44B5 0%, #A8A1FE 100%)",
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ display: "flex", gap: 2 }}>
        {cardDetails.slice(0, 2).map((card) => (
          <Card
            key={card.field}
            sx={{
              flex: 1,
              height: 120,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              background: card.color,
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "50%",
                      padding: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ ml: 2, color: "white", fontWeight: "bold" }}
                  >
                    {card.title}
                  </Typography>
                </Box>
                <Typography
                  variant="h4"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  {cardData[card.field]}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Card
          sx={{
            width: 240,
            height: 120,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background: cardDetails[2].color,
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "50%",
                    padding: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {cardDetails[2].icon}
                </Box>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ ml: 2, color: "white", fontWeight: "bold" }}
                >
                  {cardDetails[2].title}
                </Typography>
              </Box>
              <Typography
                variant="h4"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                {cardData[cardDetails[2].field]}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

Cards.propTypes = {
  cardData: PropTypes.object.isRequired,
};

export default Cards;
