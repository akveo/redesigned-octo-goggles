import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { type ReactNode } from "react";
import { colorPalette } from "../../theme/colors";
import { SIDEBAR_WIDTH, TOOLBAR_HEIGHT } from "../../theme/theme";
import Header from "./Header";
import Sidebar from "./Sidebar";

const AppContainer = styled(Box)({
  background: colorPalette.common.white,
  minHeight: "100vh",
  width: "100vw",
  maxWidth: "100vw",
  overflow: "hidden",
  paddingTop: TOOLBAR_HEIGHT,
});

const LayoutContainer = styled(Box)({
  display: "flex",
  minHeight: `calc(100vh - ${TOOLBAR_HEIGHT}px)`,
  width: "100%",
  overflow: "hidden",
});

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  width: `calc(100vw - ${SIDEBAR_WIDTH}px)`,
  maxWidth: `calc(100vw - ${SIDEBAR_WIDTH}px)`,
  overflow: "auto",
  padding: theme.spacing(3),
  boxSizing: "border-box",
}));

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <AppContainer>
      <Header />
      <LayoutContainer>
        <Sidebar />
        <MainContent>{children}</MainContent>
      </LayoutContainer>
    </AppContainer>
  );
};

export default AppLayout;
