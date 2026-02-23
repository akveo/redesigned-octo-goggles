import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { borderRadius, borders, colorPalette } from "../../theme/colors";

interface StyledCardProps {
  variant?: "default" | "elevated" | "outlined";
  clickable?: boolean;
}

const StyledCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== "variant" && prop !== "clickable",
})<StyledCardProps>(({ theme, variant = "default", clickable = false }) => ({
  padding: theme.spacing(3),
  borderRadius: borderRadius.large,
  backgroundColor: colorPalette.background.paper,
  border: borders.light,
  boxShadow: "none",

  ...(clickable && {
    cursor: "pointer",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: theme.shadows[6],
      ...(variant === "outlined" && {
        borderColor: colorPalette.primary[300],
      }),
    },
    "&:active": {
      transform: "translateY(-2px)",
    },
  }),
}));

export default StyledCard;
