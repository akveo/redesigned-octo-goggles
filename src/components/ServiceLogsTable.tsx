import { Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Fade,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import { borderRadius, borders } from "../theme/colors";
import { type ServiceLog } from "../types";
import { commonServiceLogColumns } from "../utils/tableUtils";
import { FilterInput, StyledCard } from "./shared";

interface ServiceLogsTableProps {
  logs: ServiceLog[];
  onEditLog?: (log: ServiceLog) => void;
  onDeleteLog?: (logId: string) => void;
}

const ServiceLogsTable = ({
  logs,
  onEditLog,
  onDeleteLog,
}: ServiceLogsTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLogs = useMemo(() => {
    if (!searchTerm) return logs;

    const lowerSearch = searchTerm.toLowerCase();
    return logs.filter((log) => {
      return (
        log.id.toLowerCase().includes(lowerSearch) ||
        log.serviceOrder.toLowerCase().includes(lowerSearch) ||
        log.carId.toLowerCase().includes(lowerSearch) ||
        log.providerId.toLowerCase().includes(lowerSearch)
      );
    });
  }, [logs, searchTerm]);

  const columns: GridColDef[] = [
    {
      field: "actions",
      headerName: "Actions",
      width: 140,
      sortable: false,
      filterable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const log = params.row as ServiceLog;
        return (
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ height: "100%" }}
          >
            <Button
              size="small"
              variant="outlined"
              onClick={() => onEditLog?.(log)}
            >
              Edit
            </Button>
            <IconButton
              size="small"
              onClick={() => onDeleteLog?.(log.id)}
              sx={{ color: "text.secondary" }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Stack>
        );
      },
    },
    ...commonServiceLogColumns,
  ];
  return (
    <Fade in={true} timeout={600}>
      <StyledCard
        sx={{
          padding: 0,
          width: "100%",
          maxWidth: "100%",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            px: 2.5,
            py: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Typography variant="h5">Service Logs</Typography>
          <FilterInput value={searchTerm} onChange={setSearchTerm} />
        </Box>
        <Box
          sx={{
            height: 400,
            width: "100%",
            maxWidth: "100%",
            overflow: "auto",
          }}
        >
          <DataGrid
            rows={filteredLogs}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 25]}
            disableRowSelectionOnClick
            disableColumnMenu
            sx={{
              border: "none",
              borderTop: borders.light,
              borderRadius: borderRadius.large,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              "& .MuiDataGrid-columnHeaders": {
                position: "sticky",
                top: 0,
                zIndex: 1,
              },
            }}
          />
        </Box>
      </StyledCard>
    </Fade>
  );
};

export default ServiceLogsTable;
