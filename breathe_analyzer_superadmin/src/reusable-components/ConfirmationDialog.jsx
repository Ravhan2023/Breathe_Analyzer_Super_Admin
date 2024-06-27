import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import {
  CheckCircleOutline as SuccessIcon,
  ErrorOutline as ErrorIcon,
} from "@mui/icons-material";

const ConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  severity = "success",
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        sx={{
          color: severity === "error" ? "red" : "green",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {severity === "error" ? (
          <ErrorIcon sx={{ fontSize: 40, marginBottom: 1 }} />
        ) : (
          <SuccessIcon sx={{ fontSize: 40, marginBottom: 1 }} />
        )}
        {severity === "error" ? "Error" : "Success"}
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="body1" align="center">
            {message}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button
          onClick={onClose}
          variant="contained"
          color="inherit"
          sx={{ color: severity === "error" ? "red" : "green" }}
        >
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="contained" color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  severity: PropTypes.oneOf(["success", "error"]),
};

export default ConfirmationDialog;
