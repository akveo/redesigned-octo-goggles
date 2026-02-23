import { Check } from "@mui/icons-material";
import { CircularProgress, Typography } from "@mui/material";
import { Callout } from "../shared";

interface DraftStatusCalloutProps {
  hasStartedEditing: boolean;
  saveStatus: "saving" | "saved";
}

const DraftStatusCallout = ({
  hasStartedEditing,
  saveStatus,
}: DraftStatusCalloutProps) => {
  if (!hasStartedEditing) {
    return null;
  }

  return (
    <Callout status={saveStatus === "saved" ? "success" : "neutral"}>
      {saveStatus === "saving" && (
        <>
          <CircularProgress size={16} />
          <Typography variant="body2" color="text.secondary">
            Saving draft...
          </Typography>
        </>
      )}
      {saveStatus === "saved" && (
        <>
          <Check sx={{ fontSize: 16, color: "success.main" }} />
          <Typography variant="body2" color="success.main">
            Draft saved
          </Typography>
        </>
      )}
    </Callout>
  );
};

export default DraftStatusCallout;
