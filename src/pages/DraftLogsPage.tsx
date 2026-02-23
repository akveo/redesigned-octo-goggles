import { Stack } from "@mui/material";
import { useState } from "react";
import { PageLayout } from "../components/layout";
import LogDraftsTable from "../components/LogDraftsTable";
import ServiceLogForm, {
  type ServiceLogFormData,
} from "../components/serviceLogForm/ServiceLogForm";
import { DeleteConfirmationDialog, Dialog, PageTitle } from "../components/shared";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addServiceLog, clearAllDrafts, deleteDraft } from "../store/slices/serviceLogsSlice";
import { type DraftServiceLog, type ServiceLog } from "../types";

const DraftLogsPage = () => {
  const drafts = useAppSelector((state) => state.serviceLogs.draftLogs);
  const dispatch = useAppDispatch();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedDraft, setSelectedDraft] = useState<DraftServiceLog | null>(
    null
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [draftToDelete, setDraftToDelete] = useState<string | null>(null);

  const handleEditDraft = (draft: DraftServiceLog) => {
    setSelectedDraft(draft);
    setIsEditDialogOpen(true);
  };

  const handleDeleteDraft = (draftId: string) => {
    setDraftToDelete(draftId);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (draftToDelete) {
      dispatch(deleteDraft(draftToDelete));
      setDraftToDelete(null);
    }
  };

  const handleDeleteAllDrafts = () => {
    dispatch(clearAllDrafts());
  };

  const handleCloseDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedDraft(null);
  };

  const handleSubmitLog = (data: ServiceLogFormData) => {
    const newLog: ServiceLog = {
      ...data,
      id: `log-${Date.now()}`,
    };
    if (selectedDraft) {
      dispatch(deleteDraft(selectedDraft.draftId));
    }
    dispatch(addServiceLog(newLog));
    setIsEditDialogOpen(false);
    setSelectedDraft(null);
  };

  return (
    <PageLayout>
      <Stack
        spacing={4}
        sx={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}
      >
        <PageTitle
          title="Draft Logs"
          description="View and manage your unsubmitted service log drafts"
        />

        <LogDraftsTable
          drafts={drafts}
          mode="view"
          onEditDraft={handleEditDraft}
          onDeleteDraft={handleDeleteDraft}
          onDeleteAllDrafts={handleDeleteAllDrafts}
        />
      </Stack>

      {selectedDraft && (
        <Dialog
          open={isEditDialogOpen}
          onClose={handleCloseDialog}
          hideCloseButton
        >
          <ServiceLogForm
            mode="create"
            onSubmit={handleSubmitLog}
            onCancel={handleCloseDialog}
            initialData={{
              providerId: selectedDraft.providerId,
              serviceOrder: selectedDraft.serviceOrder,
              carId: selectedDraft.carId,
              odometer: selectedDraft.odometer,
              engineHours: selectedDraft.engineHours,
              startDate: selectedDraft.startDate,
              endDate: selectedDraft.endDate,
              type: selectedDraft.type,
              serviceDescription: selectedDraft.serviceDescription,
            }}
          />
        </Dialog>
      )}

      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete draft"
        description="Are you sure you want to delete this draft? This action cannot be undone."
      />
    </PageLayout>
  );
};

export default DraftLogsPage;
