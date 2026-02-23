import { AppBar, Slide, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { borders, colorPalette } from "../../theme/colors";
import { TOOLBAR_HEIGHT, TRANSITION_DEFAULT_DURATION } from "../../theme/theme";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backdropFilter: "blur(10px)",
  backgroundColor: "rgba(255, 255, 255, 0.6)",
  boxShadow: "none",
  borderBottom: borders.light,
  transition: theme.transitions.create(["background-color", "box-shadow"], {
    duration: theme.transitions.duration.standard,
  }),
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(0, 3),
  minHeight: TOOLBAR_HEIGHT,
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0, 2),
    minHeight: 56,
  },
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: colorPalette.primary.main,
  letterSpacing: "-0.02em",
  transition: theme.transitions.create("color"),
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

const Header = () => {
  return (
    <Slide direction="down" in={true} timeout={TRANSITION_DEFAULT_DURATION}>
      <StyledAppBar position="fixed" elevation={0}>
        <StyledToolbar>
          <LogoText variant="h6">MediDrive Test App</LogoText>

          {/* Using sx prop for dynamic spacing - demonstrates mixing both approaches */}
          <Typography
            variant="caption"
            sx={{
              color: colorPalette.text.secondary,
              display: { xs: "none", md: "block" },
            }}
          >
            React + TypeScript + MUI
          </Typography>
        </StyledToolbar>
      </StyledAppBar>
    </Slide>
  );
};

export default Header;
