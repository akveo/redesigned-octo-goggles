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
import { DateTime } from "luxon";
import { useMemo, useState } from "react";
import { borderRadius, borders } from "../theme/colors";
import { DEFAULT_TRANSITION } from "../theme/theme";
import { type DraftServiceLog } from "../types";
import { commonServiceLogColumns } from "../utils/tableUtils";
import { DeleteConfirmationDialog, FilterInput, StyledCard } from "./shared";

type LogDraftsTableMode = "select" | "view";

interface LogDraftsTableProps {
  drafts: DraftServiceLog[];
  mode: LogDraftsTableMode;
  onSelectDraft?: (draft: DraftServiceLog) => void;
  onDeleteDraft?: (draftId: string) => void;
  onEditDraft?: (draft: DraftServiceLog) => void;
  onDeleteAllDrafts?: () => void;
}

const LogDraftsTable = ({
  drafts,
  mode,
  onSelectDraft,
  onDeleteDraft,
  onEditDraft,
  onDeleteAllDrafts,
}: LogDraftsTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteAllDialogOpen, setIsDeleteAllDialogOpen] = useState(false);

  const filteredDrafts = useMemo(() => {
    if (!searchTerm) return drafts;

    const lowerSearch = searchTerm.toLowerCase();
    return drafts.filter((draft) => {
      return (
        draft.draftId.toLowerCase().includes(lowerSearch) ||
        draft.serviceOrder.toLowerCase().includes(lowerSearch) ||
        draft.carId.toLowerCase().includes(lowerSearch) ||
        draft.providerId.toLowerCase().includes(lowerSearch)
      );
    });
  }, [drafts, searchTerm]);

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
        const draft = params.row as DraftServiceLog;

        if (mode === "select") {
          return (
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ height: "100%" }}
            >
              <Button
                size="small"
                variant="contained"
                onClick={() => onSelectDraft?.(draft)}
              >
                Select
              </Button>
              <IconButton
                size="small"
                onClick={() => onDeleteDraft?.(draft.draftId)}
                sx={{ color: "text.secondary" }}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Stack>
          );
        }

        if (mode === "view") {
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
                onClick={() => onEditDraft?.(draft)}
              >
                Edit
              </Button>
              <IconButton
                size="small"
                onClick={() => onDeleteDraft?.(draft.draftId)}
                sx={{ color: "text.secondary" }}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Stack>
          );
        }

        return null;
      },
    },
    {
      field: "updatedAt",
      headerName: "Last Updated",
      width: 180,
      valueFormatter: (value) => {
        return DateTime.fromISO(value).toLocaleString(DateTime.DATETIME_SHORT);
      },
    },
    ...commonServiceLogColumns,
  ];

  if (drafts.length === 0) {
    return (
      <StyledCard
        sx={{ width: "100%", maxWidth: "100%", boxSizing: "border-box" }}
      >
        <Box sx={{ py: 8, textAlign: "center" }}>
          <Typography variant="h6" color="text.secondary">
            No drafts found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Start creating a service log to see drafts here
          </Typography>
        </Box>
      </StyledCard>
    );
  }

  return (
    <>
      <Fade in={true} timeout={DEFAULT_TRANSITION}>
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
            <Stack direction="row" spacing={2} alignItems="center">
              {drafts.length > 0 && (
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => setIsDeleteAllDialogOpen(true)}
                >
                  Delete All Drafts
                </Button>
              )}
            </Stack>
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
              rows={filteredDrafts}
              columns={columns}
              getRowId={(row) => row.draftId}
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
      <DeleteConfirmationDialog
        open={isDeleteAllDialogOpen}
        onClose={() => setIsDeleteAllDialogOpen(false)}
        onConfirm={() => {
          onDeleteAllDrafts?.();
          setIsDeleteAllDialogOpen(false);
        }}
        title="Delete all drafts"
        description={`Are you sure you want to delete all ${
          drafts.length
        } draft${drafts.length > 1 ? "s" : ""}? This action cannot be undone.`}
      />
    </>
  );
};

export default LogDraftsTable;
