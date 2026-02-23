import {
  Button,
  Fade,
  Dialog as MuiDialog,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { type TransitionProps } from "@mui/material/transitions";
import { forwardRef } from "react";
import { borderRadius } from "../../theme/colors";

interface DeleteConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

const StyledDialog = styled(MuiDialog)(({ theme }) => ({
  "& .MuiBackdrop-root": {
    backdropFilter: "blur(8px)",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  "& .MuiDialog-paper": {
    borderRadius: borderRadius.large,
    width: 350,
    maxWidth: "90vw",
    padding: theme.spacing(3),
  },
}));

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Fade ref={ref} {...props} />;
});

const DeleteConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
}: DeleteConfirmationDialogProps) => {
  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      slots={{
        transition: Transition,
      }}
      slotProps={{
        transition: {
          timeout: 200,
        },
      }}
    >
      <Box>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
          {description}
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button onClick={onClose} variant="outlined" fullWidth>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            variant="contained"
            color="error"
            fullWidth
          >
            Delete
          </Button>
        </Stack>
      </Box>
    </StyledDialog>
  );
};

export default DeleteConfirmationDialog;
