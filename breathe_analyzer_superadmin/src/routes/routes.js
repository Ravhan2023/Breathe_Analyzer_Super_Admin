import SuperAdmin from "../components/super-admin/SuperAdmin";
import Companies from "../components/super-admin/companies/Companies";
import Department from "../components/super-admin/department/Department";
import AdminDashboard from "../components/admin/AdminDashboard";
import MedicalResults from "../components/admin/medical-results/MedicalResults";
import StaffDashboard from "../components/medical-staff/StaffDashboard";
import ReportLogs from "../components/medical-staff/report-logs/ReportLogs";
import Admin from "../components/super-admin/admins/Admin";
import MedicalTeam from "../components/super-admin/medical-team/MedicalTeam";
import Shifts from "../components/super-admin/shifts/Shifts";
import MedicalReports from "../components/super-admin/medical-reports/MedicalReports";
import Staff from "../components/super-admin/staff/Staff";

const routes = {
  superAdmin: [
    { path: "super-admin", component: SuperAdmin },
    { path: "super-admin/companies", component: Companies },
    { path: "super-admin/departments", component: Department },
    { path: "super-admin/admins", component: Admin },
    { path: "super-admin/medical-team", component: MedicalTeam },
    { path: "super-admin/staff", component: Staff },
    { path: "super-admin/shifts", component: Shifts },
    { path: "super-admin/medical-reports", component: MedicalReports },
  ],
  admin: [
    { path: "admin", component: AdminDashboard },
    { path: "admin/medical-results", component: MedicalResults },
  ],
  medicalStaff: [
    { path: "medical-staff", component: StaffDashboard },
    { path: "medical-staff/report-logs", component: ReportLogs },
  ],
};

export default routes;
