import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { LoadingButton } from '@mui/lab';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  confirmButtonLabel: string;
  cancelButtonLabel: string;
  isConfirmButtonLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog = ({
  open,
  title,
  onConfirm,
  confirmButtonLabel,
  isConfirmButtonLoading,
  cancelButtonLabel,
  onCancel,
  description,
}: ConfirmDialogProps) => {
  return (
    <Dialog open={open} maxWidth="sm" fullWidth onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      {description && (
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button variant="outlined" onClick={onCancel} disabled={isConfirmButtonLoading}>
          {cancelButtonLabel}
        </Button>
        <LoadingButton variant="contained" onClick={onConfirm} loading={isConfirmButtonLoading}>
          {confirmButtonLabel}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
