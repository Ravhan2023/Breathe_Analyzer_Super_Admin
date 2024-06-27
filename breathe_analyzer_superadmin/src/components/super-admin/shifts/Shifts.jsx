import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Box,
  Switch,
  Button,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import ConfirmationDialog from "../../../reusable-components/ConfirmationDialog";
import ReusableDialog from "../../../reusable-components/ReusableDialog";
import { baseurl } from "../../../api/api";
import { getAuthToken } from "../../../api/Auth";

const Shifts = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("All Companies");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogSeverity, setDialogSeverity] = useState("success");
  const [dialogMessage, setDialogMessage] = useState("");
  const [companyIdToDelete, setCompanyIdToDelete] = useState(null);
  const [companyNameToDelete, setCompanyNameToDelete] = useState("");
  const [openAddDialog, setOpenAddDialog] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${baseurl}/api/departments/`, {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const uniqueCompanyNames = [
    "All Companies",
    ...new Set(data.map((company) => company.company_name)),
  ];

  const filteredData = data.filter((company) => {
    return (
      (selectedCompany === "All Companies" ||
        company.company_name === selectedCompany) &&
      company.name_of_SPOC.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleDelete = async () => {
    try {
      const token = getAuthToken();
      await axios.delete(`${baseurl}/api/companies/${companyIdToDelete}/`, {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      setDialogSeverity("success");
      setDialogMessage("Company deleted successfully.");
      setOpenDialog(true);
      fetchData();
    } catch (error) {
      console.error("Error deleting company:", error);
      setDialogSeverity("error");
      setDialogMessage("Failed to delete company.");
      setOpenDialog(true);
    }
  };

  const openDeleteConfirmation = (companyId, companyName) => {
    setCompanyIdToDelete(companyId);
    setCompanyNameToDelete(companyName);
    setDialogSeverity("error");
    setDialogMessage(`Are you sure you want to delete ${companyName}?`);
    setOpenDialog(true);
  };

  const handleAddCompany = async (company) => {
    try {
      const token = getAuthToken();
      await axios.post(`${baseurl}/api/companies/`, company, {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      fetchData();
    } catch (error) {
      console.error("Error adding company:", error);
    }
  };

  return (
    <Box sx={{ mt: 2, padding: 2, width: "100%", overflowX: "auto" }}>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <div>
          <TextField
            label="Search SPOC..."
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <TextField
            select
            label="Select Company"
            variant="outlined"
            size="small"
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            style={{ marginRight: "8px", width: "200px" }}
          >
            {uniqueCompanyNames.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            sx={{ width: "150px", ml: 2 }}
            onClick={() => setOpenAddDialog(true)}
          >
            Add New
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: "150px", ml: 2 }}
          >
            Export
          </Button>
        </div>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          mt: 2,
          boxShadow:
            "4px 4px 20px rgba(0, 0, 0, 0.05), -4px 4px 20px rgba(0, 0, 0, 0.05), 0px 4px 20px rgba(0, 0, 0, 0.05)",
          borderRadius: "8px",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SL.No.</TableCell>
              <TableCell>Department ID</TableCell>
              <TableCell>Department Name</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Name of SPOC</TableCell>
              {/* <TableCell>Total Staff</TableCell> */}
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow key={row.department_id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.department_id}</TableCell>
                <TableCell>{row.department_name}</TableCell>
                <TableCell>{row.company}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>{row.contact_number}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.name_of_SPOC}</TableCell>
                {/* <TableCell>{row.total_staff}</TableCell> */}
                <TableCell>
                  <Switch checked={row.status} />
                </TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() =>
                      openDeleteConfirmation(row.company_id, row.company_name)
                    }
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmationDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={() => {
          handleDelete(companyIdToDelete);
          setOpenDialog(false);
        }}
        title={dialogSeverity === "error" ? "Error" : "Success"}
        message={dialogMessage}
        severity={dialogSeverity}
      />
      <ReusableDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onSubmit={handleAddCompany}
        title="Add Company"
        fields={[
          { name: "company_name", label: "Company Name", required: true },
          { name: "location", label: "Location", required: true },
          { name: "contact_number", label: "Contact Number", required: true },
          { name: "email", label: "Email", required: true },
          { name: "name_of_SPOC", label: "Name of SPOC", required: true },
        ]}
      />
    </Box>
  );
};

export default Shifts;
