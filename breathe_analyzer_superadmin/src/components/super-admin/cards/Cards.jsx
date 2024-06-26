import PropTypes from "prop-types";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import StreamIcon from "@mui/icons-material/Stream";

const Cards = ({ cardData }) => {
  const cardDetails = [
    {
      title: "Companies",
      field: "company_count",
      icon: <AirplanemodeActiveIcon />,
      color: "linear-gradient(to left,#00B9F2 0%, #1D3FB7 100%)",
    },
    {
      title: "Department",
      field: "department_count",
      icon: <ListIcon />,
      color: "linear-gradient(to left, #A5CD39 0%,  #31D277 100%)",
    },
    {
      title: "Admin",
      field: "admin_count",
      icon: <PeopleAltIcon />,
      color: "linear-gradient(to right, #4D44B5 0%, #A8A1FE 100%)",
    },
    {
      title: "Medical team",
      field: "staff_count",
      icon: <VaccinesIcon />,
      color: "linear-gradient(to right, #FFE925 0%, #827500 100%)",
    },
    {
      title: "Staff",
      field: "staff_count",
      icon: <StreamIcon />,
      color: "linear-gradient(to right,#FF4444 0%,  #FE8787 100%)",
    },
  ];

  return (
    <Grid container spacing={2} sx={{ p: 0 }}>
      {cardDetails.map((card) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={card.field}>
          <Card
            sx={{
              m: 2,
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
        </Grid>
      ))}
    </Grid>
  );
};

Cards.propTypes = {
  cardData: PropTypes.object.isRequired,
};

export default Cards;
