import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { colorPalette } from "../theme/colors";
import { type ServiceLog } from "../types";
import { isCurrentWeek } from "../utils/dateHelpers";
import { CardButton, StatsCard } from "./shared";

const PanelContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(3),
  alignItems: "stretch",
  flexWrap: "wrap",
  width: "100%",
  maxWidth: "100%",
  overflow: "hidden",
}));

const Divider = styled(Box)({
  width: 1,
  minWidth: 1,
  backgroundColor: colorPalette.grey[300],
  alignSelf: "stretch",
  flexShrink: 0,
});

const StatsContainer = styled(Box)(({ theme }) => ({
  flex: "1 1 auto",
  minWidth: 0,
  maxWidth: "100%",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

const StatsGrid = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  flexWrap: "wrap",
  width: "100%",
  maxWidth: "100%",
}));

const ButtonContainer = styled(Box)({
  flex: "0 1 auto",
  minWidth: 200,
  maxWidth: "100%",
});

interface ControlPanelProps {
  logs: ServiceLog[];
  onCreateLog: () => void;
}

const calculateWeeklyStats = (logs: ServiceLog[]) => {
  const weeklyLogs = logs.filter((log) => isCurrentWeek(log.startDate));

  const avgEngineHours =
    weeklyLogs.length > 0
      ? Math.round(
          weeklyLogs.reduce((sum, log) => sum + log.engineHours, 0) /
            weeklyLogs.length
        )
      : 0;

  const totalMiles =
    weeklyLogs.length > 0
      ? Math.max(...weeklyLogs.map((log) => log.odometer)) -
        Math.min(...weeklyLogs.map((log) => log.odometer))
      : 0;

  const logsCount = weeklyLogs.length;

  return { avgEngineHours, totalMiles, logsCount };
};

const ControlPanel = ({ logs, onCreateLog }: ControlPanelProps) => {
  const { avgEngineHours, totalMiles, logsCount } = calculateWeeklyStats(logs);

  return (
    <PanelContainer>
      <StatsContainer>
        <StatsGrid>
          <StatsCard value={`${avgEngineHours}h`} label="Avg Engine Hours" />
          <StatsCard
            value={
              totalMiles > 999
                ? `${(totalMiles / 1000).toFixed(1)}K`
                : totalMiles
            }
            label="Miles"
          />
          <StatsCard value={logsCount} label="Logs added" />
        </StatsGrid>
      </StatsContainer>
      <Divider />
      <ButtonContainer>
        <CardButton
          startIcon={<AddIcon sx={{ width: 48, height: 48 }} />}
          onClick={onCreateLog}
        >
          Create Service Log
        </CardButton>
      </ButtonContainer>
    </PanelContainer>
  );
};

export default ControlPanel;
