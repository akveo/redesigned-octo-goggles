import CloseIcon from "@mui/icons-material/Close";
import {
  DialogContent,
  DialogTitle,
  Fade,
  IconButton,
  Dialog as MuiDialog,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { type TransitionProps } from "@mui/material/transitions";
import { type ReactNode, forwardRef } from "react";
import { borderRadius } from "../../theme/colors";

const StyledDialog = styled(MuiDialog)(({ theme }) => ({
  "& .MuiBackdrop-root": {
    backdropFilter: "blur(8px)",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  "& .MuiDialog-paper": {
    borderRadius: borderRadius.large,
    minWidth: 500,
    [theme.breakpoints.down("sm")]: {
      minWidth: "auto",
      margin: theme.spacing(2),
    },
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingRight: theme.spacing(1),
}));

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Fade ref={ref} {...props} />;
});

interface DialogProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
  hideCloseButton?: boolean;
}

const Dialog = (props: DialogProps) => {
  const { open, title, onClose, children, hideCloseButton = false } = props;
  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      slots={{
        transition: Transition,
      }}
      slotProps={{
        transition: {
          timeout: 200,
        },
      }}
    >
      {title ||
        (!hideCloseButton && (
          <StyledDialogTitle>
            {title}
            {!hideCloseButton && (
              <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            )}
          </StyledDialogTitle>
        ))}
      <DialogContent>{children}</DialogContent>
    </StyledDialog>
  );
};

export default Dialog;
