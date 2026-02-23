import { Button, Fade } from "@mui/material";
import { styled } from "@mui/material/styles";
import { type ReactNode } from "react";
import { borderRadius, colorPalette } from "../../theme/colors";
import { DEFAULT_TRANSITION } from "../../theme/theme";

interface CardButtonProps {
  onClick: () => void;
  children: ReactNode;
  startIcon?: ReactNode;
}

const StyledCardButton = styled(Button)(({ theme }) => ({
  backgroundColor: colorPalette.primary.main,
  color: colorPalette.primary[900],
  padding: theme.spacing(2, 4),
  fontSize: "1.125rem",
  fontWeight: 600,
  borderRadius: borderRadius.large,
  minWidth: 200,
  maxWidth: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.5),
  textTransform: "none",
  boxShadow: `0 2px 8px ${colorPalette.primary[300]}40`,
  boxSizing: "border-box",
  transition: theme.transitions.create([
    "transform",
    "box-shadow",
    "background-color",
  ]),
  "&:hover": {
    backgroundColor: colorPalette.primary.light,
    transform: "translateY(-4px)",
    boxShadow: `0 8px 20px ${colorPalette.primary[400]}60`,
  },
  "&:active": {
    transform: "translateY(-2px)",
    backgroundColor: colorPalette.primary[600],
  },
  "&:focus-visible": {
    outline: `3px solid ${colorPalette.primary[300]}`,
    outlineOffset: "2px",
  },
}));

const CardButton = ({ onClick, children, startIcon }: CardButtonProps) => {
  return (
    <Fade in={true} timeout={DEFAULT_TRANSITION}>
      <StyledCardButton
        variant="contained"
        onClick={onClick}
        startIcon={startIcon}
      >
        {children}
      </StyledCardButton>
    </Fade>
  );
};

export default CardButton;
