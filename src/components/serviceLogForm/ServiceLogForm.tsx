import { yupResolver } from "@hookform/resolvers/yup";
import { Button, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { DateTime } from "luxon";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteDraft, saveDraft } from "../../store/slices/serviceLogsSlice";
import { type DraftServiceLog, type ServiceType } from "../../types";
import LogDraftsTable from "../LogDraftsTable";
import { Dialog, ServiceTypeChip } from "../shared";
import DraftResumeCallout from "./components/DraftResumeCallout";
import ControlledTextField from "./ControlledTextField";
import DraftStatusCallout from "./DraftStatusCallout";

export interface ServiceLogFormData {
  providerId: string;
  serviceOrder: string;
  carId: string;
  odometer: number;
  engineHours: number;
  startDate: string;
  endDate: string;
  type: ServiceType;
  serviceDescription: string;
}

const schema = yup.object().shape({
  providerId: yup.string().required("Provider ID is required"),
  serviceOrder: yup.string().required("Service Order is required"),
  carId: yup.string().required("Car ID is required"),
  odometer: yup
    .number()
    .typeError("Odometer must be a number")
    .required("Odometer reading is required")
    .positive("Odometer must be positive")
    .integer("Odometer must be an integer"),
  engineHours: yup
    .number()
    .typeError("Engine hours must be a number")
    .required("Engine hours is required")
    .positive("Engine hours must be positive"),
  startDate: yup.string().required("Start date is required"),
  endDate: yup
    .string()
    .required("End date is required")
    .test(
      "is-after-start",
      "End date must be after start date",
      function (value) {
        const { startDate } = this.parent;
        if (!startDate || !value) return true;
        return new Date(value) >= new Date(startDate);
      }
    ),
  type: yup
    .string()
    .oneOf(
      ["maintenance", "repair", "inspection", "other"],
      "Invalid service type"
    )
    .required("Service type is required"),
  serviceDescription: yup
    .string()
    .required("Service description is required")
    .min(10, "Description must be at least 10 characters"),
});

interface ServiceLogFormProps {
  mode: "create" | "edit";
  onSubmit: (data: ServiceLogFormData) => void;
  onCancel: () => void;
  initialData?: Partial<ServiceLogFormData>;
}
const ServiceLogForm = ({
  mode,
  onSubmit,
  onCancel,
  initialData,
}: ServiceLogFormProps) => {
  const dispatch = useAppDispatch();
  const allDrafts = useAppSelector((state) => state.serviceLogs.draftLogs);
  const [draftId, setDraftId] = useState(`draft-${Date.now()}`);
  const [saveStatus, setSaveStatus] = useState<"saving" | "saved">("saved");
  const [hasStartedEditing, setHasStartedEditing] = useState(false);
  const [isBrowseDraftsOpen, setIsBrowseDraftsOpen] = useState(false);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    getValues,
    setValue,
    reset,
  } = useForm<ServiceLogFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      providerId: initialData?.providerId || "",
      serviceOrder: initialData?.serviceOrder || "",
      carId: initialData?.carId || "",
      odometer: initialData?.odometer || 0,
      engineHours: initialData?.engineHours || 0,
      startDate: initialData?.startDate || DateTime.now().toISODate()!,
      endDate:
        initialData?.endDate || DateTime.now().plus({ days: 1 }).toISODate()!,
      type: initialData?.type || "maintenance",
      serviceDescription: initialData?.serviceDescription || "",
    },
  });

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "startDate" && value.startDate) {
        const nextDay = DateTime.fromISO(value.startDate)
          .plus({ days: 1 })
          .toISODate()!;
        setValue("endDate", nextDay);
      }

      if (!isDirty) {
        return;
      }

      setHasStartedEditing(true);

      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      setSaveStatus("saving");

      saveTimeoutRef.current = setTimeout(() => {
        const formValues = getValues();
        const draft: DraftServiceLog = {
          ...formValues,
          draftId,
          updatedAt: DateTime.now().toISO()!,
        };
        dispatch(saveDraft(draft));
        setSaveStatus("saved");
      }, 500);
    });

    return () => subscription.unsubscribe();
  }, [watch, draftId, dispatch, isDirty, getValues, setValue]);

  const handleFormSubmit = (data: ServiceLogFormData) => {
    dispatch(deleteDraft(draftId));
    onSubmit(data);
  };

  const useDataFromDraft = (draft: DraftServiceLog) => {
    setDraftId(draft.draftId);
    reset({
      ...draft,
    });
  };

  const handleBrowseAllDrafts = () => {
    setIsBrowseDraftsOpen(true);
  };

  const handleSelectDraft = (draft: DraftServiceLog) => {
    useDataFromDraft(draft);
    setIsBrowseDraftsOpen(false);
  };

  const handleDeleteDraft = (draftId: string) => {
    dispatch(deleteDraft(draftId));
  };

  const handleCloseBrowseDrafts = () => {
    setIsBrowseDraftsOpen(false);
  };

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      noValidate
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ paddingBottom: 2, minHeight: "3.375rem" }}
      >
        <Typography variant="h5">
          {mode === "create" ? "Create Service Log" : "Edit Service Log"}
        </Typography>

        <DraftStatusCallout
          hasStartedEditing={hasStartedEditing}
          saveStatus={saveStatus}
        />
      </Stack>
      {!initialData && (
        <DraftResumeCallout
          currentDraftId={draftId}
          onUseLatestDraft={useDataFromDraft}
          onBrowseAllDrafts={handleBrowseAllDrafts}
        />
      )}
      <Stack spacing={3}>
        <Stack direction="row" spacing={2}>
          <ControlledTextField
            name="providerId"
            control={control}
            label="Provider ID"
            error={!!errors.providerId}
            helperText={errors.providerId?.message}
          />
          <ControlledTextField
            name="serviceOrder"
            control={control}
            label="Service Order"
            error={!!errors.serviceOrder}
            helperText={errors.serviceOrder?.message}
          />
        </Stack>

        <Stack direction="row" spacing={2}>
          <ControlledTextField
            name="carId"
            control={control}
            label="Car ID"
            error={!!errors.carId}
            helperText={errors.carId?.message}
          />
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Service Type"
                fullWidth
                error={!!errors.type}
                helperText={errors.type?.message}
                SelectProps={{
                  renderValue: (value) => (
                    <ServiceTypeChip type={value as ServiceType} />
                  ),
                }}
              >
                <MenuItem value="maintenance">
                  <ServiceTypeChip type="maintenance" />
                </MenuItem>
                <MenuItem value="repair">
                  <ServiceTypeChip type="repair" />
                </MenuItem>
                <MenuItem value="inspection">
                  <ServiceTypeChip type="inspection" />
                </MenuItem>
                <MenuItem value="other">
                  <ServiceTypeChip type="other" />
                </MenuItem>
              </TextField>
            )}
          />
        </Stack>

        <Stack direction="row" spacing={2}>
          <ControlledTextField
            name="odometer"
            control={control}
            label="Odometer"
            type="number"
            error={!!errors.odometer}
            helperText={errors.odometer?.message}
          />
          <ControlledTextField
            name="engineHours"
            control={control}
            label="Engine Hours"
            type="number"
            error={!!errors.engineHours}
            helperText={errors.engineHours?.message}
          />
        </Stack>

        <Stack direction="row" spacing={2}>
          <ControlledTextField
            name="startDate"
            control={control}
            label="Start Date"
            type="date"
            error={!!errors.startDate}
            helperText={errors.startDate?.message}
          />
          <ControlledTextField
            name="endDate"
            control={control}
            label="End Date"
            type="date"
            error={!!errors.endDate}
            helperText={errors.endDate?.message}
            htmlInputProps={{
              min: watch("startDate") || undefined,
            }}
          />
        </Stack>

        <ControlledTextField
          name="serviceDescription"
          control={control}
          label="Service Description"
          error={!!errors.serviceDescription}
          helperText={errors.serviceDescription?.message}
          textFieldProps={{
            multiline: true,
            rows: 3,
          }}
        />

        <Stack direction="row" spacing={2} sx={{ pt: 2 }}>
          <Button type="submit" variant="contained" fullWidth size="large">
            {mode === "create" ? "Create Service Log" : "Update Service Log"}
          </Button>
          <Button
            type="button"
            variant="outlined"
            onClick={onCancel}
            fullWidth
            size="large"
          >
            Cancel
          </Button>
        </Stack>
      </Stack>

      <Dialog
        title="Browse All Drafts"
        open={isBrowseDraftsOpen}
        onClose={handleCloseBrowseDrafts}
      >
        <LogDraftsTable
          drafts={allDrafts}
          mode="select"
          onSelectDraft={handleSelectDraft}
          onDeleteDraft={handleDeleteDraft}
        />
      </Dialog>
    </Stack>
  );
};

export default ServiceLogForm;
