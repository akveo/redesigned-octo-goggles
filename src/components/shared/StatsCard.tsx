import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { borderRadius, colorPalette } from "../../theme/colors";

const StyledCard = styled(Box)(({ theme }) => ({
  flex: "1 1 auto",
  minWidth: 100,
  maxWidth: "100%",
  padding: theme.spacing(2.5),
  border: `1px solid ${colorPalette.grey[300]}`,
  borderRadius: borderRadius.medium,
  backgroundColor: colorPalette.common.white,
  boxSizing: "border-box",
}));

interface StatsCardProps {
  value: string | number;
  label: string;
}

const StatsCard = ({ value, label }: StatsCardProps) => {
  return (
    <StyledCard>
      <Typography variant="h3" sx={{ mb: 0.5, fontWeight: 700 }}>
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </StyledCard>
  );
};

export default StatsCard;
