import { Article, Home } from "@mui/icons-material";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { Routes } from "../../routing/routes";
import { colorPalette } from "../../theme/colors";
import { SIDEBAR_WIDTH, TOOLBAR_HEIGHT } from "../../theme/theme";

const StyledDrawer = styled(Drawer)({
  width: SIDEBAR_WIDTH,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: SIDEBAR_WIDTH,
    boxSizing: "border-box",
    top: `calc(${TOOLBAR_HEIGHT}px + 1px)`,
    height: `calc(100% - ${TOOLBAR_HEIGHT}px)`,
    backgroundColor: colorPalette.common.white,
    borderRight: `1px solid ${colorPalette.grey[200]}`,
  },
});

const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>(({ theme, isActive }) => ({
  margin: theme.spacing(0.5, 1),
  borderRadius: theme.spacing(1),
  paddingTop: theme.spacing(0.75),
  paddingBottom: theme.spacing(0.75),
  minHeight: 40,
  "&:hover": {
    backgroundColor: colorPalette.primary[50],
  },
  ...(isActive && {
    backgroundColor: colorPalette.primary[100],
    "&:hover": {
      backgroundColor: colorPalette.primary[100],
    },
  }),
}));

const menuItems = [
  {
    path: Routes.HOME,
    label: "Home",
    icon: <Home />,
  },
  {
    path: Routes.DRAFTS,
    label: "Draft Logs",
    icon: <Article />,
  },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <StyledDrawer variant="permanent" anchor="left">
      <List sx={{ pt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <StyledListItemButton
              onClick={() => navigate(item.path)}
              isActive={location.pathname === item.path}
            >
              <ListItemIcon
                sx={{
                  color:
                    location.pathname === item.path
                      ? colorPalette.primary.dark
                      : colorPalette.text.secondary,
                  minWidth: 36,
                  "& .MuiSvgIcon-root": {
                    fontSize: "1.25rem",
                  },
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: "0.875rem",
                    fontWeight: location.pathname === item.path ? 600 : 400,
                    color: location.pathname === item.path
                      ? colorPalette.primary.dark
                      : "inherit",
                  },
                }}
              />
            </StyledListItemButton>
          </ListItem>
        ))}
      </List>
    </StyledDrawer>
  );
};

export default Sidebar;
