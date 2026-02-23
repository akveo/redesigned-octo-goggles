import { Fade, Stack, Typography } from "@mui/material";
import { DEFAULT_TRANSITION } from "../../theme/theme";

interface PageTitleProps {
  title: string;
  description?: string;
}

const PageTitle = ({ title, description }: PageTitleProps) => {
  return (
    <Fade in={true} timeout={DEFAULT_TRANSITION}>
      <Stack spacing={0.75}>
        <Typography variant="h4">{title}</Typography>
        {description && (
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>
        )}
      </Stack>
    </Fade>
  );
};

export default PageTitle;
