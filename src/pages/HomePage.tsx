import { Stack } from "@mui/material";
import { useState } from "react";
import ControlPanel from "../components/ControlPanel";
import { PageLayout } from "../components/layout";
import ServiceLogForm, {
  type ServiceLogFormData,
} from "../components/serviceLogForm/ServiceLogForm";
import ServiceLogsTable from "../components/ServiceLogsTable";
import {
  DeleteConfirmationDialog,
  Dialog,
  PageTitle,
} from "../components/shared";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  addServiceLog,
  deleteServiceLog,
  updateServiceLog,
} from "../store/slices/serviceLogsSlice";
import { type ServiceLog } from "../types";

const HomePage = () => {
  const logs = useAppSelector((store) => store.serviceLogs.logs);
  const dispatch = useAppDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLog, setEditingLog] = useState<ServiceLog | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [logToDelete, setLogToDelete] = useState<string | null>(null);

  const handleCreateLog = () => {
    setEditingLog(null);
    setIsDialogOpen(true);
  };

  const handleEditLog = (log: ServiceLog) => {
    setEditingLog(log);
    setIsDialogOpen(true);
  };

  const handleDeleteLog = (logId: string) => {
    setLogToDelete(logId);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (logToDelete) {
      dispatch(deleteServiceLog(logToDelete));
      setLogToDelete(null);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingLog(null);
  };

  const handleSubmitLog = (data: ServiceLogFormData) => {
    if (editingLog) {
      const updatedLog: ServiceLog = {
        ...data,
        id: editingLog.id,
      };
      dispatch(updateServiceLog(updatedLog));
    } else {
      const newLog: ServiceLog = {
        ...data,
        id: `log-${Date.now()}`,
      };
      dispatch(addServiceLog(newLog));
    }
    setIsDialogOpen(false);
    setEditingLog(null);
  };

  return (
    <PageLayout>
      <Stack
        spacing={4}
        sx={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}
      >
        <Stack spacing={2}>
          <PageTitle title="Weekly Overview" />
          <ControlPanel logs={logs} onCreateLog={handleCreateLog} />
        </Stack>
        <ServiceLogsTable
          logs={logs}
          onEditLog={handleEditLog}
          onDeleteLog={handleDeleteLog}
        />
      </Stack>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog} hideCloseButton>
        <ServiceLogForm
          mode={editingLog ? "edit" : "create"}
          onSubmit={handleSubmitLog}
          onCancel={handleCloseDialog}
          initialData={editingLog || undefined}
        />
      </Dialog>

      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete log"
        description="Are you sure you want to delete this log? This action cannot be undone."
      />
    </PageLayout>
  );
};

export default HomePage;
