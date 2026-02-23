import { type GridColDef } from "@mui/x-data-grid";
import { ServiceTypeChip } from "../components/shared";

export const commonServiceLogColumns: GridColDef[] = [
  {
    field: "serviceOrder",
    headerName: "Service Order",
    width: 150,
  },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 120,
  },
  {
    field: "endDate",
    headerName: "End Date",
    width: 120,
  },
  {
    field: "type",
    headerName: "Service Type",
    width: 130,
    renderCell: (params) => <ServiceTypeChip type={params.value} />,
  },
  {
    field: "serviceDescription",
    headerName: "Description",
    width: 300,
    flex: 1,
  },
  {
    field: "odometer",
    headerName: "Odometer",
    width: 120,
    type: "number",
  },
  {
    field: "engineHours",
    headerName: "Engine Hours",
    width: 130,
    type: "number",
  },
  {
    field: "providerId",
    headerName: "Provider ID",
    width: 150,
  },
  {
    field: "carId",
    headerName: "Car ID",
    width: 120,
  },
];
