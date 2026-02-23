import { Button, Stack, Typography } from "@mui/material";
import { DateTime } from "luxon";
import { useMemo } from "react";
import { useAppSelector } from "../../../store/hooks";
import { type DraftServiceLog } from "../../../types";
import { Callout } from "../../shared";

interface DraftResumeCalloutProps {
  currentDraftId: string;
  onUseLatestDraft: (draft: DraftServiceLog) => void;
  onBrowseAllDrafts: () => void;
}

const DraftResumeCallout = ({
  currentDraftId,
  onUseLatestDraft,
  onBrowseAllDrafts,
}: DraftResumeCalloutProps) => {
  const allDrafts = useAppSelector((state) => state.serviceLogs.draftLogs);

  const previousDrafts = useMemo(
    () => allDrafts.filter((draft) => draft.draftId !== currentDraftId),
    [allDrafts, currentDraftId]
  );

  const latestDraft = useMemo(() => {
    if (previousDrafts.length === 0) {
      return null;
    }
    return previousDrafts.reduce((draft, current) =>
      DateTime.fromISO(current.updatedAt) > DateTime.fromISO(draft.updatedAt)
        ? current
        : draft
    );
  }, [previousDrafts]);

  const formattedDate = useMemo(
    () =>
      latestDraft
        ? DateTime.fromISO(latestDraft.updatedAt).toLocaleString(
            DateTime.DATETIME_SHORT
          )
        : "",
    [latestDraft]
  );

  if (!previousDrafts.length) {
    return null;
  }

  return (
    <Callout status="neutral" sx={{ mb: 2 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: "100%" }}
      >
        <Stack>
          <Typography variant="subtitle1" fontWeight={600}>
            Pick up where you left off
          </Typography>
          <Typography variant="body2" color="text.secondary">
            You have {previousDrafts.length} unsubmitted draft
            {previousDrafts.length > 1 ? "s" : ""}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            variant="contained"
            onClick={() => latestDraft && onUseLatestDraft(latestDraft)}
            sx={{
              textTransform: "none",
              whiteSpace: "nowrap",
            }}
          >
            Use latest draft · {formattedDate}
          </Button>
          <Button
            variant="text"
            onClick={onBrowseAllDrafts}
            sx={{
              textTransform: "none",
              color: "text.secondary",
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
          >
            Browse all drafts
          </Button>
        </Stack>
      </Stack>
    </Callout>
  );
};

export default DraftResumeCallout;
