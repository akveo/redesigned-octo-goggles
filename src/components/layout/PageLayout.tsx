import { Box, type SxProps, useMediaQuery } from "@mui/material";
import { type ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  sxProps?: SxProps;
}

const PageLayout = ({ children, sxProps = {} }: PageLayoutProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        ...sxProps,
      }}
    >
      {children}
    </Box>
  );
};

export default PageLayout;
