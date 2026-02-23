import { Box, type SxProps, type Theme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { type ReactNode } from "react";
import { borderRadius, colorPalette } from "../../theme/colors";

type CalloutStatus = "neutral" | "success" | "warning" | "error" | "info";

const getStatusColor = (status: CalloutStatus) => {
  switch (status) {
    case "success":
      return colorPalette.success[50];
    case "warning":
      return colorPalette.warning[50];
    case "error":
      return colorPalette.error[50];
    case "info":
      return colorPalette.info[50];
    case "neutral":
    default:
      return colorPalette.grey[50];
  }
};

const StyledCallout = styled(Box, {
  shouldForwardProp: (prop) => prop !== "status",
})<{ status: CalloutStatus }>(({ theme, status }) => {
  const backgroundColor = getStatusColor(status);

  return {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    padding: theme.spacing(1, 2),
    backgroundColor,
    borderRadius: borderRadius.large,
  };
});

interface CalloutProps {
  children: ReactNode;
  status?: CalloutStatus;
  sx?: SxProps<Theme>;
}

const Callout = ({ children, status = "neutral", sx }: CalloutProps) => {
  return (
    <StyledCallout status={status} sx={sx}>
      {children}
    </StyledCallout>
  );
};

export default Callout;
